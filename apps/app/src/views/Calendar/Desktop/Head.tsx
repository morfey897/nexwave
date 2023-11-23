'use client';
import clsx from 'clsx';
import { useDateLocale } from '@/hooks/datetime';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { INode, ICalendarProps } from '@/types/calendar';
import { toDate } from '@/utils/date';
import { TIME_CELL } from '../size';

function Head<T extends INode>({
	calendar,
	className,
	...props
}: ICalendarProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	const dateLocale = useDateLocale();
	const header = useMemo(
		() =>
			calendar.dates.map((str) => {
				const dateStr = toDate(str);
				const date = new Date(dateStr);
				return {
					date: dateStr,
					headline: format(date, 'EEEE', { locale: dateLocale }),
					subheadline: format(date, 'd MMM', { locale: dateLocale }),
				};
			}),
		[calendar],
	);

	return (
		<div className={clsx('flex justify-between relative ', className)} {...props}>
			<div className='shrink-0' style={{ width: TIME_CELL.width }} />
			{header.map(({ date, headline, subheadline }) => (
				<div
					key={date}
					className='w-full py-3.5 px-4 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis'
				>
					{headline}
					<span className='block font-light mt-2'>{subheadline}</span>
				</div>
			))}
			<div className='absolute left-0 right-0 bottom-0 h-3 bg-white dark:bg-slate-900'/>
		</div>
	);
}

export default Head;
