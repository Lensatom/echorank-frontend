import { SERVER_BASE_URL } from '@/constants';
import { getAccessToken } from '@/helpers/accessTokenHelpers';
import axios, { AxiosError } from 'axios';

export type ApiRes<DataType = null> = {
  token: any;
  user(user: any): unknown;
  statusCode: number;
  message: string | null;
  data: DataType;
};

export const api = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {'Content-Type': 'application/json'},
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiRes>) => {
    const errorMsg = error.response?.data.message ?? 'An error occurred';
    console.log({ type: 'error', text1: errorMsg, position: 'bottom' })
    // Toast.show({ type: 'error', text1: errorMsg, position: 'bottom' });

    if (error.response?.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }

    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export function tokenInterceptor() {
  const interceptor = api.interceptors.request.use(
    async (config) => {
      const token = await getAccessToken();
      console.log('token:', token);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return () => {
    api.interceptors.request.eject(interceptor);
  };
}