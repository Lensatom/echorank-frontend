import { encryptId } from '@/shared/helpers/general'
import Image from 'next/image'
import Link from 'next/link'
import { getPollImage } from "../../helpers/utils"

export function PollCard({
  pollData
} : {pollData: any}) {
  
  const illustrationSrc = getPollImage(pollData._id)
  
  const encryptedId = encryptId(pollData._id)

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
        <Link href={`/polls/${encryptedId}`} className='block w-full !text-[10px] text-center p-2 mt-4 rounded-md !bg-blue-100 !text-gray-500 !hover:bg-blue-200 !hover:text-blue-800'>
          View details
        </Link>
        <div className='grid grid-cols-2 mt-2 gap-2'>
        </div>
      </div>
    </div>
  )
}