import { Container, Header } from '@/components/layout';
import { GET } from '@/config/api/crud';
import { decryptId } from '@/helpers/general';
import { Section } from './components';

export async function Poll({ params }: { params: { id: string } }) {
  try {
    var { id } = await params;
    const decryptedId = decryptId(id);
    var res = await GET({
      route: `/poll/${decryptedId}`,
      isServer: true
    })
  } catch (error) {
    console.error('Error fetching poll data:', error)
  }

  const pollData = res?.poll;

  return (
    <>
      <Header />
      <Container className='w-[60%]'>
        <h2 className='text-lg font-bold text-gray-800'>{pollData?.title}</h2>
        <div className='mt-6'>
          {pollData?.sections?.map((section:any, index:number) => (
            <Section key={index} data={section} />
          ))}
        </div>
      </Container>
    </>
  )
}