import { Button } from '@/components/ui'
import { Settings } from 'lucide-react'
import React from 'react'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-2 items-center min-h-screen'>
      <div className='bg-purple-100 min-h-screen'>
        <div className='relative w-full h-full'>
        </div>
    </div>
      <div className='p-16 flex flex-col items-center'>
        {children}
        <div className='w-3/4'>
          <div className='my-6 w-full flex items-center gap-4'>
            <hr className='w-full' />
            <p className='text-center text-sm text-gray-600 whitespace-nowrap'>Or continue with</p>
            <hr className='w-full' />
          </div>
          <Button variant='outline' className='w-full'>
            <Settings />
            Google
          </Button>
        </div>

        <p className='mt-4 text-xs text-center text-gray-600'>
          By continuing, you agree to our
          <a href='/auth/terms' className='text-primary font-medium hover:underline'> Terms of Service </a>
          and
          <a href='/auth/privacy' className='text-primary font-medium hover:underline'> Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}