'use client';
import clsx from 'clsx';
import { INode, ICalendarProps } from '@/types/calendar';
import { useNow } from '@/hooks/calendar';
import { toIsoDate } from '@/utils/datetime';
import { useDateLocale } from '@/hooks/datetime';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { TLocale } from '@/types';
import { capitalize } from 'lodash';

function Head<T extends INode>({
	locale,
	dates,
	className,
}: {
	locale: string | TLocale;
	dates: ICalendarProps<T>['dates'];
} & React.HTMLAttributes<HTMLDivElement>) {
	const now = useNow();
	const dateLocale = useDateLocale(locale);
	const header = useMemo(
		() =>
			dates.map((str) => {
				const dateStr = toIsoDate(str);
				const date = new Date(dateStr);
				return {
					isoDate: dateStr,
					title: capitalize(format(date, 'EEEE', { locale: dateLocale })),
					abr: capitalize(format(date, 'EEE', { locale: dateLocale })),
					formatedDate: format(date, 'd MMM', { locale: dateLocale }),
				};
			}),
		[dates, dateLocale]
	);

	return (
		<div className={clsx('flex w-fit min-w-full items-center', className)}>
			{header.map(({ isoDate, title, abr, formatedDate }, index) => (
				<div
					key={isoDate}
					className={clsx(
						'w-full text-ellipsis px-4 py-3.5 text-center text-xs font-normal lg:text-sm rtl:text-right',
						index > 0 && 'border-l border-gray-200 dark:border-gray-700',
						'text-gray-500 dark:text-gray-400',
						toIsoDate(isoDate) === toIsoDate(now.date) &&
							'!text-blue-500 dark:!text-blue-400'
					)}
				>
					{/* <span className='hidden lg:inline-block'>{title}</span> */}
					<span>{abr}</span>
					<span className='mt-2 block font-light'>{formatedDate}</span>
				</div>
			))}
		</div>
	);
}

export default Head;
