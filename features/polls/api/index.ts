import { GET, POST } from "@/shared/config/api/crud"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetPollById = ({ id }: { id: string }) => {
  const { data: poll, ...rest } = useQuery({
    queryKey: ['poll', id],
    queryFn: async () => {
      const res = await GET({ route: `/polls/${id}` })
      return res.poll;
    }
  })
  return { poll, ...rest }
}

export const usePostVote = () => {
  const { mutateAsync: postVote, ...rest } = useMutation({
    mutationFn: async ({id, data} : {id: string, data: {sections: {sectionId: string, ranking: string[]}[]}}) => {
      const res = await POST({
        route: `/polls/${id}/vote`,
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
      const res = await GET({ route: `/polls/${id}/results/updated` })
      return res.result;
    }
  })
  return { results, ...rest }
}

export const useCreatePoll = () => {
  const { mutateAsync: createPoll, ...rest } = useMutation({
    mutationFn: async (data: any) => {
      const res = await POST({
        route: "/polls",
        // TODO: Fix description being hardcoded
        data: {...data, description: 'test1000'},
      })
      return res;
    }
  })
  return { createPoll, ...rest }
}