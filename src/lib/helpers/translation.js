import translation_de from '$lib/i18n/de.json';

export const SUPPORTED_LOCALES = ['de'];
export const PRERENDER_LOCALES = ['de'];
export const DEFAULT_LOCALE = 'de';

export function isValidLocale(locale) {
	return SUPPORTED_LOCALES.includes(locale);
}

export function getValidLocale(locale) {
	return isValidLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function getLocaleName(locale) {
	const localeNames = {
		de: 'Deutsch'
	};
	return localeNames[locale] || locale;
}

export const t = (locale) => {
	if (locale === 'de') return translation_de;
	return translation_de;
};
