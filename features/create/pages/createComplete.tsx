"use client"

import { Container } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui'
import { encryptId } from '@/shared/helpers/general'
import { CheckCircle2, Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PublishedSummary {
  id?: string
  title?: string
  description?: string
  sectionsCount?: number
}

export function CreateComplete() {
  const router = useRouter()
  const [summary, setSummary] = useState<PublishedSummary | null>(null)
  const encodedId = summary?.id ? encryptId(summary.id) : null

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined'
        ? window.sessionStorage.getItem('lastPublishedPoll')
        : null
      if (raw) setSummary(JSON.parse(raw))
    } catch {}
  }, [])

  const viewPoll = () => {
    if (summary?.id) {
      router.push(`/polls/${encodedId}`)
    } else {
      router.push('/home')
    }
  }

  const handleCopyLink = () => {
    const url = summary?.id ? `${window.location.origin}/polls/${encodedId}` : window.location.origin
    navigator.clipboard.writeText(url)
      .then(() => alert('Poll link copied to clipboard!'))
      .catch(() => alert('Failed to copy link. Please try manually copying: ' + url))
  }

  return (
    <Container className='min-h-screen w-full flex items-center justify-center'>
      <div className='w-[600px] max-w-[90%] rounded-xl p-8 text-center'>
        <div className='flex justify-center mb-4'>
          <CheckCircle2 className='text-green-600' size={80} />
        </div>
        <h1 className='text-2xl font-bold text-gray-900'>Poll Published Successfully</h1>
        <p className='text-gray-600 mt-2'>Your poll is live and ready for votes.</p>

        {summary && (
          <div className='mt-6 text-left border border-gray-200 rounded-lg p-4'>
            <p className='text-sm text-gray-700'><span className='font-semibold'>Title:</span> {summary.title || 'Untitled Poll'}</p>
            {summary.description && (
              <p className='text-sm text-gray-700 mt-1'><span className='font-semibold'>Description:</span> {summary.description}</p>
            )}
            <p className='text-sm text-gray-700 mt-1'><span className='font-semibold'>Sections:</span> {summary.sectionsCount ?? 0}</p>
          </div>
        )}

        <div className='mt-8 flex flex-wrap gap-3 justify-center'>
          <Button onClick={viewPoll} className='!px-6'>View Poll</Button>
          <Button variant='outline' onClick={handleCopyLink}>
            <Copy /> Copy Link
          </Button>
        </div>
      </div>
    </Container>
  )
}