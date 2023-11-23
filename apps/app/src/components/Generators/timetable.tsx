import { IEvent } from '@/types/event';
import { toDate, toTime } from '@/utils/date';
import { addZiro } from '@/utils/str';
import clsx from 'clsx';

// export const code = `import { INode, ICalendarProps } from '@/types/calendar';

export function EventGenerator({ item }: { item: IEvent }) {
	// const fullName = [item.name, item.surname]
	// 	.filter((v) => Boolean(v))
	// 	.join(' ');

	// const abr = [item.name?.charAt(0), item.surname?.charAt(0)]
	// 	.filter((v) => Boolean(v))
	// 	.join('');

	const { hh, mm } = toTime(item.date);
	const time = addZiro(hh) + ':' + addZiro(mm);
	return (
		<div
			className={clsx(
				'w-full h-full px-1.5 py-1',
				'text-xs overflow-scroll break-words hyphens-auto',
				'rounded-lg outline outline-1',
				'shadow-none dark:shadow-md dark:shadow-green-200',
				'dark:outline-green-300 bg-green-200 border outline-white dark:bg-gray-900',
			)}
		>
			<p>{item.title}</p>
			<p>{item.description}</p>
			<p className='flex flex-col'>
				<span>{toDate(item.date)}</span>
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
