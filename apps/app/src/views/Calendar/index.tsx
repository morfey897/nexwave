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
		<div className={clsx('flex flex-col my-4 lg:my-6', className)} {...props}>
			<div className='overflow-x-auto min-w-full align-middle'>
				<div className='overflow-scroll container border rounded-md border-gray-200 dark:border-gray-700 md:rounded-lg'>
					<CalendarDesktop className='min-w-full' calendar={calendar} />
				</div>
			</div>
		</div>
	);
}

export default Calendar;
