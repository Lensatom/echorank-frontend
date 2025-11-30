import { GET, POST } from "@/config/api/crud"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetPollById = ({ id }: { id: string }) => {
  const { data: poll, ...rest } = useQuery({
    queryKey: ['poll', id],
    queryFn: async () => {
      const res = await GET({
        route: `/poll/${id}`,
      })
      return res.poll;
    }
  })

  return { poll, ...rest }
}

export const usePostVote = () => {
  const { mutateAsync: postVote, ...rest } = useMutation({
    mutationFn: async ({id, data} : {id: string, data: {ranking: {sectionId: string, ranking: string[]}}}) => {
      const res = await POST({
        route: `/poll/${id}/vote`,
        data,
      })

      return res;
    }
  })

  return { postVote, ...rest }
}

export const useGetResults = ({ id }: { id: string }) => {
  const { data: results, ...rest } = useQuery({
    queryKey: ['poll', id, 'results'],
    queryFn: async () => {
      const res = await GET({
        route: `/poll/${id}/results`,
      })
      return res.result;
    }
  })

  return { results, ...rest }
}