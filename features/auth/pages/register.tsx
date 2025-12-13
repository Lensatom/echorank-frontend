"use client"

import { Button, Input } from '@/shared/components/ui'
import { storeToken } from '@/shared/config/api/tokenManager'
import { useForm } from '@/shared/hooks'
import Link from 'next/link'
import React from 'react'
import { useRegister } from '../api'
import { useRouter } from 'next/navigation'

export function Register() {

  const router = useRouter()
  
  const { data, changeData, error } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  })
  const [ showPassword, setShowPassword ] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const { register } = useRegister()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        const res = await register(data)
        await storeToken(res.token)
        router.replace('/home')
      } catch (error) {
        console.error("error", error)
      }
    })
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-xl font-semibold'>Create an Account</h1>
      <p className='mt-1 text-sm text-gray-600'>Kindly enter your details to register.</p>

      <form onSubmit={handleSubmit} className='mt-4 w-3/4' action='#'>
        <div className='flex gap-4'>
          <div className='w-full'>
            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mt-6'>Firstname</label>
            <Input value={data.first_name} onChange={(e) => changeData("first_name", e.target.value)} type='text' placeholder='Firstname' className='mt-2' />
          </div>
          <div className='w-full'>
            <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mt-6'>Lastname</label>
            <Input value={data.last_name} onChange={(e) => changeData("last_name", e.target.value)} type='text' placeholder='Lastname' className='mt-2' />
          </div>
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 mt-6'>Email</label>
          <Input value={data.email} onChange={(e) => changeData("email", e.target.value)} type='email' placeholder='Email' className='mt-2' />
        </div>
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700 mt-6'>Password</label>
          <Input value={data.password} onChange={(e) => changeData("password", e.target.value)} type='password' placeholder='Password' className='mt-2' />
        </div>
        <Button type='submit' className='mt-7 w-full' isLoading={isPending}>Register</Button>
      </form>

      <p className='mt-4 text-sm text-gray-600'>
        Already have an account?
        <Link href='/login' className='text-primary font-medium hover:underline'> Login</Link>
      </p>
    </div>
  )
}