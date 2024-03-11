import Container from '@/components/Containers';
import { EnumDeviceType } from '@/enums';

import {
	useMessages,
	NextIntlClientProvider,
	useTranslations,
} from 'next-intl';
import { pick } from 'lodash';

import Caption from './Caption.client';
import Header from './Header.client';
import Body from './Body.client';

function TimetableView({ device }: { device?: EnumDeviceType }) {
	const t = useTranslations();
	const messages = useMessages();
	const filterMessages = pick(messages, ['filter', 'day']);
	const bodyMessages = pick(messages, ['page.access_denied']);

	return (
		<Container className='mb-12'>
			<Caption
				headline={t('page.timetable.headline')}
				subheadline={t('page.timetable.subheadline')}
				add={t('button.add')}
				// activeTab={activeTab}
			/>
			<NextIntlClientProvider messages={filterMessages}>
				<Header device={device} />
			</NextIntlClientProvider>
			<NextIntlClientProvider messages={bodyMessages}>
				<Body device={device} />
			</NextIntlClientProvider>
		</Container>
	);
}

export default TimetableView;
