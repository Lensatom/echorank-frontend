"use client"

import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { CreatePollContext, ICreatePoll, SaveStatus } from '../context'
import { draftUtils } from '../utils/draftUtils'

export function CreatePollProvider({ children }: { children: React.ReactNode }) {
  const [pollData, setPollData] = useState<ICreatePoll | null>(null)
  const [isNamed, setIsNamed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isSavingRef = useRef(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pollId = pathname.split('/').pop()
  const id = searchParams.get('id')
  const mode = searchParams.get('mode')
  
  const actualPollId = id || (pollId && pollId !== 'create' ? pollId : null)

  useEffect(() => {
    const loadPollData = async () => {
      console.log('Loading poll data for ID:', actualPollId)
      setIsLoading(true)
      
      if (actualPollId) {
        const existingPoll = draftUtils.loadPoll(actualPollId)
        if (existingPoll) {
          console.log('Found existing poll:', existingPoll.title)
          setPollData(existingPoll)
          setIsNamed(true)
          setSaveStatus('saved')
          setIsLoading(false)
          return
        } else {
          console.log('No existing poll found for ID:', actualPollId)
        }
      }
      
      console.log('No poll ID or poll not found, showing naming form')
      setPollData(null)
      setIsNamed(false)
      setSaveStatus('saved')
      setIsLoading(false)
    }

    loadPollData()
  }, [actualPollId])

  const savePollData = useCallback((pollToSave: ICreatePoll) => {
    if (isSavingRef.current) return

    isSavingRef.current = true
    setSaveStatus('saving')

    try {
      const updatedPoll = {
        ...pollToSave,
        lastModified: new Date().toISOString()
      }

      draftUtils.savePoll(updatedPoll)
      setPollData(updatedPoll)
      setSaveStatus('saved')
    } catch (error) {
      console.error('Failed to save draft:', error)
      setSaveStatus('error')
    } finally {
      isSavingRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!pollData || !isNamed || isSavingRef.current) return

    setSaveStatus('unsaved')

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      console.log('Auto-saving poll:', pollData.title)
      savePollData(pollData)
    }, 500)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [pollData?.sections, pollData?.title, pollData?.description, isNamed, savePollData])

  const handlePollNamed = async (pollName: string) => {
    const newPoll = draftUtils.createNewPoll(pollName)
    console.log('Creating new poll:', newPoll)
    
    setPollData(newPoll)
    setIsNamed(true)

    draftUtils.savePoll(newPoll)
    setSaveStatus('saved')
    console.log('Poll saved to localStorage')
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}?id=${newPoll.id}`
      console.log('Updating URL to:', newUrl)
      window.history.replaceState({}, '', newUrl)
    }
  }

  const handleDraftSelected = async (pollId: string) => {
    console.log('Loading draft:', pollId)
    setIsLoading(true)
    
    const existingPoll = draftUtils.loadPoll(pollId)
    if (existingPoll) {
      console.log('Draft loaded:', existingPoll.title)
      setPollData(existingPoll)
      setIsNamed(true)
      setSaveStatus('saved')
      
      if (typeof window !== 'undefined') {
        const newUrl = `${window.location.pathname}?id=${pollId}`
        console.log('Updating URL to:', newUrl)
        window.history.replaceState({}, '', newUrl)
      }
    } else {
      console.error('Draft not found:', pollId)
    }
    
    setIsLoading(false)
  }

  return (
    <CreatePollContext.Provider value={{ 
      pollData, 
      setPollData, 
      saveStatus,
      isNamed, 
      setIsNamed,
      handlePollNamed,
      handleDraftSelected,
      isLoading
    }}>
      {children}
    </CreatePollContext.Provider>
  )
}