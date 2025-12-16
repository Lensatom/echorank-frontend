"use client"

import { Button, Input } from '@/shared/components/ui'
import { useForm } from '@/shared/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useLogin } from '../api'
import { storeToken } from '@/shared/config/api/services'

export function Login() {

  const router = useRouter()

  const { data, changeData, error } = useForm({
    email: "",
    password: ""
  })
  const [ showPassword, setShowPassword ] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const { login } = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        const res = await login(data)
        await storeToken(res.data.token)
        router.replace('/home')
      } catch (error) {
        console.error("error", error)
      }
    })
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-xl font-semibold'>Welcome Back!</h1>
      <p className='mt-1 text-sm text-gray-600'>Kindly enter your credentials to continue.</p>
    
      <form onSubmit={handleSubmit} className='mt-4 w-3/4' action='#'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 mt-6'>Email</label>
          <Input
            type='email'
            placeholder='Email'
            value={data.email}
            onChange={(e) => changeData("email", e.target.value)}
            className='mt-2'
          />
        </div>
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700 mt-6'>Password</label>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='mt-2'
            value={data.password}
            onChange={(e) => changeData("password", e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center mt-2'>
          <Button onClick={() => setShowPassword(!showPassword)} variant='ghost' className='!p-0 text-xs cursor-pointer !font-normal'>
            {showPassword ? "Hide" : "Show"}
          </Button>
          <div className=''>
            <a href='#' className='text-xs text-gray-600 hover:underline'>Forgot password?</a>
          </div>
        </div>
        <Button type='submit' className='mt-6 w-full' isLoading={isPending}>Login</Button>
      </form>

      <p className='mt-4 text-sm text-gray-600'>
        Don't have an account?
        <Link href='/register' className='text-primary font-medium hover:underline'> Register</Link>
      </p>
    </div>
  )
}