import { base } from '$app/paths';

export const withBaseUrl = (url: string) => `${base}/${url.replace(/^\//, '')}`;
