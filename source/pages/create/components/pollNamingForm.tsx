"use client"

import { Container } from '@/components/layout'
import { Button } from '@/components/ui'
import { useState, useEffect, useContext } from 'react'
import { CreatePollContext } from '../context'
import { draftUtils } from '../utils/draftUtils'
import { Clock, FileText, Plus } from 'lucide-react'

interface IPollNamingFormProps {
  onPollNamed: (pollName: string) => Promise<void>
}

interface IDraft {
  id: string
  name: string
  createdAt: string
  lastModified: string
  preview: string
}

export function PollNamingForm({ onPollNamed }: IPollNamingFormProps) {
  const [pollName, setPollName] = useState('')
  const [error, setError] = useState('')
  const [drafts, setDrafts] = useState<IDraft[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  
  const context = useContext(CreatePollContext)
  const handleDraftSelected = context?.handleDraftSelected

  useEffect(() => {
    const savedDrafts = draftUtils.getAllDrafts()
    setDrafts(savedDrafts)
  }, [])

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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <Container className="w-full min-h-screen flex items-center justify-center pt-24">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Your Polls</h1>
          <p className="text-gray-600">
            Create a new poll or continue working on a saved draft.
          </p>
        </div>

        <div className="border-t pt-6">
          {!showCreateForm ? (
            <Button
              onClick={() => setShowCreateForm(true)}
              className="w-full py-3 text-lg flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Create New Poll
            </Button>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Create New Poll</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCreateForm(false)
                    setPollName('')
                    setError('')
                  }}
                >
                  Cancel
                </Button>
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
          )}
        </div>

        {drafts.length > 0 && !showCreateForm && (
          <div className="mt-8">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Clock size={18} />
              Recent Drafts
            </h2>
            <div className="space-y-3">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleDraftSelected && handleDraftSelected(draft.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-gray-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">{draft.name}</h3>
                        <p className="text-sm text-gray-500">{draft.preview}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {formatDate(draft.lastModified)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}