import { PUBLIC_STRAPI_URL } from '$env/static/public';
import { building } from '$app/environment';
import { env } from '$env/dynamic/public';

const cache = new Map();

const shouldUseCache = () => building && env.PUBLIC_PREVIEW_MODE !== 'true';

const fetchData = async (url, fetchFn = fetch) => {
	if (shouldUseCache() && cache.has(url)) {
		return cache.get(url);
	}

	const response = await fetchFn(url);
	const data = await response.json();

	if (shouldUseCache()) {
		cache.set(url, data);
	}

	return data;
};

export async function getDataFromCMS(path, locale, fetchFn = fetch) {
	const shouldFetchAllPages = ['alpra-personnels'];

	if (shouldFetchAllPages.includes(path)) {
		return await fetchAllPages(path, locale, fetchFn);
	}

	const queryUrl = `${PUBLIC_STRAPI_URL}/api/${path}?pLevel&locale=${locale}`;
	return await fetchData(queryUrl, fetchFn);
}

async function fetchAllPages(path, locale, fetchFn = fetch) {
	let allData = [];
	let currentPage = 1;
	let totalPages = 1;

	do {
		const queryUrl = `${PUBLIC_STRAPI_URL}/api/${path}?pLevel&locale=${locale}&pagination[page]=${currentPage}&pagination[pageSize]=100&sort=last_name:asc`;
		const result = await fetchData(queryUrl, fetchFn);

		if (result?.data) {
			allData = allData.concat(result.data);

			if (result.meta?.pagination) {
				totalPages = result.meta.pagination.pageCount;
			}
		}

		currentPage++;
	} while (currentPage <= totalPages);

	return {
		data: allData,
		meta: {
			pagination: {
				page: 1,
				pageSize: allData.length,
				pageCount: 1,
				total: allData.length
			}
		}
	};
}
