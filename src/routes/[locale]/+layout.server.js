import { getDataFromCMS } from '$lib/helpers/getDataFromCMS';
import { getValidLocale } from '$lib/helpers/translation';

export async function load({ params, fetch }) {
	const locale = getValidLocale(params.locale);

	const data = {};

	const endpoints = ['alpra-page-landing', 'alpra-meta'];

	for (const endpoint of endpoints) {
		try {
			data[endpoint] = await getDataFromCMS(endpoint, locale, fetch);
			console.log(`[layout.server] ${endpoint}:`, JSON.stringify(data[endpoint], null, 2));
		} catch (err) {
			console.error(`[layout.server] Failed to fetch ${endpoint}:`, err);
			data[endpoint] = { data: null };
		}
	}

	data['locale'] = locale;
	console.log('[layout.server] returning locale:', locale);

	return data;
}
