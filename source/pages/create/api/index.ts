import { POST } from "@/config/api/crud"
import { useMutation } from "@tanstack/react-query"

export const useCreatePoll = () => {
  const { mutateAsync: createPoll, ...rest } = useMutation({
    mutationFn: async (data: any) => {
      const res = await POST({
        route: "/poll",
        data,
      })
    }
  })

  return { createPoll, ...rest }
}