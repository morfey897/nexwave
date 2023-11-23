import { INode, ICalendarProps } from '@/types/calendar';
import clsx from 'clsx';
import CalendarDesktop from './Desktop';
import { TDeviceProps, EnumDevice } from '@/types/view';

function Calendar<T extends INode>({
	calendar,
	device,
	className,
	...props
}: ICalendarProps<T> & TDeviceProps & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx(className)} {...props}>
			<div className='overflow-y-hidden overflow-x-scroll border rounded-md border-gray-200 dark:border-gray-700 md:rounded-lg'>
				<CalendarDesktop calendar={calendar} />
			</div>
		</div>
	);
}

export default Calendar;
