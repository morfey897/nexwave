'use client';

import PersonPic from '~/components/picture/PersonPic';
import { useTranslations } from 'next-intl';
import Input from '~/components/form/Input';
import useNWStore from '~/lib/store';
import { EnumMode } from '~/constants/enums';
import { fullname } from '~/utils';
import { useFormat } from '~/hooks/datetime';
import SubmitForm from './SubmitForm';

const ViewMode = () => {
	const t = useTranslations();
	const client = useNWStore((state) => state.clients.active);
	const format = useFormat();

	return (
		<div className='grid grid-cols-2 gap-4'>
			{/* Avatar */}
			<PersonPic size={120} photo={client?.avatar} className='col-span-2' />
			{/* Name */}
			<p>{t('form.name')}</p>
			<p>{fullname(client)}</p>
			{/* Phone */}
			<p>{t('form.phone')}</p>
			{client?.contacts?.phone ? (
				<a
					href={`tel:${client?.contacts?.phone}`}
					className='text-sm hover:underline'
				>
					{client?.contacts?.phone}
				</a>
			) : (
				<p className='w-1/2'>-</p>
			)}
			{/* Email */}
			<p>{t('form.email')}</p>
			{client?.contacts?.email ? (
				<a
					href={`mailto:${client?.contacts?.email}`}
					className='text-sm hover:underline'
				>
					{client?.contacts?.email}
				</a>
			) : (
				<p className='w-1/2'>-</p>
			)}
			{/* Birthday */}
			<p>{t('form.birthday')}</p>
			<p>{client?.birthday ? format(client.birthday, 'dd MMM yyyy') : '-'}</p>
		</div>
	);
};

const EditMode = () => {
	const t = useTranslations();
	const client = useNWStore((state) => state.clients.active);

	return (
		<SubmitForm>
			<div className='grid grid-cols-1 gap-4'>
				<PersonPic size={120} photo={client?.avatar} />
				<Input
					name='name'
					defaultValue={client?.name || ''}
					label={t('form.first_name')}
					variant='over'
				/>
				<Input
					name='surname'
					defaultValue={client?.surname || ''}
					label={t('form.last_name')}
					variant='over'
				/>
				<Input
					name='phone'
					defaultValue={client?.contacts?.phone || ''}
					label={t('form.phone')}
					variant='over'
				/>
				<Input
					name='email'
					defaultValue={client?.contacts?.email || ''}
					label={t('form.email')}
					variant='over'
				/>
			</div>
		</SubmitForm>
	);
};

function GeneralTabs({ mode }: { mode: EnumMode }) {
	return mode === EnumMode.VIEW ? <ViewMode /> : <EditMode />;
}

export default GeneralTabs;
