"use client"

import { Button } from '@/shared/components/ui'
import React from 'react'

function PollVoteComplete() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl font-bold text-gray-800'>Thank you for voting!</h1>
      <p className='text-gray-600'>Your vote has been successfully submitted.</p>
      <Button variant="outline" onClick={() => window.location.href = '/polls'}>Back to Polls</Button>
    </div>
  )
}

export default PollVoteComplete