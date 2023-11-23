import { INode, ICalendarProps, TTimes } from '@/types/calendar';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { useDateLocale } from '@/hooks/datetime';
import {
	toDate,
	mmToTime,
	toTime,
	timeToMinutes,
	addTime,
} from '@/utils/datetime';
import { addZiro } from '@/utils/str';
import { cellStyle, detectCollisions, groupRectangles } from '@/utils/view';
import { TRect } from '@/types/view';

/**
 * Calculate min, max and step for times
 * @param param0
 * @returns
 */
export function useTimesCalendar<T extends INode>({
	events,
	dates,
	timeStep,
}: Omit<ICalendarProps<T>['calendar'], 'Generator'> & {
	timeStep: number;
}): TTimes {
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

		min = min - (min % timeStep);
		max = max + (+Boolean(max % timeStep) * timeStep - (max % timeStep));
		return { min, max, step: timeStep };
	}, [events, dates, timeStep]);

	return times;
}

/**
 * Header is a list of dates
 * @param dates
 * @returns
 */
export function useHeaderCalendar<T extends INode>({
	dates,
}: Omit<ICalendarProps<T>['calendar'], 'events' | 'Generator'>) {
	const dateLocale = useDateLocale();
	const header = useMemo(
		() =>
			dates.map((str) => {
				const dateStr = toDate(str);
				const date = new Date(dateStr);
				return {
					date: dateStr,
					headline: format(date, 'EEEE', { locale: dateLocale }),
					subheadline: format(date, 'd MMM', { locale: dateLocale }),
				};
			}),
		[dates],
	);
	return header;
}

/**
 * Sidebar is a list of times
 * @param times
 * @returns
 */
export function useSidebarCalendar(times: TTimes) {
	const timesList = useMemo(() => {
		const list = [];
		for (let t = times.min; t <= times.max; t += times.step) {
			const { hh, mm } = mmToTime(t);
			list.push({
				time: t,
				title: addZiro(hh) + ':' + addZiro(mm),
			});
		}
		return list;
	}, [times]);

	return timesList;
}

/**
 * Body is a list of events
 * @param {events, dates, times}
 * @returns
 */
export function useBodyCalendar<T extends INode>({
	events,
	dates,
	times,
}: Omit<ICalendarProps<T>['calendar'], 'Generator'> & { times: TTimes }) {
	const body = useMemo(() => {
		
		const timesMap = new Map<
			string,
			Array<{ event: T; rect: TRect; index: number }>
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
						height: times.step - (event.duration % times.step),
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
						index,
						rect: cellStyle(
							{
								y: rect.y,
								height: rect.totalHeight,
								x: group?.indexOf(index) || 0,
								width: group?.length || 1,
							},
						),
					};
				}),
			);
		}
		return timesMap;
	}, [events, dates, times]);
	return body;
}