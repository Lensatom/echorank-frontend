"use client"

import { Container } from '@/shared/components/layout';
import { Input } from '@/shared/components/ui';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Option } from './option';
import DropZone from './dropZone';
import type { DragOptionItem } from './option';
import { X } from 'lucide-react';
import { IPollOption, IPollSection } from '../interfaces';

interface ISectionProps {
  section: IPollSection,
  ranking: DragOptionItem[],
  changeRankings: (newRankings:any) => void
}

export function Section({
  section,
  ranking,
  changeRankings
}: ISectionProps) {

  const [searchTerm, setSearchTerm] = React.useState('')

  // Derive available options from original options minus ranked items
  const availableOptions = React.useMemo(() => (
    section.options.filter(opt => !ranking.some(r => r.name === opt.optionId))
  ), [section.options, ranking])

  const filteredOptions = React.useMemo(() => (
    availableOptions
      .filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
  ), [availableOptions, searchTerm])

  const newRanking = [...ranking];
  
  const handleDrop = (item: DragOptionItem, index: number) => {
    newRanking.splice(index, 0, item);

    changeRankings({
      sectionId: section.sectionId,
      ranking: newRanking
    });
  };

  const handleRemoveItem = (index: number) => {
    newRanking.splice(index, 1);
    changeRankings({
      sectionId: section.sectionId,
      ranking: newRanking
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container className='border rounded-lg h-full flex flex-col'>
        <h3 className='text-sm font-bold text-gray-700'>{section.name}</h3>
        <p className='text-xs mt-1 text-gray-500'>
          Drag and drop options in the option box into the ranking box to rank them in an order of your preference.
        </p>

        <div className='h-[92%] grid grid-cols-2 gap-4'>
          <Container className='h-full !px-4 !py-0 border rounded-md overflow-y-auto mt-3'>
            {/* <p className='text-xs font-semibold p-2 mt-2 rounded-md bg-green-100 text-green-600'>Ranking</p> */}
            <div className='min-h-[200px] w-full'>
              <DropZone full={ranking.length === 0} onDrop={(item) => handleDrop(item, 0)} />
              {ranking.length === 0 ? (
                <p className='text-xs text-gray-600 text-center mt-4'>Drag options here to rank them</p>
              ) : (
                <ul>
                  {ranking.map((item, index) => (
                    <React.Fragment key={`${item.name}-${index}`}>
                      <div className='text-sm flex items-center justify-between bg-gray-200 p-4'>
                        <p>{item.optionName}</p>
                        <button onClick={() => handleRemoveItem(index)}>
                          <X className='text-gray-500' />
                        </button>
                      </div>
                      <DropZone onDrop={(item) => handleDrop(item, index + 1)} />
                    </React.Fragment>
                ))}
                </ul>
              )}
            </div>
          </Container>
          <Container className='h-full !p-4 border rounded-md overflow-y-auto mt-3'>
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
        </div>
      </Container>
    </DndProvider>
  )
}