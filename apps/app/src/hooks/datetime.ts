import { enUS, ru, uk } from 'date-fns/locale';
import { useLocale } from 'next-intl';

const LOCALES: Record<string, Locale> = {
	uk: uk,
	ru: ru,
	en: enUS,
};

export const useDateLocale = () => {
	const locale = useLocale();
	return LOCALES[locale] || LOCALES[process.env.NEXT_PUBLIC_DEFAULT_LOCALE!];
};
