import { Container } from '@/components/layout'
import { Button } from "@/components/ui"
import { CheckCircle, Clock12, Notebook, PlusCircle } from 'lucide-react'
import { PublishedByYou } from './components'

export function Home() {

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

  return (
    <Container className='grid grid-cols-9 gap-6'>
      <div className='col-span-9'>
        <h2 className='text-xl font-bold'>Hello, Jayden</h2>
      </div>

      <Container className='relative col-span-6 bg-blue-900 text-white rounded-xl overflow-hidden'>
        <div>
          <h3 className='text-lg font-bold'>Make Fairer Decisions</h3>
          <p className='mt-1 text-xs text-gray-300 w-1/2'>
            EchoRank uses instant runoff voting to ensure that every voice is heard. Make decisions that truly reflect the will of the group.
          </p>
        </div>
        <div className="absolute h-[400px] w-1/3 right-0 -top-[100px] bg-blue-100 rounded-l-full border-16 border-r-0 !border-blue-300">
        </div>
        <Button size="sm" className="bg-white text-black mt-4 !text-xs">Create a Form now</Button>
      </Container>

      <Container className='col-span-3 row-span-2 bg-gray-100 rounded-lg'>
        <h4 className="text-xs text-gray-500 font-semibold">Drafts (10)</h4>
      </Container>

      <Container className='border rounded-lg col-span-2'>
        <Notebook />
      </Container>
      <Container className='border rounded-lg col-span-2'>
        <PlusCircle />
      </Container>
      <Container className='border rounded-lg col-span-2'>
        <Clock12 />
      </Container>

      <div className='col-span-6 row-span-2'>
        <div className="col-span-6 flex flex-col p-4 border rounded-xl">
          <h4 className="text-xs font-semibold text-gray-600">Continue Filling</h4>
          <div className='overflow-x-auto mt-2'>
            <div className="gap-4 whitespace-nowrap">
              {pendingForms.map((form, index) => (
                <Container key={index} className='inline-block mr-4 border rounded-lg !p-3.5 !w-[200px]'>
                  <h4 className='text-xs font-bold text-gray-600'>{form.name}</h4>
                  <div className='flex flex-col gap-1 mt-1'>
                    <p className='text-[10px] text-gray-500'>{form.percentageComplete}% complete - {form.questionCount} Sections</p>
                    <div className='h-1 w-full rounded-full bg-gray-200'>
                      <div className='h-1 rounded-full bg-blue-500' style={{ width: `${form.percentageComplete}%` }} />
                    </div>
                    <Button size="sm" className='!text-[10px] !px-2 !py-1 !mt-2 !bg-blue-100 !text-blue-700 !hover:bg-blue-200 !hover:text-blue-800'>Continue</Button>
                  </div>
                </Container>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-6 flex flex-col mt-6">
          <h4 className="text-xs font-semibold text-gray-600">Submitted Forms</h4>
          <div className='grid grid-cols-4 gap-4 mt-2'>
            {pendingForms.map((form, index) => (
              <Container key={index} className='inline-block border rounded-lg !p-3.5'>
                <h4 className='text-xs font-bold text-gray-600'>{form.name}</h4>
                <div className='flex items-center gap-1'>
                  <CheckCircle size={10} />
                  <p className='text-[10px] text-gray-500'>{form.questionCount} Sections</p>
                </div>
                <Button size="sm" className='w-full !text-[10px] !px-2 !py-1 !mt-2 !bg-gray-100 !text-gray-700 !hover:bg-purple-200 !hover:text-purple-800'>View</Button>
              </Container>
            ))}
          </div>
        </div>
      </div> 

      <PublishedByYou />
    </Container>
  )
}