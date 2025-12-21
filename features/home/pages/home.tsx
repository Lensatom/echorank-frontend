import { Container } from '@/shared/components/layout'
import { Button } from "@/shared/components/ui"
import { AlignVerticalDistributeEnd, Vote, X } from 'lucide-react'
import Image from 'next/image'

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

        <div className='grid grid-cols-2 grid-rows-2 col-span-3 bg-gray-50 rounded-md shadow-sm shadow-gray-200 p-4 gap-4'>
          <div className='col-span-2 flex items-center gap-3'>
            <div className='w-16 h-16 rounded-full bg-gray-100'></div>
            <div>
              <h4>Sharon Olonade</h4>
              <p className='text-xs text-gray-600'>sharon.olonade@gmail.com</p>
            </div>
          </div>
          <div className='rounded-md flex p-3 items-center space-x-3 border !border-gray-200'>
            <div className='bg-purple-100 w-10 h-10 rounded-full flex justify-center items-center'>
              <Vote className='text-purple-600' />
            </div>
            <div>
              <h4 className='text-xs font-semibold text-gray-800'>100</h4>
              <p className='text-[10px] text-gray-800'>Polls Created</p>
            </div>
          </div>
          <div className='rounded-md flex p-3 items-center space-x-3 border !border-gray-200'>
            <div className='bg-green-100 w-10 h-10 rounded-full flex justify-center items-center'>
              <AlignVerticalDistributeEnd className='text-green-600' />
            </div>
            <div>
              <h4 className='text-xs font-semibold text-gray-800'>100</h4>
              <p className='text-[10px] text-gray-800'>Votes Submitted</p>
            </div>
          </div>
        </div>
      </div>

      <section className='col-span-9'>
        <h4 className="text-base font-bold text-gray-600">Continue voting</h4>
        <div className='mt-3 grid grid-cols-4 gap-x-3 gap-y-6'>
          {pendingForms.map((form, index) => (
            <div key={index} className='relative mr-4 overflow-hidden bg-gray-50 shadow-md shadow-gray-200 rounded-md p-4 w-full'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-sm bg-gray-200 flex items-center justify-center overflow-hidden'>
                  <Image alt="Form Image" width={32} height={32} src="https://i.pinimg.com/1200x/da/a0/66/daa066e79537e2f170a8fdabb7a94476.jpg" />
                </div>
                <div>
                  <h4 className='text-xs font-bold text-gray-600'>{form.name}</h4>
                  <p className='text-[10px] text-gray-500'>Nifemi Oluwatosin</p>
                </div>
              </div>
              <div className='h-[5px] mt-3 w-full bg-gray-200'>
                <div className='h-full bg-blue-400' style={{ width: `${form.percentageComplete}%` }} />
              </div>
              <p className='text-[10px] text-gray-500 mt-1'>{form.questionCount} Sections - {form.percentageComplete}% complete</p>
              <div className='flex mt-4 gap-2'>
                <Button size="sm" className='col-span-1 !text-[8px] !px-2 !py-1 !bg-white border border-gray-100 !text-gray-500 !hover:bg-blue-200 !hover:text-blue-800'>
                  <X />
                </Button>
                <div className='w-full'>
                  <Button size="sm" className='w-full !bg-white !text-gray-500 border !text-xs !font-semibold border-gray-100'>Continue</Button>
                </div>
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
              <div className='bg-amber-500 w-full h-[200px] flex justify-center items-start overflow-hidden'>
                <Image alt="Form Image" width={400} height={400} src="https://i.pinimg.com/736x/0d/c4/10/0dc410d1947aa17cd0bfb457c6620f50.jpg" className='-mt-20' />
              </div>
              <h4 className='mt-3 text-sm font-bold text-gray-600'>{form.name}</h4>
              <div className='flex flex-col gap-1 text-xs text-gray-500 mt-2'>
                <h5><span className='font-semibold'>Vote count:</span> 20,000</h5>
                <h5><span className='font-semibold'>Last result update:</span> Oct. 5th 2025</h5>
              </div>
              <Button size="sm" className='w-full !text-[10px] mt-4 !px-2 !py-1 !bg-blue-100 !text-gray-500 !hover:bg-blue-200 !hover:text-blue-800'>View details</Button>
              <div className='grid grid-cols-2 mt-2 gap-2'>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}