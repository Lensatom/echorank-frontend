import { POST } from "@/shared/config/api/crud";
import { useMutation } from "@tanstack/react-query";
import { ICreatePoll } from "../context";

export const useCreatePoll = () => {
  const { mutateAsync:createPoll, ...rest } = useMutation({
    mutationFn: async (data:ICreatePoll) => {
      const response = await POST({
        route: '/polls',
        data
      })
      return response
    }
  })
  return { createPoll, ...rest }
}