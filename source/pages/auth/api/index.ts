import { POST } from "@/config/axios/crud";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { mutateAsync:login, ...rest } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await POST({
        route: '/auth/login',
        data: { email, password },
        authorization: false
      })
      return response
    }
  })
  return { login, ...rest }
}

export const useRegister = () => {
  const { mutate:register, ...rest } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await POST({
        route: '/auth/register',
        data: { email, password },
        authorization: false
      })
      return response
    }
  })
  return { register, ...rest }
}