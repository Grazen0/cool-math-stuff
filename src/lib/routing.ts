import { PUBLIC_BASE_URL } from '$env/static/public';

export const withBaseUrl = (url: string) => `${PUBLIC_BASE_URL}/${url.replace(/^\//, '')}`;
