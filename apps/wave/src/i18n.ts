import { getRequestConfig } from 'next-intl/server';
import { getI18n } from '~utils/headers';

export default getRequestConfig(async () => {
	const locale = getI18n();

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
