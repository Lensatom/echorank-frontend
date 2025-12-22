import { Container } from '@/shared/components/layout'
import { GET } from '@/shared/config/api/crud'
import React from 'react'
import { PollCard } from '../components/ui'

export async function Polls() {
  const response = await GET({
    route: "/polls",
    isServer: true
  })

  const data = response.data
  const polls = data.polls || []

  return (
    <Container className='min-h-screen'>
      <div className='mt-3 grid grid-cols-4 gap-[1px]'>
        {polls.map((poll:any) => <PollCard key={poll._id} pollData={poll} />)}
      </div>
    </Container>
  )
}