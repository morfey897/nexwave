import { getRequestConfig } from 'next-intl/server';
import { IntlErrorCode } from 'next-intl';

import { getI18n } from '~/utils/headers';

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
		getMessageFallback({ namespace, key, error }) {
			const path = [namespace, key].filter((part) => part != null).join('.');

			if (error.code === IntlErrorCode.MISSING_MESSAGE) {
				return `${path} is not yet translated`;
			}
			return `Dear developer, please fix this message: ${path}`;
		},
	};
});
