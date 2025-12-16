import { Container } from '@/shared/components/layout'
import { Button } from "@/shared/components/ui"
import { CheckCircle, Clock12, Notebook, PlusCircle } from 'lucide-react'
import { PublishedByYou } from '../components'

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
    <Container className='min-h-screen flex flex-col gap-10'>
      <div className='grid grid-cols-9 gap-6'>
        <Container className='relative col-span-6 bg-blue-900 text-white rounded-md overflow-hidden'>
          <div className="absolute h-[400px] w-1/3 right-0 -top-[100px] bg-blue-100 rounded-l-full border-16 border-r-0 !border-blue-300" />
          <div>
            <h1 className='text-xl font-bold'>Hi Nifemi, <span className='text-xs text-blue-200'>Let's make fairer decisions today</span></h1>
            <h2 className='text-sm font-medium text-blue-50'></h2>
            <p className='mt-2 text-[10px] text-gray-300 font-medium w-[40%]'>
              EchoRank uses instant runoff voting to ensure that every voice is heard. Make decisions that truly reflect the will of the group.
            </p>
          </div>
          <Button size="sm" className="bg-white text-black mt-4 !text-xs !rounded-sm">Create a Form now</Button>
        </Container>

        <div className='col-span-3 bg-gray-50 rounded-md shadow-sm shadow-gray-200 p-4 flex items-center gap-4'>
          <div className='h-full w-1/3 rounded-md bg-gray-200'></div>
          <div>
            <h3 className='font-medium text-xl text-gray-600'>Nifemi Oluwatosin</h3>
            <p className='text-sm'>20 Polls Published</p>
          </div>
        </div>
      </div>

      {/* <Container className='col-span-3 row-span-2 bg-gray-100 rounded-lg'>
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
      </Container> */}

      <section className='col-span-9'>
        <h4 className="text-base font-bold text-gray-600">Continue voting</h4>
        <div className='mt-3 grid grid-cols-4 gap-x-3 gap-y-6'>
          {pendingForms.map((form, index) => (
            <div key={index} className='relative mr-4 overflow-hidden bg-gray-50 shadow-md shadow-gray-200 rounded-md p-4 w-full'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-sm bg-gray-200' />
                <div>
                  <h4 className='text-xs font-bold text-gray-600'>{form.name}</h4>
                  <p className='text-[10px] text-gray-500'>Nifemi Oluwatosin</p>
                </div>
              </div>
              <div className='h-[5px] mt-3 w-full bg-gray-200'>
                <div className='h-full bg-blue-400' style={{ width: `${form.percentageComplete}%` }} />
              </div>
              <p className='text-[10px] text-gray-500 mt-1'>{form.questionCount} Sections - {form.percentageComplete}% complete</p>
              <div className='grid grid-cols-2 mt-4 gap-3'>
                <Button size="sm" className='w-full !text-[10px] !px-2 !py-1 !bg-gray-100 !text-gray-500 !hover:bg-blue-200 !hover:text-blue-800'>Discard</Button>
                <Button size="sm" className='w-full !text-[10px] !bg-blue-100 !text-gray-500'>Continue</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='col-span-9'>
        <h4 className="text-base font-bold text-gray-600">Published by you</h4>
        <div className='mt-3 grid grid-cols-3 gap-[1px]'>
          {pendingForms.map((form, index) => (
            <div key={index} className='relative mr-4 overflow-hidden bg-gray-50 shadow-sm shadow-gray-200 p-4 w-full'>
              {/* <div className='absolute top-0 left-0 h-[5px] w-full bg-gray-200'>
                <div className='h-full bg-blue-500' style={{ width: `${form.percentageComplete}%` }} />
              </div> */}
              <div className='bg-amber-500 w-full h-[200px]'>

              </div>
              <h4 className='mt-3 text-sm font-bold text-gray-600'>{form.name}</h4>
              <div className='flex flex-col gap-1 text-xs text-gray-500 mt-2'>
                <h5><span className='font-semibold'>Vote count:</span> 20,000</h5>
                <h5><span className='font-semibold'>Last result update:</span> Oct. 5th 2025</h5>
              </div>
              {/* <p className='text-[10px] text-gray-500'>{form.questionCount} Sections - {form.percentageComplete}% complete</p> */}
              <Button size="sm" className='w-full !text-[10px] mt-4 !px-2 !py-1 !bg-blue-100 !text-gray-500 !hover:bg-blue-200 !hover:text-blue-800'>View details</Button>
              <div className='grid grid-cols-2 mt-2 gap-2'>
                {/* <Button size="sm" className='w-full !text-[10px]'>Continue</Button> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className='col-span-6 row-span-2'>
        {/* <div className="col-span-6 flex flex-col p-4 border rounded-xl">
          <h4 className="text-xs font-semibold text-gray-600">Continue Voting</h4>
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
        </div> */}

        {/* <div className="col-span-6 flex flex-col mt-6">
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
        </div> */}
      </div> 

      {/* <PublishedByYou /> */}
    </Container>
  )
}