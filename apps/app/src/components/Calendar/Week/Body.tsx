import { ICalendarProps, INode } from '@/types/calendar';
import { useMemo } from 'react';
import clsx from 'clsx';
import {
	useBodyCalendar,
	useSidebarCalendar,
	useTimesCalendar,
	useNow,
} from '@/hooks/calendar';
import { timeToMinutes, toIsoDate } from '@/utils/datetime';

function Body<T extends INode>({
	dates,
	events,
	Generator,
	cellHeight,
	timeStep,
	className,
}: ICalendarProps<T> & {
	cellHeight: number;
	timeStep: number;
} & React.HTMLAttributes<HTMLDivElement>) {
	const now = useNow();
	const times = useTimesCalendar({ events, dates, timeStep });
	const timeList = useSidebarCalendar({ times });
	const body = useBodyCalendar({ events, dates, times: times });

	const totalHeight = Math.floor(cellHeight * timeList.length);
	const totalDays = dates.length;

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
				{timeList.map(({ time }, index) => (
					<hr
						key={time}
						className={clsx(
							'absolute left-0 right-0 z-0 border-t border-gray-200 dark:border-gray-700 ',
							time % 60 === 0 ? 'border-solid' : 'border-dashed',
						)}
						style={{ top: index * cellHeight }}
					/>
				))}

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
							'relative -mt-2 w-full text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis',
							index > 0 && 'border-l border-gray-200 dark:border-gray-700',
						)}
					>
						<div
							id='marker-now'
							className={clsx(
								'absolute left-0 z-0 border-t border-red-400 border-solid',
								'w-full',
								toIsoDate(now.date) === toIsoDate(date)
									? 'visible'
									: 'invisible',
							)}
							style={{
								top: Math.round(
									((timeToMinutes(now) - times.min) / timeStep) * cellHeight,
								),
							}}
						>
							<span className='bg-red-400 rounded-full w-2 h-2 block -mt-1' />
						</div>
						{body?.get(date)?.map(({ event, rect, index }) => (
							<div
								key={`item_${event.uuid}`}
								className={clsx('relative mr-2', {
									'ml-12': totalDays === 1,
									'ml-8': totalDays >= 2 && totalDays <= 3,
									'ml-6': totalDays >= 4 && totalDays <= 5,
								})}
							>
								<div
									className='absolute w-full cursor-pointer hover:!z-[19] hover:!-left-[5%] hover:!w-[110%] transition-all duration-300'
									key={`item_${event.uuid}`}
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
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default Body;
