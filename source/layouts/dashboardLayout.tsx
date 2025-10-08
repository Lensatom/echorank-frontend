import { Sidebar } from '@/components/layout'
import React from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='ml-24'>
        {children}
      </div>
    </div>
  )
}