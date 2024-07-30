import { LOCALES } from '@nw/config';
import { enUS, ru, uk } from 'date-fns/locale';
import { addDays, format, differenceInDays } from 'date-fns';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Hook to get current date
 * @returns Date
 */
export const useNow = (days?: number) => {
	const now = new Date();
	return days ? addDays(now, days) : now;
};

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
 * Hook to format date
 * @returns
 */
export const useFormat = () => {
	const locale = useDateLocale();
	const formatDate = useCallback(
		(...params: Parameters<typeof format>) =>
			format(params[0], params[1], { locale, ...params[2] }),
		[locale]
	);
	return formatDate;
};

/**
 * Hook to get last visit
 * @param value
 * @returns
 */
export const useLastVisit = () => {
	const t = useTranslations();
	const formatDate = useFormat();

	const formatLastVisit = useCallback(
		(value: Date | string | number) => {
			const NOW = new Date(new Date().toISOString().split('T')[0]);
			const date = new Date(value);
			const isValid = !Number.isNaN(date.getTime());
			if (!isValid) return '';
			const days = differenceInDays(NOW, date);

			if (days <= 7) return t('day.days_ago_', { count: days });

			return formatDate(date, 'dd MMM yyyy');
		},
		[t, formatDate]
	);

	return formatLastVisit;
};
