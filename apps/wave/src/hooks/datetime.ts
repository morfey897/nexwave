import { LOCALES } from '@nw/config';
import { enUS, ru, uk } from 'date-fns/locale';
import { addDays } from 'date-fns';

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

/**
 * Hook to get current date
 * @returns Date
 */
export const useNow = (days?: number) => {
	const now = new Date();
	return days ? addDays(now, days) : now;
};
