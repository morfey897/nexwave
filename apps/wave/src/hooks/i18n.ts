import Cookies from 'js-cookie';
import { COOKIES, LOCALES } from '@nw/config';
import { TLocale } from '~/types';
import { useMemo } from 'react';

/**
 * Get the locale from the cookie or the default locale
 * @returns {TLocale} The locale
 */
export function useLocale(): TLocale {
	const cookieLocale = Cookies.get(COOKIES.LOCALE) as TLocale | undefined;
	const locale =
		cookieLocale && LOCALES.LIST.includes(cookieLocale)
			? cookieLocale
			: ((process.env.NEXT_PUBLIC_DEFAULT_LOCALE || LOCALES.EN) as TLocale);

	return locale;
}

/**
 * Get the translation function
 * @param {Record<TLocale, Record<string, string>>} messages The messages
 * @returns {(key: string) => string} The translation function
 */
export function useMessages(
	messages: Record<TLocale, Record<string, string>>
): (key: string) => string {
	const locale = useLocale();

	const t = useMemo(
		() => (key: string) => messages[locale][key] || key,
		[locale, messages]
	);

	return t;
}
