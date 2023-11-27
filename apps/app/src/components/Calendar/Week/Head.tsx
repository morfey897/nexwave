'use client';
import clsx from 'clsx';
import { INode, ICalendarProps } from '@/types/calendar';
import { useHeaderCalendar, useNow } from '@/hooks/calendar';
import { toIsoDate } from '@/utils/datetime';

function Head<T extends INode>({
	dates,
	className,
}: {
	dates: ICalendarProps<T>['dates'];
} & React.HTMLAttributes<HTMLDivElement>) {
	const now = useNow();
	const header = useHeaderCalendar(dates);

	return (
		<div className={clsx('flex w-fit min-w-full items-center', className)}>
			{header.map(({ isoDate, title, abr, formatedDate }, index) => (
				<div
					key={isoDate}
					className={clsx(
						'w-full py-3.5 px-4 text-xs lg:text-sm font-normal rtl:text-right text-center text-ellipsis',
						index > 0 && 'border-l border-gray-200 dark:border-gray-700',
						'text-gray-500 dark:text-gray-400',
						toIsoDate(isoDate) === toIsoDate(now.date) && '!text-blue-500 dark:!text-blue-400'
					)}
				>
					<span className='hidden lg:inline-block'>{title}</span>
					<span className='lg:hidden'>{abr}</span>
					<span className='block font-light mt-2'>{formatedDate}</span>
				</div>
			))}
		</div>
	);
}

export default Head;
