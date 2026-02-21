"use client"

import React from 'react';
import { useDrag } from 'react-dnd';
import { IPollOption } from '../../interfaces';

export interface DragOptionItem {
  optionId: string,
  optionName: string
}

interface IOptionProps {
  option: IPollOption
  sectionId: string
}

export function Option({
  option,
}: IOptionProps) {
  const dragItem: DragOptionItem = React.useMemo(() => (
    { optionId: option.optionId, optionName: option.name }),
    [option.optionId, option.name]
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
        cursor: 'grab'
      }}
      className='text-sm flex items-center justify-between bg-gray-200 p-4'
    >
      <span className='text-xs text-gray-600 font-medium'>{option.name}</span>
    </div>
  )
}