import { Container } from '@/shared/components/layout'
import { Avatar, AvatarFallback, Button } from '@/shared/components/ui'
import { getToken } from '@/shared/config/api/tokenManager'
import { encryptId, formatUrl } from '@/shared/helpers/general'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export async function PublishedByYou() {
  try {
    const token = await getToken(true)
    const res = await fetch(formatUrl('/polls'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    console.log(data.data.polls)
    
    const publishedPolls = data.data.polls || []

    return (
      <div className='col-span-3 border p-6 rounded-xl'>
        <h4 className="text-xs font-semibold">Published by you</h4>
        <div className='flex flex-col mt-3 gap-3'>
          {publishedPolls.map((poll:any) => (
            <Link key={poll._id} href={`/poll/${encryptId(poll._id)}`}>
              <Container className='flex items-center justify-between gap-4 border rounded-lg !p-3.5'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-gray-100 rounded-lg flex justify-center items-center'>
                    <Avatar>
                      <AvatarFallback>{poll.title[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h4 className='text-xs font-bold text-gray-600'>{poll.title}</h4>
                    <div className='flex items-center gap-1'>
                      <CheckCircle size={10} />
                      <p className='text-[10px] text-gray-500'>{poll.voteCount} Responses</p>
                    </div>
                  </div>
                </div>
                <Button size="sm" className='!text-[10px] !px-2 !py-1 !bg-gray-100 !text-gray-700 !hover:bg-purple-200 !hover:text-purple-800'>View</Button>
              </Container>
            </Link>
          ))}
          {publishedPolls.length === 0 && (
            <p className='text-xs text-gray-500'>You have not published any polls yet.</p>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching published polls:", error)
    return <>ERROR!!!</>
  }
}