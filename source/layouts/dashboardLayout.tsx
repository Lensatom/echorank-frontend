import { Sidebar } from '@/components/layout'
import React from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='pl-20 w-full'>
        {children}
      </div>
    </div>
  )
}