import React from 'react';
import { useDrop } from 'react-dnd';
import type { DragOptionItem } from './option';

interface DropZoneProps {
  onDrop: (item: DragOptionItem) => void,
  full?: boolean
}

const DropZone = ({
  onDrop,
  full=false
}: DropZoneProps) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item: DragOptionItem, monitor) => {
      if (monitor.didDrop()) {
        return undefined;
      }

      onDrop(item);
      return { handled: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  const dropRef = React.useRef<HTMLDivElement | null>(null);
  drop(dropRef);

  const baseClasses = 'cursor-pointer rounded-md h-3 transition-all duration-200 text-center select-none';
  const hoverClasses = 'hover:w-10';
  const activeClasses = isOver ? 'h-10 text-white border-2 border-gray-200 border-dashed' : 'border-black';

  return (
    <div
      ref={dropRef}
      className={`${full ? '!h-[200px]' : ''} ${baseClasses} ${hoverClasses} ${activeClasses}`}
    >
      {/* Drop here */}
    </div>
  );
};

export default DropZone;