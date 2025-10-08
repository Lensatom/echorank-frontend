"use client"

import { Container } from '@/components/layout'
import { Button } from '@/components/ui'
import { useState } from 'react'

interface IPollNamingFormProps {
  onPollNamed: (pollName: string) => void
}

export function PollNamingForm({ onPollNamed }: IPollNamingFormProps) {
  const [pollName, setPollName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedName = pollName.trim()
    if (!trimmedName) {
      setError('Poll name is required')
      return
    }

    if (trimmedName.length < 3) {
      setError('Poll name must be at least 3 characters')
      return
    }

    if (trimmedName.length > 100) {
      setError('Poll name must be less than 100 characters')
      return
    }

    setError('')
    onPollNamed(trimmedName)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPollName(e.target.value)
    if (error) setError('')
  }

  return (
    <Container className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Create New Poll</h1>
          <p className="text-gray-600">
            Give your poll a descriptive name to get started.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pollName" className="block text-sm font-medium text-gray-700 mb-2">
              Poll Name *
            </label>
            <input
              type="text"
              id="pollName"
              value={pollName}
              onChange={handleInputChange}
              placeholder="Enter poll name..."
              className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              autoFocus
              maxLength={100}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <p className="text-gray-400 text-sm mt-2">
              {pollName.length}/100 characters
            </p>
          </div>

          <Button
            type="submit"
            disabled={!pollName.trim()}
            className="w-full py-3 text-lg"
          >
            Create Poll
          </Button>
        </form>
      </div>
    </Container>
  )
}