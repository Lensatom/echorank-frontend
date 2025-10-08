import { ICreatePoll } from '../context'
import { v4 as uuidv4 } from 'uuid'

interface IPollDraft {
  id: string
  name: string
  createdAt: string
  lastModified: string
  preview: string
}

const POLL_DRAFTS_KEY = 'pollDrafts'
const POLL_DATA_PREFIX = 'pollData_'

export const draftUtils = {
  createNewPoll: (name: string): ICreatePoll => {
    const now = new Date().toISOString()
    return {
      id: uuidv4(),
      name: name.trim(),
      createdAt: now,
      lastModified: now,
      sections: [
        {
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
      ]
    }
  },

  savePoll: (poll: ICreatePoll): void => {
    const updatedPoll = {
      ...poll,
      lastModified: new Date().toISOString()
    }

    localStorage.setItem(`${POLL_DATA_PREFIX}${poll.id}`, JSON.stringify(updatedPoll))

    const drafts = draftUtils.getAllDrafts()
    const existingIndex = drafts.findIndex(draft => draft.id === poll.id)
    
    const preview = poll.sections[0]?.section || 'Untitled Section'
    const draftInfo: IPollDraft = {
      id: poll.id,
      name: poll.name,
      createdAt: poll.createdAt,
      lastModified: updatedPoll.lastModified,
      preview
    }

    if (existingIndex >= 0) {
      drafts[existingIndex] = draftInfo
    } else {
      drafts.push(draftInfo)
    }

    localStorage.setItem(POLL_DRAFTS_KEY, JSON.stringify(drafts))
  },

  loadPoll: (pollId: string): ICreatePoll | null => {
    try {
      const pollData = localStorage.getItem(`${POLL_DATA_PREFIX}${pollId}`)
      return pollData ? JSON.parse(pollData) : null
    } catch (error) {
      console.error('Error loading poll:', error)
      return null
    }
  },

  getAllDrafts: (): IPollDraft[] => {
    try {
      const drafts = localStorage.getItem(POLL_DRAFTS_KEY)
      return drafts ? JSON.parse(drafts) : []
    } catch (error) {
      console.error('Error loading drafts:', error)
      return []
    }
  },

  deletePoll: (pollId: string): void => {
    localStorage.removeItem(`${POLL_DATA_PREFIX}${pollId}`)

    const drafts = draftUtils.getAllDrafts()
    const filteredDrafts = drafts.filter(draft => draft.id !== pollId)
    localStorage.setItem(POLL_DRAFTS_KEY, JSON.stringify(filteredDrafts))
  },

  pollExists: (pollId: string): boolean => {
    return localStorage.getItem(`${POLL_DATA_PREFIX}${pollId}`) !== null
  },

  cleanupOrphanedPolls: (): void => {
    const drafts = draftUtils.getAllDrafts()
    const draftIds = new Set(drafts.map(draft => draft.id))

    const allKeys = Object.keys(localStorage)
    const pollDataKeys = allKeys.filter(key => key.startsWith(POLL_DATA_PREFIX))

    pollDataKeys.forEach(key => {
      const pollId = key.replace(POLL_DATA_PREFIX, '')
      if (!draftIds.has(pollId)) {
        localStorage.removeItem(key)
      }
    })
  }
}