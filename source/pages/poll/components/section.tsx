"use client"

import { Container } from '@/components/layout';
import { Input } from '@/components/ui';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Option } from './option';
import DropZone from './dropZone';
import type { DragOptionItem } from './option';
import { X } from 'lucide-react';

interface ISectionData {
  sectionId: string
  title: string
  options: {
    optionId: string
    title: string
    imageUrl?: string
  }[]
}

interface ISectionProps {
  section: ISectionData,
  ranking: DragOptionItem[],
  changeRankings: (newRankings:any) => void
}

export function Section({
  section,
  ranking,
  changeRankings
}: ISectionProps) {

  const [searchTerm, setSearchTerm] = React.useState('')
  const [availableOptions, setAvailableOptions] = useState(section.options);

  const filteredOptions = availableOptions.filter(option =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrop = (item: DragOptionItem, index: number) => {
    const newRanking = [...ranking];
    newRanking.splice(index, 0, item);
    changeRankings({
      sectionId: section.sectionId,
      ranking: newRanking
    });

    setAvailableOptions((prevOptions) =>
      prevOptions.filter(option => option.optionId !== item.name)
    );
  };

  const handleRemoveItem = (index: number) => {
    const updatedRanking = [...ranking];
    updatedRanking.splice(index, 1);
    changeRankings({
      sectionId: section.sectionId,
      ranking: updatedRanking
    });
    const removedItem = ranking[index];
    const removedOption = section.options.find(option => option.optionId === removedItem.name);
    if (removedOption) {
      setAvailableOptions((prevOptions) => [...prevOptions, removedOption]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container className='border rounded-lg'>
        <h3 className='text-sm font-bold text-gray-700'>{section.title}</h3>
        <p className='text-xs mt-1 text-gray-500'>
          Drag and drop options in the option box into the ranking box to rank them in an order of your preference.
        </p>
        <Container className='!px-4 !py-0 border rounded-md mt-3'>
          {/* <p className='text-xs font-semibold p-2 mt-2 rounded-md bg-green-100 text-green-600'>Ranking</p> */}
          <div className='min-h-[200px] w-full'>
            <DropZone full={ranking.length === 0} onDrop={(items) => handleDrop(items, 0)} />
            {ranking.length === 0 ? (
              <p className='text-xs text-gray-600 text-center mt-4'>Drag options here to rank them</p>
            ) : (
              <ul>
                {ranking.map((item, index) => (
                  <React.Fragment key={`${item.name}-${index}`}>
                    <div className='text-sm flex items-center justify-between bg-gray-200 p-4'>
                      <p>{item.title}</p>
                      <button onClick={() => handleRemoveItem(index)}>
                        <X className='text-gray-500' />
                      </button>
                    </div>
                    <DropZone onDrop={(items) => handleDrop(items, index + 1)} />
                  </React.Fragment>
              ))}
              </ul>
            )}
          </div>
        </Container>
        <Container className='!p-4 border rounded-md mt-3'>
          {/* <p className='text-xs font-semibold p-2 rounded-md bg-yellow-100 text-yellow-600'>Options</p> */}
          <p className='text-xs mt-3 text-gray-500'>
            Options are arranged in alphabetical order. Use the "others" tag to represent all options left
          </p>
          <Input placeholder='Search options' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className='mt-2 placeholder:text-xs' />
          <div className='flex flex-col gap-2 mt-3'>
            {filteredOptions.length === 0 && (
              <p className='text-xs text-gray-600 text-center mt-4'>No options found</p>
            )}
            {filteredOptions.map(option => (
              <Option key={option.optionId} option={option} sectionId={section.sectionId} />
            ))}
          </div>
        </Container>
      </Container>
    </DndProvider>
  )
}