'use client';
import PageContainer from '@/components/Containers';
import { useFilter, useView } from '@/hooks/filter';
import { EnumSearchParams } from '@/types/filter';
import Search from '@/components/Controls/Search';
import Filter from '@/components/Controls/Filter';
import { useTranslations } from 'next-intl';
import Headline from '@/components/Headline';
import { HiOutlineViewGrid, HiOutlineFilter } from 'react-icons/hi';
import { EnumView } from '@/types/calendar';
import { EnumFilter, IEvent } from '@/types/event';
import { use, useMemo } from 'react';
import Calendar from '@/components/Calendar';
import { useDevice } from '@/hooks/device';

import events from '../../../../__mock__/timetable.json';
import { toDate } from '@/utils/datetime';
import { EventGenerator } from '@/components/Generators/timetable';

export default function Home() {
	const device = useDevice();
	const { onFilter, filter } = useFilter({
		name: EnumSearchParams.FILTER,
		defaultValue: EnumFilter.ALL,
	});

	const { onView, view } = useView({
		name: EnumSearchParams.VIEW,
		defaultValue: EnumView.WEEK,
	});

	const t = useTranslations();

	const views = useMemo(() => {
		return Object.values(EnumView).map((uid) => ({
			uid: uid,
			title: t(`timetable_page.view.${uid}`),
		}));
	}, []);

	const filters = useMemo(() => {
		return Object.values(EnumFilter).map((uid) => ({
			uid: uid,
			title: t(`timetable_page.filter.${uid}`),
		}));
	}, []);

	const getEvents = useMemo(() => {
		return events;
	}, []);
	const getDates = useMemo(() => {
		return [...new Set(events.map((event) => toDate(event.date)))].slice(0, 7);
	}, []);

	return (
		// <div className='flex flex-col items-center justify-between my-4 lg:my-8'>
		<section className='container mx-auto my-4 lg:my-8'>
			<PageContainer>
				<Headline
					headline={t('timetable_page.headline')}
					subheadline={t('timetable_page.subheadline')}
					amount={0}
					add={{
						title: t('common.add'),
						onClick: () => {
							console.log('onAdd');
						},
					}}
				/>
				<div className='mt-4 flex gap-2 items-center justify-between justify-items-center'>
					<Filter
						as='dropdown'
						className='flex shrink-0'
						icon={<HiOutlineFilter size={16} />}
						message={t('timetable_page.filter._', { filter })}
						filters={filters}
						onChange={onFilter}
						value={filter}
					/>
					<Filter
						as='auto:md'
						className='flex shrink-0'
						icon={<HiOutlineViewGrid size={16} />}
						message={t('timetable_page.view._', { view })}
						filters={views}
						onChange={onView}
						value={view}
					/>
				</div>
			</PageContainer>
			<Calendar<IEvent>
				device={device}
				calendar={{
					dates: getDates,
					events: getEvents,
					Generator: EventGenerator,
				}}
				className='my-4 lg:my-6'
			/>
		</section>
	);
}
