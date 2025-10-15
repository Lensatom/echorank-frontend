"use client"

import React from "react"

export interface IPollSection {
  title?: string
  sub_title?: string
  isRequired?: boolean
  options?: Array<{
    title: string
    imageUrl?: string
  }>
}

export interface ICreatePoll {
  id: string
  name: string
  createdAt: string
  lastModified: string
  sections: IPollSection[]
}

interface IPollDataContext {
  pollData: ICreatePoll | null
  setPollData: React.Dispatch<React.SetStateAction<ICreatePoll | null>>
  isNamed: boolean
  setIsNamed: React.Dispatch<React.SetStateAction<boolean>>
  handlePollNamed: (pollName: string) => Promise<void>
  handleDraftSelected: (pollId: string) => Promise<void>
  isLoading: boolean
}

export const CreatePollContext = React.createContext<null | IPollDataContext>(null)