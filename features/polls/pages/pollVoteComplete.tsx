"use client"

import { Button } from '@/shared/components/ui'
import React from 'react'

function PollVoteComplete() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold text-gray-800'>Thank you for voting!</h1>
      <p className='text-gray-600 mt-2'>Your vote has been successfully submitted.</p>
      <Button variant="outline" className='mt-6' onClick={() => window.location.href = '/polls'}>Back to Polls</Button>
    </div>
  )
}

export default PollVoteComplete