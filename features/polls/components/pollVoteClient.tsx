"use client"

import { Container } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import type { DragOptionItem } from '../components/option'
import { Section } from '../components/section'
import type { IPoll } from '../interfaces'
import { usePostVote } from '../api'

interface PollVoteClientProps {
  poll: IPoll
}

type RankingUpdate = DragOptionItem[] | ((currentRanking: DragOptionItem[]) => DragOptionItem[])

export default function PollVoteClient({ poll }: PollVoteClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') || '1')
  const section = poll.sections[page - 1]
  const pollLength = poll.sections.length
  const isLastPage = page === pollLength
  const percentageComplete = (page / pollLength) * 100

  const { postVote, isPending } = usePostVote()

  const sectionsForRankings = useMemo(() => {
    const rankingObj: Record<string, DragOptionItem[]> = {}
    poll.sections.forEach(section => {
      rankingObj[section.sectionId] = []
    })
    return rankingObj
  }, [poll])

  const [rankings, setRankings] = useState<Record<string, DragOptionItem[]>>(sectionsForRankings)

  const changeRankings = (sectionId: string, rankingUpdate: RankingUpdate) => {
    setRankings(prev => ({
      ...prev,
      [sectionId]: typeof rankingUpdate === 'function'
        ? rankingUpdate(prev[sectionId] ?? [])
        : rankingUpdate
    }))
  }

  const goToNextSection = useCallback(() => {
    if (isLastPage) {
      handleSubmit()
    }
    if (page < pollLength) {
      const nextPage = page + 1
      const params = new URLSearchParams(window.location.search)
      params.set('page', nextPage.toString())
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)
    }
  }, [page, pollLength, isLastPage, rankings])

  const handleSubmit = async () => {
    const sectionIds = Object.keys(rankings)
    const payload: {sectionId: string, ranking: string[]}[] = []
    sectionIds.forEach(sectionId => {
      console.log("Processing rankings", rankings)
      const rankedOptions = rankings[sectionId]
      console.log("Ranked options for section", sectionId, rankedOptions)
      payload.push({
        sectionId,
        ranking: rankedOptions.map(opt => opt.optionId)
      })
    })
    await postVote({ id: poll._id, data: { sections: payload } })
    router.push(`/polls/${poll._id}/vote/complete`)
  }

  return (
    <Container className="h-screen grid grid-rows-8 !pt-3">
      <div className='row-span-1'>
        <h1 className="text-xl font-extrabold text-gray-800">{poll.title}</h1>
        <div className='w-full h-2 bg-white rounded-full mt-3'>
          <div className='h-full bg-blue-500 rounded-full' style={{ width: `${percentageComplete}%` }}></div>
        </div>
        <div className='mt-3 flex items-center justify-between'>
          <div>
            <h1 className="text-base font-bold text-gray-600">Section {page} of {pollLength}</h1>
            <p className='text-xs text-gray-400'>{percentageComplete.toFixed(0)}% complete</p>
          </div>
          <div className='flex space-x-2'>
            {page !== 1 && (<Button size="sm" className='!w-22 bg-gray-200 text-gray-700'>Previous</Button>)}
            <Button size="sm" className='!w-22' isLoading={isPending} onClick={goToNextSection}>{isLastPage ? 'Submit' : 'Next'}</Button>
          </div>
        </div>
      </div>

      <div className="row-span-7 mt-6 h-full flex flex-col gap-6 py-3">
        <Section
          key={section.sectionId}
          section={section}
          ranking={rankings[section.sectionId] ?? []}
          changeRankings={changeRankings}
        />
      </div>
    </Container>
  )
}
