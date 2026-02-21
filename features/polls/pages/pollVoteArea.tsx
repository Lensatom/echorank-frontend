import { Container } from '@/shared/components/layout'
import { GET } from '@/shared/config/api/crud'
import { decryptId } from '@/shared/helpers/general'
import { IPoll } from '../interfaces'
import PollVoteClient from '@/features/polls/components/layout/pollVoteClient'

export async function PollVoteArea({id}: { id: string }) {
  const decryptedId = decryptId(id)

  try {
    const response = await GET({
      route: `/polls/${decryptedId}`,
      isServer: true
    })

    console.log("Fetched poll details:", response)

    const poll: IPoll = response.poll

    return <PollVoteClient poll={poll} />
  } catch (error) {
    console.error("Error fetching poll details:", error)
    return <div>Error loading poll details.</div>
  }
}