'use client';
import clsx from 'clsx';
import { INode, ICalendarProps } from '@/types/calendar';
import { useHeaderCalendar } from '@/hooks/calendar';

function Head<T extends INode>({
	calendar,
	className,
	...props
}: ICalendarProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	const header = useHeaderCalendar(calendar);

	return (
		<div className={clsx('flex relative', className)} {...props}>
			{header.map(({ date, headline, subheadline }) => (
				<div
					key={date}
					className='w-full py-3.5 px-4 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis'
				>
					{headline}
					<span className='block font-light mt-2'>{subheadline}</span>
				</div>
			))}
			<div className='absolute left-0 right-0 bottom-0 h-3 bg-white dark:bg-slate-900' />
		</div>
	);
}

export default Head;
