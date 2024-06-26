import { IEvent } from '@/models/event';
import { timeToTime, toIsoDate, toTime } from '@/utils/datetime';
import { addZiro } from '@/utils';
import clsx from 'clsx';

// export const code = `import { INode, ICalendarProps } from '@/types/calendar';

export function EventGenerator({ item }: { item: IEvent }) {
	// const fullName = [item.name, item.surname]
	// 	.filter((v) => Boolean(v))
	// 	.join(' ');

	// const abr = [item.name?.charAt(0), item.surname?.charAt(0)]
	// 	.filter((v) => Boolean(v))
	// 	.join('');

	const time = timeToTime(toTime(item.date));
	return (
		<div
			className={clsx(
				'h-full w-full px-1.5 py-1',
				'overflow-scroll hyphens-auto break-words text-xs',
				'rounded-lg outline outline-1',
				'shadow-none dark:shadow-md dark:shadow-green-200',
				'border bg-green-200 outline-white dark:bg-gray-900 dark:outline-green-300'
			)}
		>
			<p>{item.name}</p>
			{item.info && <p>{item.info}</p>}
			<p className='flex flex-col'>
				<span>{toIsoDate(item.date)}</span>
				<span>
					{time} {item.duration}m.
				</span>
			</p>
			{/* <button className='text-gray-300 dark:text-gray-700 p-1 -scale-x-[1]'>
				<MdMore size={24} />
			</button>
			{item.avatar ? (
				<Image
					width={40}
					height={40}
					className='object-cover w-10 h-10 rounded-full'
					src={item.avatar}
					alt={fullName}
				/>
			) : (
				<span className='w-10 h-10 rounded-full'>{abr}</span>
			)}
			<div>
				<h2 className='font-medium text-gray-800 dark:text-white break-words hyphens-auto'>
					{fullName}
				</h2>
				{item.phone && (
					<a
						href={`tel:${item.phone}`}
						className='text-sm font-normal text-gray-600 dark:text-gray-400 hover:underline'
					>
						{item.phone}
					</a>
				)}
			</div> */}
		</div>
	);
}
