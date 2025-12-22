import { PollCard } from '@/features/polls/components/ui'
import { GET } from '@/shared/config/api/crud'

export async function PublishedByYou({className}: {className?:string}) {
  try {
    const response = await GET({
      route: "/polls",
      isServer: true
    })

    const data = response.data
    const polls = data.polls || []
  
    return (
      <section className={`${className}`}>
        <h4 className="text-base font-bold text-gray-600">Published by you</h4>
        <div className='mt-3 grid grid-cols-4 gap-[1px]'>
          {polls.map((poll:any) => <PollCard key={poll._id} pollData={poll} />)}
        </div>
      </section>
    )
  } catch (error) {
    return <p>Polls currently unavailable</p>
  }
}