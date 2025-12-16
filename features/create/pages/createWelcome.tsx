import { Container } from '@/shared/components/layout'
import { CreatePollForm } from '../components/layouts'

export function CreateWelcome() {
  return (
    <Container className='min-h-screen w-full grid grid-rows-2'>
      <section className='w-full flex flex-col items-center justify-center '>
        <h1 className='text-3xl font-bold text-blue-500'>Create Poll</h1>
        <p className='text-gray-600 font-medium text-sm mt-2'>Name a new Poll or continue existing drafts</p>
        <CreatePollForm />
        <hr className='w-1/2 mt-12' />
      </section>
      <section className='flex border border-gray-400 rounded-md p-6 w-[60%] mx-auto'>
        <h3 className='text-sm text-gray-600 font-bold'>Your drafts</h3>
        
      </section>
    </Container>
  )
}