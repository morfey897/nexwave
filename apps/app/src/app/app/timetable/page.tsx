'use client';
import { useFilter, useView } from '@/hooks/filter';
import { EnumSearchParams } from '@/types/filter';
import Filter from '@/components/Controls/Filter';
import { useTranslations } from 'next-intl';
import Headline from '@/components/Headline';
import { HiOutlineViewGrid, HiOutlineFilter } from 'react-icons/hi';
import { EnumView } from '@/types/calendar';
import { EnumFilter } from '@/types/event';
import { useEffect, useMemo, useState } from 'react';
import CalendarHead from '@/components/Calendar/Desktop/Head';
import CalendarBody from '@/components/Calendar/Desktop/Body';

import events from '../../../../__mock__/timetable.json';
import { toDate } from '@/utils/datetime';
import { EventGenerator } from '@/components/Generators/timetable';
import Container, {
	ContainerBody,
	ContainerHeader,
} from '@/components/Containers';
import clsx from 'clsx';
import { useScrollDetect } from '@/hooks/scrollDetect';

const CELL_HEIGHT = 120;
const TIME_STEP = 30;

export default function Home() {
	const { percent } = useScrollDetect();

	const [isScrolled, setScrolled] = useState(false);

	useEffect(() => {
		setScrolled(percent > 0.07);
	}, [percent]);

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
		<Container>
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
							'mt-4 flex pb-8 gap-2 items-center justify-between justify-items-center transition-all duration-300 ease-linear',
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
							message={t('timetable_page.view._', { view })}
							filters={views}
							onChange={onView}
							value={view}
						/>
					</div>
				</div>

				<CalendarHead
					className={clsx(
						'bg-gray-50 dark:bg-gray-800',
						'border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md md:rounded-t-lg',
					)}
					calendar={{
						dates: getDates,
						events: getEvents,
						Generator: EventGenerator,
					}}
				/>
			</ContainerHeader>
			<ContainerBody>
				<CalendarBody
					className={clsx(
						'bg-white dark:bg-gray-900',
						'border border-gray-200 dark:border-gray-700 border-b-0 rounded-b-md md:rounded-b-lg',
					)}
					calendar={{
						dates: getDates,
						events: getEvents,
						Generator: EventGenerator,
					}}
					cellHeight={CELL_HEIGHT}
					timeStep={TIME_STEP}
				/>
			</ContainerBody>
		</Container>
	);
}