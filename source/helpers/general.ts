export const formatUrl = (route: string) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${route}`;
  return url.replace(/\/+$/, '')
}