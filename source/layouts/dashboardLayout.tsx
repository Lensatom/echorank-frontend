import { History, Home, PlusCircle, User } from 'lucide-react'
import React from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <div className='fixed h-screen w-20 border-r flex flex-col pt-14 items-center gap-10 text-gray-600'>
        <Home size={22} />
        <History size={22} />
        <PlusCircle size={22} />
        <User size={22} />
      </div>
      <div className='ml-20'>
        {children}
      </div>
    </div>
  )
}