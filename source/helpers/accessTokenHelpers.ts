export const saveAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
}