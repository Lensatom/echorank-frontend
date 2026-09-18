import { GET } from '@/shared/config/api/crud';
import { decryptId } from '@/shared/helpers/general';
import ResultSectionChart from '../components/layout/resultSectionChart';
import Link from 'next/link';

async function PollResult({ id } : { id: string }) {
  try {
    const { data } = await GET({
      route: `/polls/${decryptId(id)}/results/updated`,
      isServer: true
    })

    const results = data.results
    const poll = results.poll
    const sections = results?.sections || []

    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <h3 className='text-sm font-bold text-gray-600'>
          <Link href="/polls" className='text-blue-600 hover:underline'>Polls</Link> /
          Poll Results
        </h3>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{poll.title}</h1>
        
        <div className="grid  gap-8">
          {sections.length > 0 ? (
            sections.map((section: any, index: number) => (
              <div key={section.sectionId} className="w-full bg-white rounded-lg shadow-md p-6">
                <p className='text-xs font-medium text-gray-600'>Section {index + 1}</p>
                <h4 className='font-bold text-gray-600'>{poll.sections[index]?.name}</h4>
                <p className='text-xs'>Total votes: {results.voteCount}</p>
                <div className='grid grid-cols-2 mt-6 gap-6'>
                  <div>
                    {(() => {
                      const sectionData = poll.sections[index]
                      const sectionVoteMap = sectionData?.sectionId ? section?.[sectionData.sectionId] ?? {} : {}

                      const rankedVotes = Object.entries(sectionVoteMap)
                        .map(([optionId, votes]) => ({
                          optionId,
                          optionName: sectionData?.options?.find((opt: any) => opt.optionId === optionId)?.name || `Option ${optionId}`,
                          votes: Number(votes) || 0
                        }))
                        .sort((a, b) => b.votes - a.votes)

                      if (rankedVotes.length === 0) {
                        return <p className='text-sm text-gray-500'>No ranking data available.</p>
                      }

                      return (
                        <div className='space-y-2'>
                          <p className='text-xs font-semibold text-gray-600'>Ranking</p>
                          {rankedVotes.map((item, itemIndex) => (
                            <div
                              key={item.optionId}
                              className='flex items-center justify-between rounded-md border border-gray-200 px-3 py-2'
                            >
                              <p className='text-sm text-gray-700'>
                                {itemIndex + 1}. {item.optionName}
                              </p>
                              <p className='text-xs font-medium text-gray-600'>Count: {item.votes}</p>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </div>
                  <ResultSectionChart sectionResult={section} sectionData={poll.sections[index]} />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No results available for this poll.</p>
            </div>
          )}
        </div>
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