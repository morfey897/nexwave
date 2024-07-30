'use client';

import {
	BADGES_CLIENTS,
	EnumClientBadge,
	EnumLevel,
	EnumMode,
} from '~/constants/enums';
import { useTranslations } from 'next-intl';
import useNWStore from '~/lib/store';
import Input from '~/components/form/Input';
import Select from '~/components/form/SelectBadges';
import SubmitForm from './SubmitForm';
import Badges from '~/components/badges';
import { useLastVisit } from '~/hooks/datetime';

const getLevel = (title: string): EnumLevel => {
	if (title === EnumClientBadge.PROBLEM || title === EnumClientBadge.INACTIVE)
		return EnumLevel.CRIT;
	if (title === EnumClientBadge.LOYAL) return EnumLevel.SUCCESS;
	if (title === EnumClientBadge.VIP) return EnumLevel.WARN;
	return EnumLevel.INFO;
};

const getBadges = (badges: string | undefined) =>
	(badges || '')
		.split(',')
		.filter((badge) => !!badge)
		.map((label) => ({
			label,
			value: label,
			level: getLevel(label.toLowerCase()),
		}));

const ViewMode = () => {
	const t = useTranslations();
	const client = useNWStore((state) => state.clients.active);
	const lastvisit = useLastVisit();

	return (
		<div className='grid grid-cols-2 gap-4'>
			{/* Budges */}
			<p>{t('page.clients.badges')}</p>
			<Badges list={getBadges(client?.meta.badges)} />
			{/* Last visit */}
			<p>{t('form.last_visit')}</p>
			<p>{client?.lastVisitAt ? lastvisit(client.lastVisitAt) : '-'}</p>
		</div>
	);
};

const EditMode = () => {
	const t = useTranslations();
	const client = useNWStore((state) => state.clients.active);

	const badgeOptions = BADGES_CLIENTS.map((badge) => ({
		label: badge,
		value: badge,
		level: getLevel(badge),
	}));

	const badgeValues = getBadges(client?.meta.badges);
	return (
		<SubmitForm>
			<div className='grid grid-cols-1 gap-4'>
				<Select
					name='badges'
					variant='over'
					label={t('page.clients.badges')}
					options={badgeOptions}
					defaultValue={badgeValues}
				/>
				<Input
					variant='over'
					label={t('form.last_visit')}
					name='lastVisitAt'
					type='date'
					defaultValue={
						client?.lastVisitAt
							? client.lastVisitAt.toISOString().split('T')[0]
							: ''
					}
				/>
			</div>
		</SubmitForm>
	);
};

function VisitsTabs({ mode }: { mode: EnumMode }) {
	return mode === EnumMode.VIEW ? <ViewMode /> : <EditMode />;
}

export default VisitsTabs;
