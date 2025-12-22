import { VoteCard } from '../ui'

const pendingForms = [
  {
    name: "Class Governor Poll",
    questionCount: 10,
    percentageComplete: 40
  },
  {
    name: "Best Student Council Member",
    questionCount: 8,
    percentageComplete: 50
  },
  {
    name: "Favorite Teacher Survey",
    questionCount: 12,
    percentageComplete: 30
  },
  {
    name: "School Event Feedback",
    questionCount: 5,
    percentageComplete: 20
  }
]

export function VotesCompleted({className}: {className?: string}) {
  return (
    <section className={`${className}`}>
      <h4 className="text-base font-bold text-gray-600">Votes completed</h4>
      <div className='mt-3 grid grid-cols-4 gap-x-3 gap-y-6'>
        {pendingForms.map((vote, index) => <VoteCard key={index} voteData={vote} />)}
      </div>
    </section>
  )
}