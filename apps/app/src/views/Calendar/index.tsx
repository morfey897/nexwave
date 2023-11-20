import { IEvent, ICalendarProps } from '@/types/calendar';
import clsx from 'clsx';
import CalendarDesktop from './Desktop';

function Calendar<T extends IEvent>({
	events,
	className,
	...props
}: ICalendarProps<T> & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx('flex flex-col my-4 lg:my-6', className)} {...props}>
			<div className='overflow-x-auto min-w-full align-middle'>
				<div className='overflow-hidden border rounded-md border-gray-200 dark:border-gray-700 md:rounded-lg'>
					<CalendarDesktop
						className='min-w-full hidden lg:table'
						events={events}
					/>
					{/* <TableMobile
						className='min-w-full lg:hidden'
						head={head}
						body={body}
					/> */}
				</div>
			</div>
		</div>
	);
}

export default Calendar;
