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
    const sections = results?.sections || []

    console.log("Processed poll results sections:", sections)

    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Poll Results</h1>
        
        <div className="grid  gap-8">
          {sections.length > 0 ? (
            sections.map((section: any) => (
              <div key={section.sectionId} className="w-full bg-white rounded-lg shadow-md p-6">
                <ResultSectionChart sectionData={section} />
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