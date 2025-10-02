import { Button, Input } from '@/components/ui'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function Register() {
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-xl font-semibold'>Create an Account</h1>
      <p className='mt-1 text-sm text-gray-600'>Kindly enter your details to register.</p>

      <form className='mt-4 w-3/4' action='#'>
        <div className='flex gap-4'>
          <div className='w-full'>
            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mt-6'>Firstname</label>
            <Input type='text' placeholder='Firstname' className='mt-2' />
          </div>
          <div className='w-full'>
            <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mt-6'>Lastname</label>
            <Input type='text' placeholder='Lastname' className='mt-2' />
          </div>
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 mt-6'>Email</label>
          <Input type='email' placeholder='Email' className='mt-2' />
        </div>
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700 mt-6'>Password</label>
          <Input type='password' placeholder='Password' className='mt-2' />
        </div>
        <Button type='submit' className='mt-7 w-full'>Register</Button>
      </form>

      <p className='mt-4 text-sm text-gray-600'>
        Already have an account?
        <Link href='/login' className='text-primary font-medium hover:underline'> Login</Link>
      </p>
    </div>
  )
}