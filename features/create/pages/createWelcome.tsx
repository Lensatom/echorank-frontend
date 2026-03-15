"use client"

import { Container } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CreatePollForm } from '../components/layouts'
import { draftUtils } from '../utils/draftUtils'

export function CreateWelcome() {
  const [drafts, setDrafts] = useState<Array<{ id: string; title: string; createdAt: string; lastModified: string; preview: string }>>([])

  useEffect(() => {
    setDrafts(draftUtils.getAllDrafts())
  }, [])

  const handleDeleteDraft = (id: string) => {
    const confirmed = typeof window !== 'undefined' ? window.confirm('Delete this draft? This cannot be undone.') : true
    if (!confirmed) return
    draftUtils.deletePoll(id)
    setDrafts(prev => prev.filter(d => d.id !== id))
  }

  return (
    <Container className='h-screen w-full grid grid-rows-2'>
      <section className='w-full flex flex-col items-center justify-center mt-4'>
        <h1 className='text-3xl font-bold text-blue-500'>Create Poll</h1>
        <p className='text-gray-600 font-medium text-sm mt-1'>Name a new Poll or continue existing drafts</p>
        <CreatePollForm />
      </section>
      <section className='flex flex-col gap-4 border border-gray-400 rounded-md p-6 w-[60%] overflow-y-auto mx-auto'>
        <h3 className='text-sm text-gray-600 font-bold'>Your drafts</h3>
        {drafts.length === 0 && (
          <p className='text-xs text-gray-500'>No drafts yet. Create a new poll above.</p>
        )}
        {drafts.map((d) => (
          <div key={d.id} className='flex items-center justify-between border border-gray-200 rounded-md p-3'>
            <div>
              <p className='text-sm font-semibold text-gray-800'>{d.title}</p>
              <p className='text-xs text-gray-500'>Last modified: {new Date(d.lastModified).toLocaleString()}</p>
              <p className='text-xs text-gray-500'>Preview: {d.preview || 'Untitled Section'}</p>
            </div>
            <div className='flex gap-2'>
              <Button size='sm' variant='outline' onClick={() => (window.location.href = `/create/${d.id}`)}>Continue</Button>
              <Button size='sm' variant='outline' className='text-red-600 border-red-200 hover:bg-red-50' onClick={() => handleDeleteDraft(d.id)}>
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </section>
    </Container>
  )
}