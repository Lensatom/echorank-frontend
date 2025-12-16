import { Sidebar } from '@/shared/components/layout'
import React from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar className="w-[12%]" />
      <div className='pl-[12%] w-full bg-gray-100'>
        {children}
      </div>
    </div>
  )
}