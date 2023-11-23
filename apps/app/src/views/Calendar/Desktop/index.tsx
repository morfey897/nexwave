import { ICalendarProps, INode } from '@/types/calendar';
import Head from './Head';
import Body from './Body';
import clsx from 'clsx';
import { TSize } from '@/types/view';

const TIME_CELL: TSize = {
	height: 120,
	width: 70,
};

const TIME_STEP = 30;

function CalendarDesktop<T extends INode>({
	calendar,
	className,
	...props
}: ICalendarProps<T> & React.HTMLAttributes<HTMLTableElement>) {
	return (
		<div className={clsx('w-fit min-w-full', className)} {...props}>
			<Head
				className='bg-gray-50 dark:bg-gray-800'
				calendar={calendar}
				cell={TIME_CELL}
			/>
			<Body
				className='bg-white dark:bg-gray-900'
				calendar={calendar}
				cell={TIME_CELL}
				timeStep={TIME_STEP}
			/>
		</div>
	);
}

export default CalendarDesktop;
