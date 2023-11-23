import { ICalendarProps, INode } from '@/types/calendar';
import { Fragment } from 'react';
import clsx from 'clsx';
import { TSize } from '@/types/view';
import {
	useBodyCalendar,
	useSidebarCalendar,
	useTimesCalendar,
} from '@/hooks/calendar';

function Body<T extends INode>({
	calendar: { dates, events, Generator },
	cell,
	timeStep,
	className,
	...props
}: ICalendarProps<T> & {
	cell: TSize;
	timeStep: number;
} & React.HTMLAttributes<HTMLTableSectionElement>) {
	const times = useTimesCalendar({ events, dates, timeStep });
	const timeList = useSidebarCalendar(times);
	const body = useBodyCalendar({ events, dates, times: times });

	return (
		<div
			className={clsx('flex justify-between relative', className)}
			{...props}
		>
			<div className='shrink-0 divide-gray-200 dark:divide-gray-700'>
				{timeList.map(({ time, title }) => (
					<Fragment key={time}>
						<div
							className={clsx(
								'absolute left-0 right-0 z-0 border-t border-gray-200 dark:border-gray-700 ',
								time % 60 === 0 ? 'border-solid' : 'border-dashed',
							)}
						/>
						<div
							className='relative text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis'
							style={{ height: cell.height, width: cell.width }}
						>
							<span className='relative -top-[10px] px-1 bg-white  dark:bg-gray-900'>
								{title}
							</span>
						</div>
					</Fragment>
				))}
			</div>
			{dates.map((date) => (
				<div
					key={date}
					className='relative -mt-2 mr-2 w-full text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis'
				>
					{body?.get(date)?.map(({ event, rect, index }) => (
						<div
							className='absolute w-full cursor-pointer hover:!z-[100] hover:!-left-[5%] hover:!w-[110%] transition-all duration-300'
							key={`item_${event._uid}`}
							style={{
								top: ((rect.y - times.min) * cell.height) / times.step + 8,
								height: (rect.height * cell.height) / times.step,
								zIndex: index + 1,
								left: rect.x + '%',
								width: rect.width + '%',
							}}
						>
							<Generator item={event} />
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default Body;
