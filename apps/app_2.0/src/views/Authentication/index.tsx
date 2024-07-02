import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTrail } from '@/headers';
import Auth from './Auth.client';
import { pick } from 'lodash';

function AuthServer() {
	const messages = useMessages();
	const hasTrail = !!getTrail();

	const mode = hasTrail ? 'signIn' : 'signUp';

	const partMessages = pick(messages, [
		'page.auth',
		'page.sign_in',
		'page.sign_up',
		'error',
		'form',
	]);

	return (
		<NextIntlClientProvider messages={partMessages}>
			<Auth mode={mode} />
		</NextIntlClientProvider>
	);
}

export default AuthServer;
