import React from 'react';
import { IEmployee } from '@nw/storage';
import CalendarIcon from '~/icons/CalendarIcon';

const ScheduleRenderer = ({ item }: { item: IEmployee }) => {
	const tickets = item?.meta?.tickets || 0;
	const maxTickets = item?.meta?.maxTickets || 0;

	return (
		<p className='flex gap-2'>
			<CalendarIcon width='20' height='20' />
			<span>
				{tickets}/{maxTickets}
			</span>
		</p>
	);
};

export default ScheduleRenderer;
