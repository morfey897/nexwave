import { LOCALES } from '@packages/config';
import { enUS, ru, uk } from 'date-fns/locale';

/**
 * Hook to get date locale
 * @param locale
 * @returns
 */
export const useDateLocale = (locale?: string) => {
	switch (locale) {
		case LOCALES.UK:
			return uk;
		case LOCALES.RU:
			return ru;
		default:
			return enUS;
	}
};
