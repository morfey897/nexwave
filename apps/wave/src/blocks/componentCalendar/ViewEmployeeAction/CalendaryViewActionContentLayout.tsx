import React from 'react';
import { ViewActionContentLayoutProps } from '~/types';

const CalendaryViewActionContentLayout: React.FC<
	ViewActionContentLayoutProps
> = ({ name, picture, number, badge, iconBlock, iconHidden, iconPlus }) => (
	<div className='flex justify-between'>
		<div className='flex flex-row space-x-4'>
			{picture}
			<div className='flex flex-col'>
				<span>{name}</span>
				<span>{number}</span>
			</div>
		</div>
		<div>{badge}</div>
		<div className='flex flex-row space-x-4 px-2'>
			<span>{iconBlock}</span>
			<span>{iconHidden}</span>
			<span>{iconPlus}</span>
		</div>
	</div>
);

export default CalendaryViewActionContentLayout;
