import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  [x: string]: any
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={`px-8 py-6 ${className}`} {...props}>
      {children}
    </div>
  )
}