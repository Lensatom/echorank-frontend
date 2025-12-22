import { Container } from "@/shared/components/layout"
import { GET } from "@/shared/config/api/crud"
import { decryptId } from "@/shared/helpers/general"
import Image from "next/image"
import { getPollImage } from "../helpers/utils"
import { Button } from "@/shared/components/ui"
import Link from "next/link"

export async function PollDetails({ id } : { id: string }) {
  const decryptedId = decryptId(id)

  const response = await GET({
    route: `/polls/${decryptedId}`,
    isServer: true
  })

  const pollData = response.poll

  console.log('Fetched poll data:', pollData)

  const illustrationSrc = getPollImage(pollData._id)

  return (
    <Container className="relative flex flex-col justify-center items-center h-screen overflow-hidden !p-0">
      <div className="w-full h-full flex items-end -mb-[200px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <Image
            key={num}
            alt={`${pollData.title} illustration`}
            width={500}
            height={500}
            src={illustrationSrc}
            priority={false}
            className="opacity-20"
          />
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="pb-4 px-6 pt-12 bg-white shadow-md shadow-gray-200 w-[40%] flex flex-col items-center rounded-md text-center">
          {illustrationSrc && (
            <Image
              alt={`${pollData.title} illustration`}
              width={100}
              height={100}
              src={illustrationSrc}
              priority={false}
            />
          )}
          <h1 className="text-2xl font-bold text-gray-800 mt-6">{pollData.title}</h1>
          <p className="text-xs text-gray-600">By Kehinde Iyanu &bull; Contains {pollData.sections.length} sections</p>
          <p className="text-sm mt-2">{pollData.description}</p>
          <Link href={`/polls/${id}/vote`} className="mt-6 w-full bg-blue-500 text-white rounded-md text-sm font-medium p-3">
            Start voting now
          </Link>
          <p className="text-[10px] mt-4 text-gray-500">Created on Oct. 23rd 2025</p>
        </div>
      </div>
    </Container>
  )
}