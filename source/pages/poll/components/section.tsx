"use client"

import { Container } from '@/components/layout'
import { Input } from '@/components/ui'
import React from 'react'

interface ISectionData {
  title: string
  options: {
    _id: string
    title: string
    imageUrl?: string
  }[]
}

interface ISectionProps {
  data: ISectionData
}

export function Section({
  data
}: ISectionProps) {
  const sortedOptions = [...data.options].sort((a, b) => a.title.localeCompare(b.title))
  const [searchTerm, setSearchTerm] = React.useState('')
  const UIOptions = sortedOptions.filter(option => option.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Container className='border rounded-lg'>
      <h3 className='text-sm font-bold text-gray-700'>{data.title}</h3>
      <p className='text-xs mt-1 text-gray-500'>
        Drag and drop options in the option box into the ranking box to rank them in an order of your preference.
      </p>
      <Container className='!p-4 border rounded-md h-[200px] mt-3'>
        <span className='text-xs font-semibold p-2 rounded-md bg-green-100 text-green-600'>Ranking</span>
        <></>
      </Container>
      <Container className='!p-4 border rounded-md   mt-3'>
        <span className='text-xs font-semibold p-2 rounded-md bg-yellow-100 text-yellow-600'>Options</span>
        <p className='text-xs mt-3 text-gray-500'>
          Options are arranged in alphabetical order. Use the "others" tag to represent all options left
        </p>
        <Input placeholder='Search options' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className='mt-2 placeholder:text-xs' />
        <div className='flex flex-col gap-4 mt-3 h-[200px] overflow-y-auto'>
          {UIOptions.map(option => (
            <div key={option._id} className='flex items-center justify-center py-2 bg-gray-100 rounded-md border cursor-pointer hover:bg-gray-200 transition-colors'>
              <span className='text-xs text-gray-600 font-medium'>{option.title}</span>
            </div>
          ))}
          {UIOptions.length === 0 && (
            <p className='text-xs text-gray-600 text-center mt-4'>No options found</p>
          )}
        </div>
      </Container>
    </Container>
  )
}