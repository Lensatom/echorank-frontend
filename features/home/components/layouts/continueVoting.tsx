import { Button } from '@/shared/components/ui'
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const pendingForms = [
  {
    name: "Class Governor Poll",
    questionCount: 10,
    percentageComplete: 40
  },
  {
    name: "Best Student Council Member",
    questionCount: 8,
    percentageComplete: 50
  },
  {
    name: "Favorite Teacher Survey",
    questionCount: 12,
    percentageComplete: 30
  },
  {
    name: "School Event Feedback",
    questionCount: 5,
    percentageComplete: 20
  }
]

export function ContinueVoting({className}: {className?: string}) {
  return (
    <section className={`${className}`}>
      <h4 className="text-base font-bold text-gray-600">Continue voting</h4>
      <div className='mt-3 grid grid-cols-4 gap-x-3 gap-y-6'>
        {pendingForms.map((form, index) => (
          <div key={index} className='relative mr-4 overflow-hidden bg-gray-50 shadow-md shadow-gray-200 rounded-md p-4 w-full'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-sm bg-gray-200 flex items-center justify-center overflow-hidden'>
                <Image alt="Form Image" width={32} height={32} src="https://i.pinimg.com/1200x/da/a0/66/daa066e79537e2f170a8fdabb7a94476.jpg" />
              </div>
              <div>
                <h4 className='text-xs font-bold text-gray-600'>{form.name}</h4>
                <p className='text-[10px] text-gray-500'>Nifemi Oluwatosin</p>
              </div>
            </div>
            <div className='h-[5px] mt-3 w-full bg-gray-200'>
              <div className='h-full bg-blue-400' style={{ width: `${form.percentageComplete}%` }} />
            </div>
            <p className='text-[10px] text-gray-500 mt-1'>{form.questionCount} Sections - {form.percentageComplete}% complete</p>
            <div className='flex mt-4 gap-2'>
              <Button size="sm" className='col-span-1 !text-[8px] !px-2 !py-1 !bg-white border border-gray-100 !text-gray-500 !hover:bg-blue-200 !hover:text-blue-800'>
                <X />
              </Button>
              <div className='w-full'>
                <Button size="sm" className='w-full !bg-white !text-gray-500 border !text-xs !font-semibold border-gray-100'>Continue</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}