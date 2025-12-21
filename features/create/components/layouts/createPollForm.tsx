"use client"

import { Button, Input } from '@/shared/components/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { draftUtils } from '../../utils/draftUtils';

export function CreatePollForm() {
  const [pollTitle, setPollTitle] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const handleCreateNew = (e:any) => {
    e.preventDefault()
    if (pollTitle.trim() === "" || pollTitle.length < 3) {
      setError("Please enter a valid poll title with at least 3 characters.")
      return
    }
    const newPoll = draftUtils.createNewPoll(pollTitle)
    draftUtils.savePoll(newPoll)
    router.push(`/create/${newPoll.id}`)
  }

  useEffect(() => {
    setError("")
  }, [pollTitle])

  return (
    <form onSubmit={handleCreateNew} className='w-full flex flex-col items-center'>
      <Input value={pollTitle} onChange={(e) => setPollTitle(e.target.value)} placeholder='Poll title e.g president electiion' className='mt-6 w-1/3' />
      <p className='text-red-600 text-xs font-medium mt-4'>{error}</p>
      <Button type="submit" className='mt-3 w-1/4' disabled={!(!!pollTitle)}>Create New</Button>
    </form>
  )
}