import { env } from '$env/dynamic/public';

export const prerender = env.PUBLIC_PREVIEW_MODE !== 'true';
