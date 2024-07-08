import React from 'react';
import { IClient } from '@nw/storage';
import TicketsIcon from '~/icons/TicketIcon';

const TicketsRenderer = ({ item }: { item: IClient }) => {
	const tickets = item?.meta?.tickets || 0;
	const maxTickets = item?.meta?.maxTickets || 0;

	return (
		<p className='flex gap-2'>
			<TicketsIcon width='20' height='20' />
			<span>
				{tickets}/{maxTickets}
			</span>
		</p>
	);
};

export default TicketsRenderer;
