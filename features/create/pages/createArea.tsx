"use client"

import React, { useContext } from 'react'
import { Container } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui'
import { CreatePollProvider } from '../providers'
import { CreatePollContext } from '../context'
import { Section } from '../components/ui/createSection'
import { Upload } from 'lucide-react'
import { useCreatePoll } from '../api'
import { useRouter } from 'next/navigation'
import { draftUtils } from '../utils/draftUtils'

function CreateAreaContent() {
  const context = useContext(CreatePollContext)
  const router = useRouter()

  const { createPoll } = useCreatePoll()

  if (!context) return null

  const { pollData, setPollData, isLoading } = context

  const addSection = () => {
    if (!pollData) return
    const newSection = {
      name: '',
      description: '',
      isRequired: false,
      options: [{ name: '' }]
    }
    const updated = {
      ...pollData,
      sections: [...(pollData.sections || []), newSection]
    }
    setPollData(updated)
  }

  const handleSubmit = async () => {
    console.log('Publishing poll data:', pollData)
    if (!pollData) return
    try {
      const res = await createPoll(pollData)
      // Store minimal summary for completion screen
      try {
        const published = {
          id: (res as any)?.data?.id ?? pollData.id,
          title: pollData.title,
          description: pollData.description,
          sectionsCount: Array.isArray(pollData.sections) ? pollData.sections.length : 0,
        }
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem('lastPublishedPoll', JSON.stringify(published))
        }
      } catch {}
      draftUtils.deletePoll(pollData.id)
      router.push('/create/complete')
    } catch (error) {
      console.error('Failed to publish poll:', error)
    }
  }

  if (isLoading || !pollData) {
    return (
      <Container className='min-h-screen w-full flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4'></div>
          <h2 className='text-xl font-semibold text-gray-700 mb-2'>Loading...</h2>
          <p className='text-gray-500'>Preparing your poll workspace</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className='min-h-screen w-full flex flex-col items-center !py-0 !pb-4'>
      <div className='flex items-center justify-between w-[60%] px-[5%] fixed bg-gray-100 pt-8 pb-4'>
        <div className='flex-1 pr-6'>
          <input
            value={pollData.title || ''}
            onChange={(e) => setPollData({ ...pollData, title: e.target.value })}
            placeholder='Poll title'
            className='text-2xl font-bold text-blue-600 px-2'
          />
          <input
            value={pollData.description || ''}
            onChange={(e) => setPollData({ ...pollData, description: e.target.value })}
            placeholder='Add a short description for this poll'
            className='w-full text-sm text-gray-700 px-2'
          />
        </div>
        <Button onClick={handleSubmit}>
          <Upload className='mr-1' />
          Publish
        </Button>
      </div>

      <div className='h-24' />

      {(pollData.sections || []).map((_, idx) => (
        <Section key={idx} index={idx} />
      ))}

      <div className='w-[60%] mt-6 flex justify-between'>
        <Button variant='outline' onClick={addSection} className='text-sm'>Add Section</Button>
      </div>

    </Container>
  )
}

export function CreateArea() {
  return (
    <CreatePollProvider>
      <CreateAreaContent />
    </CreatePollProvider>
  )
}