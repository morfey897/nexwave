import { getRequestConfig } from 'next-intl/server';
import { getLocale } from './headers';

export default getRequestConfig(async () => {
	const locale = getLocale();

	let messages = null;
	try {
		messages = (await import(`../messages/${locale}.json`))?.default;
	} catch (error) {
		messages = (await import(`../messages/en.json`)).default;
	}

	return {
		locale,
		messages,
	};
});
