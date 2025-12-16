'use client'

import { AlignVerticalDistributeEnd, BadgeInfo, Home, SquarePlus, User, Vote } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar({
  className
}: {
  className?: string
}) {
  const pathname = usePathname()

  const routes = [
    { icon: Home, label: 'Home', route: '/home' },
    { icon: Vote, label: 'Polls', route: '/history' },
    { icon: AlignVerticalDistributeEnd, label: 'Votes', route: '/history' },
    { icon: SquarePlus, label: 'Create', route: '/create' },
    { icon: BadgeInfo, label: 'Help', route: '/help' },
    { icon: User, label: 'Profile', route: '/profile' }
  ]

  return (
    <div className={`fixed h-screen bg-white flex flex-col pt-24 p-4 gap-4 text-gray-600 ${className}`}>
      {routes.map((route) => {
        const isActive = pathname.includes(route.route.split('?')[0])
        return (
          <Link href={route.route} key={route.label} className={`flex items-center gap-3 rounded-lg p-3 ${isActive ? "bg-blue-100 text-blue-500 font-semibold" : ""}`}>
            <route.icon size={20} fill={isActive ? "#155dfc" : "none"} fillOpacity={0.8} />
            <span className="text-xs">{route.label}</span>
          </Link>
        )
      })}
    </div>
  )
}