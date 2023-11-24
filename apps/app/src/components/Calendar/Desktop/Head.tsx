'use client';
import clsx from 'clsx';
import { INode, ICalendarProps } from '@/types/calendar';
import { useHeaderCalendar } from '@/hooks/calendar';

function Head<T extends INode>({ calendar, className }: ICalendarProps<T> & React.HTMLAttributes<HTMLDivElement>) {
	const header = useHeaderCalendar(calendar);

	return (
		<div className={clsx('flex w-fit min-w-full', className)}>
			{header.map(({ isoDate, title, abr, date }, index) => (
				<div
					key={isoDate}
					className={clsx(
						'w-full py-3.5 px-4 text-xs lg:text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis',
						index > 0 && 'border-l border-gray-200 dark:border-gray-700',
					)}
				>
					<span className='hidden lg:inline-block'>{title}</span>
					<span className='lg:hidden'>{abr}</span>
					<span className='block font-light mt-2'>{date}</span>
				</div>
			))}
		</div>
	);
}

//  

export default Head;
