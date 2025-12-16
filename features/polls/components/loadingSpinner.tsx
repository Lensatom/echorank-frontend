"use client"

import { Container } from '@/shared/components/layout'

export function LoadingSpinner() {
  return (
    <Container className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading...</h2>
        <p className="text-gray-500">Preparing your poll workspace</p>
      </div>
    </Container>
  )
}