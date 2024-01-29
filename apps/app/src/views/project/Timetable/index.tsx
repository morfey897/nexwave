'use client';
import { useFilter, useView, useDay } from '@/hooks/filter';
import Filter from '@/components/Controls/Filter';
import ChangeDate from '@/components/Controls/ChangeDate';
import { useTranslations } from 'next-intl';
import Caption from '@/components/Caption';
import { HiOutlineViewGrid, HiOutlineFilter } from 'react-icons/hi';
import { EnumState, EnumPeriod } from '@/enums';
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
import { EnumDeviceType } from '@/enums';
import { S_PARAMS } from '@nw/config';

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
	device?: EnumDeviceType;
}) {
	const t = useTranslations();

	const isScrolled = useScrollDetect(0.07);
	const { refHeader, refBody, onScroll } = useSyncScroll();

	const { onFilter, filter: state } = useFilter({
		name: S_PARAMS.FILTER,
		defaultValue: 'all',
	});

	const { onView, view: period } = useView({
		name: S_PARAMS.VIEW,
		defaultValue: device === EnumDeviceType.MOBILE ? EnumPeriod.DAY : EnumPeriod.WEEK,
	});

	const { onDay, day } = useDay({
		name: S_PARAMS.DAY,
		defaultValue: getFirstDay(),
	});

	const periods = useMemo(() => {
		return [
			{
				uid: EnumPeriod.WEEK,
				title: t(`filter.week`),
			},
			{
				uid: EnumPeriod.DAY,
				title: t(`filter.day`),
			},
		];
	}, [t]);

	const states = useMemo(() => {
		return [
			{
				uid: 'all',
				title: t(`filter.all`),
			},
			{
				uid: EnumState.ACTIVE,
				title: t(`filter.active`),
			},
			{
				uid: EnumState.INACTIVE,
				title: t(`filter.inactive`),
			}
		];
	}, [t]);

	const getEvents = useMemo(() => {
		return events;
	}, [events]);

	const getDates = useMemo(() => {
		if (period === EnumPeriod.WEEK) {
			return new Array(7)
				.fill(0)
				.map((_, index) => toIsoDate(addDays(new Date(day), index)));
		} else {
			return [day];
		}
	}, [period, day]);

	useEffect(() => {
		document.getElementById('marker-now')?.scrollIntoView({
			behavior: 'auto',
			block: 'center',
		});
	}, [day, period]);

	return (
		<Container className='overflow-x-clip'>
			<ContainerHeader className='sticky'>
				<div className='bg-gray-100 dark:bg-gray-900 pt-2'>
					<Caption
						isScrolled={isScrolled}
						headline={t('page.timetable.headline')}
						subheadline={t('page.timetable.subheadline')}
						amount={0}
						add={{
							title: t('button.add'),
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
							message={t('filter.of_state_', { state })}
							filters={states}
							onChange={onFilter}
							value={state}
						/>
						<ChangeDate
							onChange={(index: number) =>
								onDay(index * (period === EnumPeriod.WEEK ? 7 : 1))
							}
							dates={[getDates[0], getDates[getDates.length - 1]]}
							className='order-last md:order-2 md:w-auto w-full'
						/>
						<Filter
							as='auto:md'
							className='flex shrink-0 order-3'
							icon={<HiOutlineViewGrid size={16} />}
							message={t('filter.of_period_', { period })}
							filters={periods}
							onChange={onView}
							value={period}
						/>
					</div>
				</div>

				<ContainerScrollableHeader ref={refHeader} onScroll={onScroll}>
					<WeekCalendarHead
						className={clsx(
							'bg-gray-50 dark:bg-gray-800',
							'border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md md:rounded-t-lg',
							'w-full',
							period === EnumPeriod.WEEK && 'min-w-[600px]',
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
						period === EnumPeriod.WEEK && 'min-w-[600px]',
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
