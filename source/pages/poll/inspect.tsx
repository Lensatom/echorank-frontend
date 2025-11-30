"use client"

import { Loader } from '@/components/ui'
import React from 'react'
import { useGetResults } from './api'
import { decryptId } from '@/helpers/general'
import { useParams } from 'next/navigation'

export function InspectVotes() {
  const { id } = useParams() as { id?: string }
  const decryptedId = decryptId(id ?? "")
  const { results, isLoading } = useGetResults({ id: decryptedId })

  console.log({results})

  if (isLoading) return <Loader />
  return (
    <div>InspectVotes</div>
  )
}