import { ICalendarProps, INode } from '@/types/calendar';
import Head from './Head';
import Body from './Body';
import clsx from 'clsx';

function CalendarDesktop<T extends INode>({
	calendar,
	className,
	...props
}: ICalendarProps<T> & React.HTMLAttributes<HTMLTableElement>) {
	return (
		<div className={clsx('flex flex-col', className)} {...props}>
			<Head className='bg-gray-50 dark:bg-gray-800' calendar={calendar} />
			<Body
				className='bg-white dark:bg-gray-900 divide-x divide-gray-200 dark:divide-gray-700'
				calendar={calendar}
			/>
		</div>
	);
}

export default CalendarDesktop;
