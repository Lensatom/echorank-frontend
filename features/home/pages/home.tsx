import { Container } from '@/shared/components/layout'
import { Button } from "@/shared/components/ui"
import { AlignVerticalDistributeEnd, Vote, X } from 'lucide-react'
import Image from 'next/image'
import { ContinueVoting, PublishedByYou } from '../components/layouts'

export function Home() {

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

      <ContinueVoting className='col-span-9' />
      <PublishedByYou className='col-span-9' />
    </Container>
  )
}