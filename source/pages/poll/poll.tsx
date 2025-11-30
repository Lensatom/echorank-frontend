"use client"

import { Container, Header } from '@/components/layout';
import { Button, Loader } from '@/components/ui';
import { useParams } from 'next/navigation';
import { useGetPollById, usePostVote } from './api';
import { Section } from './components';
import { decryptId } from '@/helpers/general';
import { useState } from 'react';

export function Poll() {
  const { id } = useParams() as { id?: string }
  const decryptedId = decryptId(id ?? "")
  const { poll, isLoading } = useGetPollById({ id: decryptedId });

  const [rankings, setRankings] = useState<any>([])
  const [idOnlyRankings, setIdOnlyRankings] = useState<any>([])

  const { postVote, isPending } = usePostVote()

  const changeRankings = (newRankings:any) => {
    const rankingIndex = rankings.findIndex((r:any) => r.sectionId === newRankings.sectionId)
    if (rankingIndex > -1) {
      const updatedRankings:any = [...rankings]
      updatedRankings[rankingIndex] = newRankings
      setRankings(updatedRankings)

      const updatedIdOnlyRankings:any = [...idOnlyRankings]
      updatedIdOnlyRankings[rankingIndex] = {
        sectionId: newRankings.sectionId,
        ranking: newRankings.ranking.map((r:any) => r.name)
      }
      setIdOnlyRankings(updatedIdOnlyRankings)
    } else {
      setRankings([...rankings, newRankings])
      setIdOnlyRankings([...idOnlyRankings, {
        sectionId: newRankings.sectionId,
        ranking: newRankings.ranking.map((r:any) => r.name)
      }])
    }
  }

  const handleSubmit = async () => {
    const payload = {
      ranking: idOnlyRankings
    }
    await postVote({ id: decryptedId, data: payload });
  }

  console.log({rankings, idOnlyRankings})

  if (isLoading) return <Loader />
  return (
    <>
      <div className='flex items-center justify-between mb-4 p-4'>
        <h2>{poll?.title}</h2>
        <Button onClick={handleSubmit} isLoading={isPending}>Submit Vote</Button>
      </div>
      <Container className='w-[60%]'>
        <h2 className='text-lg font-bold text-gray-800'>{poll?.title}</h2>
        <div className='mt-6'>
          {poll?.sections?.map((section:any) => (
            <Section
              key={section.sectionId}
              section={section}
              ranking={rankings.filter((r:any) => r.sectionId === section.sectionId)[0]?.ranking ?? []}
              changeRankings={changeRankings}
            />
          ))}
        </div>
      </Container>
    </>
  )
}