import { GET } from '@/shared/config/api/crud'
import { decryptId } from '@/shared/helpers/general'
import React from 'react'

async function PollResult({ id } : { id: string }) {
  try {
    const result = await GET({
      route: `/polls/${decryptId(id)}/results/updated`,
      isServer: true
    })

    console.log("Fetched poll results:", result)

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Poll Result</h1>
      </div>
    )
  } catch (error) {
    console.error("Error fetching poll results:", error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Error loading poll results</h1>
        <p className="text-gray-600 mt-2">Please try again later.</p>
      </div>
    )
  }
}

export default PollResult