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
		<div className='flex items-center gap-x-2 cursor-pointer relative'>
			<button className='text-gray-4 p-1 bg-gray-200 dark:bg-gray-800 rounded-lg relative group'>
				<span className='hidden absolute group-hover:flex h-3 w-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
					<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 dark:bg-gray-600 opacity-75'></span>
					<span className='relative inline-flex rounded-full h-full w-full bg-gray-400/20 dark:bg-gray-600/20'></span>
				</span>
				<MdOutlineMoreVert size={24} />
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
			</div>
		</div>
	);
}
