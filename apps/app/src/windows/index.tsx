import { useMessages, NextIntlClientProvider } from 'next-intl';
import Provider from './Provider.client';
import { pick } from 'lodash';

function Modals() {
	const messages = useMessages();
	const partMessages = pick(messages, [
		'error',
		'form',
		'button',
		'currency',
		'color',
		'page.panel_projects',
		'page.add_project',
		'page.add_branch',
	]);
	return (
		<NextIntlClientProvider messages={partMessages}>
			<Provider />
		</NextIntlClientProvider>
	);
}

export default Modals;
