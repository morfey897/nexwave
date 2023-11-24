import { ICalendarProps, INode } from '@/types/calendar';
import { useMemo } from 'react';
import clsx from 'clsx';
import {
	useBodyCalendar,
	useSidebarCalendar,
	useTimesCalendar,
} from '@/hooks/calendar';

function Body<T extends INode>({
	calendar: { dates, events, Generator },
	cellHeight,
	timeStep,
	className,
}: ICalendarProps<T> & {
	cellHeight: number;
	timeStep: number;
} & React.HTMLAttributes<HTMLDivElement>) {
	const times = useTimesCalendar({ events, dates, timeStep });
	const timeList = useSidebarCalendar(times);
	const body = useBodyCalendar({ events, dates, times: times });

	const totalHeight = cellHeight * timeList.length;

	const timeMarkers = useMemo(
		() =>
			timeList.map(({ time, title }) => (
				<div
					key={time}
					className='text-xs lg:text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis'
					style={{ height: cellHeight }}
				>
					<span className='relative -top-[8px] lg:-top-[10px] px-1 bg-white dark:bg-gray-900'>
						{title}
					</span>
				</div>
			)),
		[timeList, cellHeight],
	);

	return (
		<div className={clsx(className)}>
			<div className='h-3' />
			<div className={clsx('flex relative w-fit min-w-full')}>
				<div>
					{timeList.map(({ time }, index) => (
						<hr
							key={time}
							className={clsx(
								'absolute left-0 right-0 z-0 border-t border-gray-200 dark:border-gray-700 ',
								time % 60 === 0 ? 'border-solid' : 'border-dashed',
							)}
							style={{ height: cellHeight, top: index * cellHeight }}
						/>
					))}
				</div>

				{dates.map((date, index) => (
					<div
						key={`date_${date}`}
						className={clsx('absolute', index > 0 && 'opacity-50')}
						style={{
							left: `${((100 * index) / dates.length).toFixed(2)}%`,
						}}
					>
						{timeMarkers}
					</div>
				))}

				{dates.map((date, index) => (
					<div
						style={{ height: totalHeight }}
						key={date}
						className={clsx(
							'relative -mt-2 mr-2 w-full text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis',
							index > 0 && 'border-l border-gray-200 dark:border-gray-700',
						)}
					>
						{body?.get(date)?.map(({ event, rect, index }) => (
							<div
								className='absolute w-full cursor-pointer hover:!z-[100] hover:!-left-[5%] hover:!w-[110%] transition-all duration-300'
								key={`item_${event._uid}`}
								style={{
									top: ((rect.y - times.min) * cellHeight) / times.step + 8,
									height: (rect.height * cellHeight) / times.step,
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
		</div>
	);
}

export default Body;
