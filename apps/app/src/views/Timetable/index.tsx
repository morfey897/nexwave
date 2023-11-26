'use client';
import { useFilter, useView } from '@/hooks/filter';
import { EnumSearchParams } from '@/types/filter';
import Filter from '@/components/Controls/Filter';
import { useTranslations } from 'next-intl';
import Headline from '@/components/Headline';
import { HiOutlineViewGrid, HiOutlineFilter } from 'react-icons/hi';
import { EnumView } from '@/types/calendar';
import { EnumFilter } from '@/types/event';
import { useMemo } from 'react';
import { WeekCalendarHead, WeekCalendarBody } from '@/components/Calendar/Week';

import { toDate } from '@/utils/datetime';
import { EventGenerator } from '@/components/Generators/timetable';
import Container, {
	ContainerBody,
	ContainerHeader,
	ContainerScrollableHeader,
	useSyncScroll,
} from '@/components/Containers';
import clsx from 'clsx';
import { useScrollDetect } from '@/hooks/scrollDetect';
import { IEvent } from '@/types/event';

function TimetableView({
	events,
	cellHeight,
	timeStep,
}: {
	events: IEvent[];
	cellHeight: number;
	timeStep: number;
}) {
	const t = useTranslations();

	const isScrolled = useScrollDetect(0.07);
	const { refHeader, refBody, onScroll } = useSyncScroll();

	const { onFilter, filter } = useFilter({
		name: EnumSearchParams.FILTER,
		defaultValue: EnumFilter.ALL,
	});

	const { onView, view } = useView({
		name: EnumSearchParams.VIEW,
		defaultValue: EnumView.WEEK,
	});

	const views = useMemo(() => {
		return Object.values(EnumView).map((uid) => ({
			uid: uid,
			title: t(`calendar_views.${uid}`),
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const filters = useMemo(() => {
		return Object.values(EnumFilter).map((uid) => ({
			uid: uid,
			title: t(`timetable_page.filter.${uid}`),
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getEvents = useMemo(() => {
		return events;
	}, [events]);

	const getDates = useMemo(() => {
		const dates = [...new Set(events.map((event) => toDate(event.date)))];
		if (view === EnumView.WEEK) {
			return dates.slice(0, 7);
		}
		return dates.slice(0, 1);
	}, [events, view]);

	return (
		<Container className='overflow-x-clip'>
			<ContainerHeader className='sticky'>
				<div className='bg-gray-100 dark:bg-gray-900 pt-2'>
					<Headline
						isScrolled={isScrolled}
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
					<div
						className={clsx(
							'mt-4 flex pb-8 gap-2 items-center justify-between justify-items-center transition-all duration-100 ease-linear',
							isScrolled && '!pb-0',
						)}
					>
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
							message={t('calendar_views._', { view })}
							filters={views}
							onChange={onView}
							value={view}
						/>
					</div>
				</div>

				<ContainerScrollableHeader ref={refHeader} onScroll={onScroll}>
					<WeekCalendarHead
						className={clsx(
							'bg-gray-50 dark:bg-gray-800',
							'border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md md:rounded-t-lg',
						)}
						dates={getDates}
					/>
				</ContainerScrollableHeader>
			</ContainerHeader>
			<ContainerBody ref={refBody} onScroll={onScroll}>
				<WeekCalendarBody
					className={clsx(
						'bg-white dark:bg-gray-900',
						'border border-gray-200 dark:border-gray-700 border-b-0 rounded-b-md md:rounded-b-lg',
					)}
					dates={getDates}
					events={getEvents}
					Generator={EventGenerator}
					cellHeight={cellHeight}
					timeStep={timeStep}
				/>
			</ContainerBody>
		</Container>
	);
}

export default TimetableView;
