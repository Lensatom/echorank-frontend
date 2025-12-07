import { POST } from "@/config/api/crud"
import { useMutation } from "@tanstack/react-query"
import { describe } from "node:test"

export const useCreatePoll = () => {
  const { mutateAsync: createPoll, ...rest } = useMutation({
    mutationFn: async (data: any) => {
      const res = await POST({
        route: "/polls",
        // TODO: Fix description being hardcoded
        data: {...data, description: 'test1000'},
      })
    }
  })

  return { createPoll, ...rest }
}