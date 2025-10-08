import { History, Home, PlusCircle, User } from 'lucide-react'
import Link from 'next/link'
import { headers } from 'next/headers'

export async function Sidebar() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'

  const routes = [
    { icon: Home, label: 'Home', route: '/home' },
    { icon: History, label: 'History', route: '/history' },
    { icon: PlusCircle, label: 'Create', route: '/create' },
    { icon: User, label: 'Profile', route: '/profile' }
  ]

  return (
    <div className='fixed h-screen bg-gray-100 w-24 border-r flex flex-col pt-24 items-center gap-8 text-gray-600'>
      {routes.map((route) => (
        <Link href={route.route} key={route.label} className={`flex flex-col items-center justify-center rounded-lg`}>
          <div className={`flex items-center justify-center h-8 w-12 rounded-lg ${pathname.includes(route.route) ? 'bg-blue-500' : 'bg-transparent'}`}>
            <route.icon size={18} className={pathname.includes(route.route) ? 'text-white' : 'text-gray-600'} />
          </div>
          <span className={`text-[10px] ${pathname.includes(route.route) ? 'text-black font-semibold' : 'text-gray-600'}`}>{route.label}</span>
        </Link>
      ))}
    </div>
  )
}