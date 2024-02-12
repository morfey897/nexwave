import { useMessages, NextIntlClientProvider } from 'next-intl';
import BreadcrumbsClient from './Breadcrumbs.client';
import { pick, assignIn } from 'lodash';
import { IProject } from '@/models/project';

function Breadcrumbs({ project }: { project: IProject }) {
	const messages = useMessages();
	const generalMessages = pick(messages, ['general']);
	const partMessages = assignIn(generalMessages, {
		general: {
			[project.uuid]: project.name,
			...(typeof generalMessages.general === 'object'
				? generalMessages.general
				: {}),
		},
	});
	return (
		<NextIntlClientProvider messages={partMessages}>
			<BreadcrumbsClient />
		</NextIntlClientProvider>
	);
}

export default Breadcrumbs;
