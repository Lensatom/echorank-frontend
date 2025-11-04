"use client"

import React from 'react';
import { useDrag } from 'react-dnd';

export interface DragOptionItem {
  name: string
}

interface IOptionProps {
  option: {
    optionId: string
    title: string
    imageUrl?: string
  },
  sectionId: string
}

export function Option({
  option,
}: IOptionProps) {
  const dragItem: DragOptionItem = React.useMemo(() => (
    { name: option.title }),
    [option.optionId]
  )

  const [{ isDragging }, drag] = useDrag<DragOptionItem, void, { isDragging: boolean }>(() => ({
    type: 'item',
    item: dragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [dragItem])

  const dragRef = React.useRef<HTMLDivElement | null>(null)
  drag(dragRef)

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'lightblue',
      }}
      className='flex items-center justify-center py-2 bg-gray-100 rounded-md border cursor-grab hover:bg-gray-200 transition-colors'
    >
      <span className='text-xs text-gray-600 font-medium'>{option.title}</span>
    </div>
  )
}