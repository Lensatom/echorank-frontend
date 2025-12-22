import React from 'react'
import { ContinueVoting, VotesCompleted } from '../components/layout'
import { Container } from '@/shared/components/layout'

export function Votes() {
  return (
    <Container className='flex flex-col gap-10 min-h-screen'>
      <ContinueVoting />
      <VotesCompleted />
    </Container>
  )
}