import React from 'react'
import * as illustrations from "../../assets"
import { idToNumber } from "../../helpers/utils"
import { Button } from '@/shared/components/ui'
import Image from 'next/image'

export function PollCard({
  pollData
} : {pollData: any}) {
  
  const illustrationMap: Record<
    1|2|3|4|5|6|7|8|9|10,
    keyof typeof illustrations
  > = {
    1: "ForestBro",
    2: "ForestPana",
    3: "ForestRafiki",
    4: "HappySunRafiki",
    5: "MangoTreeAmico",
    6: "SpringFlowerCuate",
    7: "SpringFlowerPana",
    8: "StrelitziaPlantRafiki",
    9: "SunsetPana",
    10: "WindTurbineCuate",
  }

  const colorMap = {
    1: "bg-red-100",
    2: "bg-green-100",
    3: "bg-yellow-100",
    4: "bg-pink-100",
    5: "bg-red-100",
    6: "bg-purple-100",
    7: "bg-indigo-100",
    8: "bg-teal-100",
    9: "bg-orange-100",
    10: "bg-cyan-100",
  }
  
  const number: 1|2|3|4|5|6|7|8|9|10 = idToNumber(pollData._id) as 1|2|3|4|5|6|7|8|9|10
  const key = illustrationMap[number]
  const illustrationSrc = illustrations[key] as unknown as string

  return (
    <div>
      <div key={pollData._id} className='relative mr-4 overflow-hidden bg-gray-50 shadow-sm shadow-gray-200 p-4 w-full'>
        <div className={`relative rounded-lg bg-gray-100 w-full h-[100px] flex justify-center items-start overflow-hidden`}>
          {illustrationSrc && (
            <Image
              alt={`${pollData.title} illustration`}
              width={150}
              height={150}
              src={illustrationSrc}
              priority={false}
            />
          )}
        </div>
        <h4 className='mt-3 text-sm font-bold text-gray-600'>{pollData.title}</h4>
        <div className='flex flex-col gap-1 text-xs text-gray-500 mt-2'>
          <h5><span className='font-semibold'>Vote count:</span> 20,000</h5>
          <h5><span className='font-semibold'>Last result update:</span> Oct. 5th 2025</h5>
        </div>
        <Button size="sm" className='w-full !text-[10px] mt-4 !px-2 !py-1 !bg-blue-100 !text-gray-500 !hover:bg-blue-200 !hover:text-blue-800'>View details</Button>
        <div className='grid grid-cols-2 mt-2 gap-2'>
        </div>
      </div>
    </div>
  )
}