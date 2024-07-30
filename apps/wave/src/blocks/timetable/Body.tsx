'use client';

import React, { useMemo } from 'react';
import { IClient } from '@nw/storage';
import Table from '~/components/table';
// import factory from './factory';
// import headerData from './table-header';
import { useTranslations } from 'next-intl';
// import EditViewAction from './components/EditViewAction';
import Empty from '~/components/errors/Empty';
import useNWStore from '~/lib/store';
import WeekIcon from './__mock__/WeekIcon';
import DayIcon from './__mock__/DayIcon';
import CalendarIcon from './__mock__/CalendarIcon';
import MonthIcon from './__mock__/MonthIcon';
import EventIcon from './__mock__/EventIcon';
import { Flex } from '~/components/layout';
import Button from '~/components/controls/Button';
import { RoundedPlus } from '~/icons';
import EditCalendar from './components/PencilIconEdit';
import ViewCalendarAction from './components/ViewEmployeeAction';

function Body({ items }: { items?: IClient[] }) {
	const t = useTranslations();

	const timetable = useNWStore((state) => state.ui.timetable);
	const setEdit = useNWStore((state) => state.setEdit);

	// const header = useMemo(
	// 	() =>
	// 		headerData.map((item) => ({
	// 			...item,
	// 			title: t(`page.clients.${item.key}`),
	// 		})),
	// 	[t]
	// );

	return (
		<>
			<main>
				{/* <Table<IClient> header={header} content={items} factory={factory} /> */}
				{/* {!items?.length && (
					<Empty
						messages={{
							headline: t('page.clients.headline_empty'),
							subheadline: t('page.clients.subheadline_empty'),
						}}
					/>
				)} */}
				{timetable === 'week' && <WeekIcon />}
				{timetable === 'day' && (
					<Flex
						className='gap-x-4'
						onClick={() => {
							setEdit({ calendar: true });
						}}
					>
						{/* <Box> */}
						<DayIcon />
						{/* </Box> */}
						<div className='hidden xl:block'>
							<CalendarIcon />
						</div>
					</Flex>
				)}
				{timetable === 'month' && (
					<Flex className='gap-x-4'>
						{/* <Box> */}
						<MonthIcon />
						{/* </Box> */}
						<div className='hidden xl:block'>
							<EventIcon />
						</div>
					</Flex>
				)}

				<Button
					variant='primary'
					message={t('page.timetable.add_event')}
					className='fixed bottom-10 right-10'
					icon={<RoundedPlus />}
					onClick={() => setEdit({ event: true })}
				/>
			</main>
			{/* Actions */}
			<EditCalendar />
			<ViewCalendarAction />
		</>
	);
}

export default Body;
