import { GET } from '@/shared/config/api/crud';
import { decryptId } from '@/shared/helpers/general';
import ResultSectionChart from '../components/layout/resultSectionChart';

async function PollResult({ id } : { id: string }) {
  try {
    const { data } = await GET({
      route: `/polls/${decryptId(id)}/results/updated`,
      isServer: true
    })

    const results = data.results
    const poll = results.poll
    const sections = results?.sections || []

    console.log('Fetched poll results:', results)

    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <h3 className='text-sm font-bold text-gray-600'>Poll Results</h3>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{poll.title}</h1>
        
        <div className="grid  gap-8">
          {sections.length > 0 ? (
            sections.map((section: any, index: number) => (
              <div key={section.sectionId} className="w-full bg-white rounded-lg shadow-md p-6">
                <p className='text-xs font-medium text-gray-600'>Section {index + 1}</p>
                <h4 className='font-bold text-gray-600'>{poll.sections[index]?.name}</h4>
                <p className='text-xs'>Total votes: {section.totalVotes}</p>
                <div className='grid grid-cols-2 mt-6'>
                  <div>

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