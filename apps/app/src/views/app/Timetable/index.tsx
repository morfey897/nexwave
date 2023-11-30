'use client';
import { useFilter, useView, useDay } from '@/hooks/filter';
import { EnumSearchParams } from '@/types/filter';
import Filter from '@/components/Controls/Filter';
import ChangeDate from '@/components/Controls/ChangeDate';
import { useTranslations } from 'next-intl';
import Headline from '@/components/Headline';
import { HiOutlineViewGrid, HiOutlineFilter } from 'react-icons/hi';
import { EnumView } from '@/types/calendar';
import { EnumFilter } from '@/types/event';
import { useEffect, useMemo } from 'react';
import { WeekCalendarHead, WeekCalendarBody } from '@/components/Calendar/Week';
import { previousMonday, addDays } from 'date-fns';
import { toIsoDate } from '@/utils/datetime';
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
import { EnumDevice } from '@/types/view';

const getFirstDay = () => {
	const now = new Date();
	if (now.getDay() === 1) {
		return toIsoDate(now);
	}
	return toIsoDate(previousMonday(now));
};

function TimetableView({
	events,
	cellHeight,
	timeStep,
	device,
}: {
	events: IEvent[];
	cellHeight: number;
	timeStep: number;
	device?: EnumDevice;
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
		defaultValue: device === EnumDevice.MOBILE ? EnumView.DAY : EnumView.WEEK,
	});

	const { onDay, day } = useDay({
		name: EnumSearchParams.DAY,
		defaultValue: getFirstDay(),
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
		if (view === EnumView.WEEK) {
			return new Array(7)
				.fill(0)
				.map((_, index) => toIsoDate(addDays(new Date(day), index)));
		} else {
			return [day];
		}
	}, [view, day]);

	useEffect(() => {
		document.getElementById('marker-now')?.scrollIntoView({
			behavior: 'auto',
			block: 'center',
		});
	}, [day, view]);

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
							'flex-wrap',
							isScrolled && '!pb-0',
						)}
					>
						<Filter
							as='dropdown'
							className='flex shrink-0 order-1'
							icon={<HiOutlineFilter size={16} />}
							message={t('timetable_page.filter._', { filter })}
							filters={filters}
							onChange={onFilter}
							value={filter}
						/>
						<ChangeDate
							onChange={(index: number) =>
								onDay(index * (view === EnumView.WEEK ? 7 : 1))
							}
							dates={[getDates[0], getDates[getDates.length - 1]]}
							className='order-last md:order-2 md:w-auto w-full'
						/>
						<Filter
							as='auto:md'
							className='flex shrink-0 order-3'
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
							'w-full',
							view === EnumView.WEEK && 'min-w-[600px]',
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
						'w-full',
						view === EnumView.WEEK && 'min-w-[600px]',
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
