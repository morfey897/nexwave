'use client';
import clsx from 'clsx';
import { INode, ICalendarProps } from '@/types/calendar';
import { useHeaderCalendar } from '@/hooks/calendar';
import { TSize } from '@/types/view';

function Head<T extends INode>({
	calendar,
	cell,
	className,
	...props
}: ICalendarProps<T> & {
	cell: TSize;
} & React.HTMLAttributes<HTMLTableSectionElement>) {
	const header = useHeaderCalendar(calendar);

	return (
		<div
			className={clsx('flex justify-between relative w-full', className)}
			{...props}
		>
			<div className='shrink-0' style={{ width: cell.width }} />
			{header.map(({ date, headline, subheadline }) => (
				<div
					key={date}
					className='w-full min-w-[170px] py-3.5 px-4 text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-center text-ellipsis'
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
