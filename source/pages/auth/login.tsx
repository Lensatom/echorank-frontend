import { Button, Input } from '@/components/ui'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function Login() {
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-xl font-semibold'>Welcome Back!</h1>
      <p className='mt-1 text-sm text-gray-600'>Kindly enter your credentials to continue.</p>
    
      <form className='mt-4 w-3/4' action='#'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 mt-6'>Email</label>
          <Input type='email' placeholder='Email' className='mt-2' />
        </div>
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700 mt-6'>Password</label>
          <Input type='password' placeholder='Password' className='mt-2' />
        </div>
        <div className='mt-2'>
          <a href='#' className='text-xs text-gray-600 hover:underline'>Forgot password?</a>
        </div>
        <Button type='submit' className='mt-6 w-full'>Login</Button>
      </form>

      <p className='mt-4 text-sm text-gray-600'>
        Don't have an account?
        <Link href='/register' className='text-primary font-medium hover:underline'> Register</Link>
      </p>
    </div>
  )
}