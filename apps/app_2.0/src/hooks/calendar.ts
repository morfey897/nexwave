import { INode, ICalendarProps, TTimes } from '@/types/calendar';
import { useMemo } from 'react';
import { format, addDays } from 'date-fns';
import { useDateLocale } from '@/hooks/datetime';
import {
	toIsoDate,
	ssToTime,
	toTime,
	timeToMinutes,
	sec,
	timeToTime,
} from '@/utils/datetime';
import { addZiro } from '@/utils';
import {
	cellStyle,
	detectCollisions,
	groupRectangles,
	TRect,
} from '@/utils/view';
import { EnumPeriod } from '@/enums';

/**
 * Calculate min, max and step for times
 * @param param0
 * @returns
 */
export function useTimesCalendar<T extends INode>({
	events,
	dates,
	timeStep,
}: {
	events: ICalendarProps<T>['events'];
	dates: ICalendarProps<T>['dates'];
} & {
	timeStep: number;
}): TTimes {
	const times = useMemo(() => {
		let min = 0;
		let max = sec(`24h`) - timeStep;
		min = min - (min % timeStep);
		max = max + (+Boolean(max % timeStep) * timeStep - (max % timeStep));
		return {
			min,
			max,
			step: timeStep,
		};
	}, [timeStep]);

	return times;
}

/**
 * Header is a list of dates
 * @param dates
 * @returns
 */
export function useHeaderCalendar<T extends INode>(
	dates: ICalendarProps<T>['dates']
) {
	const dateLocale = useDateLocale();
	const header = useMemo(
		() =>
			dates.map((str) => {
				const dateStr = toIsoDate(str);
				const date = new Date(dateStr);
				return {
					isoDate: dateStr,
					title: format(date, 'EEEE', { locale: dateLocale }),
					abr: format(date, 'EEE', { locale: dateLocale }),
					formatedDate: format(date, 'd MMM', { locale: dateLocale }),
				};
			}),
		[dates, dateLocale]
	);
	return header;
}

/**
 * Sidebar is a list of times
 * @param times
 * @returns
 */
export function useSidebarCalendar({ times }: { times: TTimes }) {
	const timesList = useMemo(() => {
		const list = [];
		for (let t = times.min; t <= times.max; t += times.step) {
			list.push({
				time: t,
				title: timeToTime(ssToTime(t)),
			});
		}
		return list;
	}, [times]);

	return timesList;
}

/**
 * Now is a current time
 * @param times
 * @returns
 */
export function useNow() {
	const timer = useMemo(() => {
		const now = new Date();
		return {
			date: toIsoDate(now),
			hh: now.getHours(),
			mm: now.getMinutes(),
			ss: now.getSeconds(),
		};
	}, []);

	return timer;
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
}: Omit<ICalendarProps<T>, 'Generator'> & { times: TTimes }) {
	const body = useMemo(() => {
		const timesMap = new Map<
			string,
			Array<{ event: T; rect: TRect; index: number }>
		>();
		if (!events || !dates) return timesMap;
		for (let dateIndex = 0; dateIndex < dates.length; dateIndex++) {
			const date = toIsoDate(dates[dateIndex]);
			const list = events.filter((event) => toIsoDate(event.date) === date);
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
				collisions
			);
			timesMap.set(
				date,
				rectanglesList.map(({ event, rect }, index) => {
					const group = groups.find((group) => group.includes(index));
					return {
						event,
						index,
						rect: cellStyle({
							y: rect.y,
							height: rect.totalHeight,
							x: group?.indexOf(index) || 0,
							width: group?.length || 1,
						}),
					};
				})
			);
		}
		return timesMap;
	}, [events, dates, times]);
	return body;
}

/**
 * Hook for dates
 * @param param0
 * @returns
 */
export function useDatesCalendar({
	period,
	day,
}: {
	period: string | EnumPeriod;
	day: string;
}) {
	const dates = useMemo(() => {
		if (period === EnumPeriod.WEEK) {
			return new Array(7)
				.fill(0)
				.map((_, index) => toIsoDate(addDays(new Date(day), index)));
		} else {
			return [day];
		}
	}, [period, day]);

	return dates;
}
