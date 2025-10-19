export const formatUrl = (route: string) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${route}`;
  return url.replace(/\/+$/, '')
}

export const encryptId = (id: string) => {
  const buffer = Buffer.from(id, 'utf-8');
  return buffer.toString('base64');
}

export const decryptId = (encryptedId: string) => {
  const buffer = Buffer.from(encryptedId, 'base64');
  return buffer.toString('utf-8');
}