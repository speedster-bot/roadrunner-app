export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getUrl = (path: string): string => `${API_URL}/${path}`;
