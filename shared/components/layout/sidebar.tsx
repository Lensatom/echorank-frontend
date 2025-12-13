'use client'

import { History, Home, PlusCircle, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    { icon: Home, label: 'Home', route: '/home' },
    { icon: History, label: 'History', route: '/history' },
    { icon: PlusCircle, label: 'Create', route: `/create?id=${uuidv4()}` },
    { icon: User, label: 'Profile', route: '/profile' }
  ]

  return (
    <div className='fixed h-screen bg-gray-100 w-20 border-r flex flex-col pt-24 items-center gap-8 text-gray-600'>
      {routes.map((route) => {
        const isActive = pathname.includes(route.route.split('?')[0])
        return (
          <Link href={route.route} key={route.label} className={`flex flex-col items-center justify-center rounded-lg`}>
            <div className={`flex items-center justify-center h-8 w-8 rounded-lg ${isActive ? 'bg-blue-500' : 'bg-transparent'}`}>
              <route.icon size={18} className={isActive ? 'text-white' : 'text-gray-600'} />
            </div>
            <span className={`text-[10px] ${isActive ? 'text-black font-semibold' : 'text-gray-600'}`}>{route.label}</span>
          </Link>
        )
      })}
    </div>
  )
}