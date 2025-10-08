"use client"

import { Container } from '@/components/layout'
import { Button } from '@/components/ui'
import { Plus, Save, Upload } from 'lucide-react'
import { Section, PollNamingForm, LoadingSpinner } from './components'
import { CreatePollProvider } from './providers'
import { useContext } from 'react'
import { CreatePollContext, IPollSection } from './context'

function CreatePollForm() {
  const context = useContext(CreatePollContext)
  
  if (!context) {
    throw new Error('CreatePollForm must be used within CreatePollProvider')
  }
  
  const { pollData, setPollData, isNamed, handlePollNamed, isLoading } = context

  const handleAddNewSection = () => {
    const newSection: IPollSection = {
      section: '',
      subText: '',
      isRequired: false,
      options: [
        {
          text: '',
          imageUrl: ''
        }
      ]
    }
    
    setPollData((prev) => {
      if (!prev || !prev.sections || !Array.isArray(prev.sections)) {
        return null
      }
      return {
        ...prev,
        sections: [...prev.sections, newSection]
      }
    })
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isNamed) {
    return <PollNamingForm onPollNamed={handlePollNamed} />
  }

  if (!pollData) {
    return <LoadingSpinner />
  }

  return (
    <Container className='w-full !py-0'>
      <header className='flex justify-between items-center fixed top-0 w-full pr-40 bg-white py-4'>
        <div>
          <h1 className='text-xl font-bold'>{pollData.name}</h1>
          <p className='text-sm text-gray-600'>
            Created {new Date(pollData.createdAt).toLocaleDateString()} • 
            Last saved {new Date(pollData.lastModified).toLocaleTimeString()}
          </p>
        </div>
        <div className=' gap-4 flex'>
          <div className='flex items-center gap-2 border px-4 rounded-md'>
            <Save size={16} />
            <p className='text-xs'>Auto-saves to draft</p>
          </div>
          <Button className='!px-6'>
            <Upload />
            Publish
          </Button>
        </div>
      </header>

      <main className='my-24'>
        {pollData?.sections?.map((section, index) => (
          <Section key={index} index={index} />
        ))}
        <Button
          size="sm"
          variant="outline"
          className='text-xs text-gray-700 mt-6 cursor-pointer'
          onClick={handleAddNewSection}
        >
          <Plus />
          Add new Section
        </Button>
      </main>
    </Container>
  )
}

export function Create() {
  return (
    <CreatePollProvider>
      <CreatePollForm />
    </CreatePollProvider>
  )
}