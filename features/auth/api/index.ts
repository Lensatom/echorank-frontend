import { POST } from "@/shared/config/api/crud";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  const { mutateAsync:login, ...rest } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await POST({
        route: '/auth/login',
        data,
        authorization: false
      })
      return response
    },
  })
  return { login, ...rest }
}

export const useRegister = () => {
  const { mutateAsync:register, ...rest } = useMutation({
    mutationFn: async (data: { email: string; password: string, first_name: string, last_name: string }) => {
      const response = await POST({
        route: '/auth/register',
        data,
        authorization: false
      })
      return response
    }
  })
  return { register, ...rest }
}

export const useStoreToken = () => {
  const { mutateAsync:storeToken, ...rest } = useMutation({
    mutationFn: async (token: string) => {
      await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
    }
  })
  return { storeToken, ...rest }
}

export const useGetToken = () => {
  const { data: token } = useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      const response = await fetch('/api/token');
      if (!response.ok) throw new Error('Failed to fetch token');
      const data = await response.json();
      return data.token;
    }
  });
  return { token };
}