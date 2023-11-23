import { ICalendarProps, INode } from '@/types/calendar';
import { CSSProperties, Fragment, useMemo } from 'react';
import { addTime, mmToTime, timeToMinutes, toDate, toTime } from '@/utils/date';
import clsx from 'clsx';
import { TIME_CELL, TIME_STEP } from '../size';
import { addZiro } from '@/utils/str';
import { detectCollisions, groupRectangles } from '@/utils/view';

const DELTA = 8;
function cellStyle(
	index: number,
	rect: { x: number; y: number; width: number; height: number },
) {
	let width = 100;
	let left = 0;
	if (rect.width > 1) {
		const len = Math.floor(120 / rect.width);
		const spacing = (width - rect.width * len) / (rect.width - 1);
		left = rect.x * (len + spacing);
		width = len;
	}

	return {
		top: (rect.y * TIME_CELL.height) / TIME_STEP + DELTA,
		height: (rect.height * TIME_CELL.height) / TIME_STEP,
		zIndex: index + 1,
		left: left + '%',
		width: width + '%',
	};
}

function Body<T extends INode>({
	calendar: { events, dates, Generator },
	className,
	...props
}: ICalendarProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	const times = useMemo(() => {
		let min = 24 * 60 - 1;
		let max = 0;

		for (let j = 0; j < events.length; j++) {
			const event = events[j];
			const eventDate = toDate(event.date);
			for (let i = 0; i < dates.length; i++) {
				const date = toDate(dates[i]);
				if (eventDate === date) {
					const minTime = toTime(event.date);
					const maxTime = addTime(event.date, mmToTime(event.duration));
					const minMminutes = timeToMinutes(minTime);
					const maxMminutes = timeToMinutes(maxTime);
					min = Math.min(min, minMminutes, maxMminutes);
					max = Math.max(max, minMminutes, maxMminutes);
				}
			}
		}

		min = min - (min % TIME_STEP);
		max = max + (+Boolean(max % TIME_STEP) * TIME_STEP - (max % TIME_STEP));
		return { min, max };
	}, [events, dates]);

	const body = useMemo(() => {
		const timesMap = new Map<
			string,
			Array<{ event: T; style: CSSProperties }>
		>();
		if (!events || !dates) return timesMap;
		for (let dateIndex = 0; dateIndex < dates.length; dateIndex++) {
			const date = toDate(dates[dateIndex]);
			const list = events.filter((event) => toDate(event.date) === date);
			const rectanglesList = list
				.map((event) => ({
					event,
					rect: {
						x: dateIndex * 100,
						width: 100,
						y: timeToMinutes(toTime(event.date)),
						totalHeight: event.duration,
						height: TIME_STEP - (event.duration % TIME_STEP),
					},
				}))
				.sort((a, b) => a.rect.y - b.rect.y);

			const rectangles = rectanglesList.map(({ rect }) => rect);
			const collisions = detectCollisions(rectangles);
			const groups = groupRectangles(
				rectangles.map((_, index) => index),
				collisions,
			);
			timesMap.set(
				date,
				rectanglesList.map(({ event, rect }, index) => {
					const group = groups.find((group) => group.includes(index));
					return {
						event,
						style: cellStyle(index, {
							y: rect.y - times.min,
							height: rect.totalHeight,
							x: group?.indexOf(index) || 0,
							width: group?.length || 1,
						}),
					};
				}),
			);
		}
		return timesMap;
	}, [events, dates, times]);

	const timesList = useMemo(() => {
		const list = [];
		for (let t = times.min; t <= times.max; t += TIME_STEP) {
			const { hh, mm } = mmToTime(t);
			list.push({
				time: t,
				title: addZiro(hh) + ':' + addZiro(mm),
			});
		}
		return list;
	}, [times]);

	return (
		<div
			className={clsx('flex justify-between relative', className)}
			{...props}
		>
			<div className='shrink-0 divide-gray-200 dark:divide-gray-700'>
				{timesList.map(({ time, title }) => (
					<Fragment key={time}>
						<div
							className={clsx(
								'absolute left-0 right-0 z-0 border-t border-gray-200 dark:border-gray-700 ',
								time % 60 === 0 ? 'border-solid' : 'border-dashed',
							)}
						/>
						<div
							className='relative text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis'
							style={{ height: TIME_CELL.height, width: TIME_CELL.width }}
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
					{body?.get(date)?.map(({ event, style }) => (
						<div
							className='absolute w-full cursor-pointer hover:!z-[100] hover:!-left-[5%] hover:!w-[110%] transition-all duration-300'
							key={`item_${event._uid}`}
							style={style}
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
