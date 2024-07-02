'use client';
import { ICalendarProps, INode } from '@/types/calendar';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import {
	useBodyCalendar,
	useSidebarCalendar,
	useTimesCalendar,
	useNow,
} from '@/hooks/calendar';
import {
	ssToTime,
	sec,
	timeToMinutes,
	timeToTime,
	toIsoDate,
} from '@/utils/datetime';

function Body<T extends INode>({
	dates,
	events,
	Generator,
	cellHeight,
	timeStep,
	timeApointment,
	className,
	onSelectDate,
}: ICalendarProps<T> & {
	cellHeight: number;
	timeStep: number;
	timeApointment: number;
	onSelectDate?: (props: {
		date: string;
		from_time: string;
		to_time: string;
	}) => void;
} & React.HTMLAttributes<HTMLDivElement>) {
	const now = useNow();
	const times = useTimesCalendar<T>({ events, dates, timeStep });
	const timeList = useSidebarCalendar({ times });
	const body = useBodyCalendar<T>({ events, dates, times: times });

	const totalHeight = Math.floor(cellHeight * timeList.length);
	const totalDays = dates.length;

	const timeMarkers = useMemo(
		() =>
			timeList.map(({ time, title }) => (
				<div
					key={time}
					className='text-gray-5 text-ellipsis text-center text-xs lg:text-sm rtl:text-right'
					style={{ height: cellHeight }}
				>
					<span className='relative -top-[8px] bg-white px-1 lg:-top-[10px] dark:bg-gray-900'>
						{title}
					</span>
				</div>
			)),
		[timeList, cellHeight]
	);

	const onClickDate = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (typeof onSelectDate != 'function') return;
			const target = event.target as HTMLDivElement;
			const dataset: DOMStringMap = target.dataset;
			const date = dataset.date || '';
			const rect = target.getBoundingClientRect();
			const time =
				((event.clientY - rect.y) / cellHeight) * times.step + times.min;
			const from = time - (time % (times.step / 2));
			const fromTime = ssToTime(from);
			const toTime = ssToTime((from + timeApointment) % sec('24h'));
			onSelectDate({
				date,
				from_time: timeToTime(fromTime),
				to_time: timeToTime(toTime),
			});
		},
		[onSelectDate, cellHeight, times, timeApointment]
	);

	return (
		<div className={clsx(className)}>
			<div className='h-3' />
			<div className={clsx('relative flex w-fit min-w-full')}>
				{timeList.map(({ time }, index) => (
					<hr
						key={time}
						className={clsx(
							'absolute left-0 right-0 z-0 border-t border-gray-200 dark:border-gray-700 ',
							time % 60 === 0 ? 'border-solid' : 'border-dashed'
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
						data-date={date}
						style={{ height: totalHeight }}
						key={date}
						className={clsx(
							'text-gray-5 relative -mt-2 w-full text-ellipsis text-center text-sm font-normal rtl:text-right',
							'cursor-copy',
							index > 0 && 'border-l border-gray-200 dark:border-gray-700'
						)}
						onClick={onClickDate}
					>
						<div
							id='marker-now'
							className={clsx(
								'absolute left-0 z-0 border-t border-solid border-red-400',
								'w-full',
								toIsoDate(now.date) === toIsoDate(date)
									? 'visible'
									: 'invisible'
							)}
							style={{
								top: Math.round(
									((timeToMinutes(now) - times.min) / timeStep) * cellHeight
								),
							}}
						>
							<span className='-mt-1 block h-2 w-2 rounded-full bg-red-400' />
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
									className='absolute w-full cursor-pointer transition-all duration-300 hover:!-left-[5%] hover:!z-[19] hover:!w-[110%]'
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
