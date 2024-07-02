'use client';

import Image from 'next/image';
import { IClient } from '@/types/client';
import { MdOutlineMoreVert } from 'react-icons/md';

export function AvatarGenerator({ item }: { item: IClient }) {
	const fullName = [item.name, item.surname]
		.filter((v) => Boolean(v))
		.join(' ');

	const abr = [item.name?.charAt(0), item.surname?.charAt(0)]
		.filter((v) => Boolean(v))
		.join('');
	return (
		<div className='relative flex cursor-pointer items-center gap-x-2'>
			<button className='text-gray-4 group relative rounded-lg bg-gray-200 p-1 dark:bg-gray-800'>
				<span className='absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 group-hover:flex'>
					<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75 dark:bg-gray-600'></span>
					<span className='relative inline-flex h-full w-full rounded-full bg-gray-400/20 dark:bg-gray-600/20'></span>
				</span>
				<MdOutlineMoreVert size={24} />
			</button>
			{item.avatar ? (
				<Image
					width={40}
					height={40}
					className='h-10 w-10 rounded-full object-cover'
					src={item.avatar}
					alt={fullName}
				/>
			) : (
				<span className='h-10 w-10 rounded-full'>{abr}</span>
			)}
			<div>
				<h2 className='hyphens-auto break-words font-medium text-gray-800 dark:text-white'>
					{fullName}
				</h2>
				{item.phone && (
					<a
						href={`tel:${item.phone}`}
						className='text-sm font-normal text-gray-600 hover:underline dark:text-gray-400'
					>
						{item.phone}
					</a>
				)}
			</div>
		</div>
	);
}
