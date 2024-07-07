import React, { useMemo } from 'react';
import clsx from 'clsx';
import { IClient } from '@nw/storage';

enum EnumLevel {
	SUCCESS = 'success',
	WARN = 'warn',
	INFO = 'info',
}

const getLevel = (title: string) => {
	if (title === 'problem' || title === 'inactive') return EnumLevel.WARN;
	if (title === 'vip' || title === 'loyal') return EnumLevel.SUCCESS;
	return EnumLevel.INFO;
};

function BadgesGenerator({ item }: { item: IClient }) {
	const badges = useMemo(() => (item.meta.badges || '').split(','), [item]);

	return (
		<div className='group relative flex w-fit flex-wrap justify-center'>
			{badges.map((title) => {
				const level = getLevel(title.toLowerCase());
				return (
					<span
						key={title}
						className={clsx(
							'capitalize',
							'border-secondary -ml-4 inline-block shrink-0 cursor-pointer rounded-full border-2 px-2.5 py-1 text-xs lg:first:ml-0 ',
							'transition-all hover:z-20 hover:scale-110 hover:!opacity-100 group-hover:opacity-50',
							'dark:bg-dark-3',
							{
								'text-green-2 bg-green-8 dark:text-green-1':
									level === EnumLevel.SUCCESS,
								'text-red-2 bg-red-8 dark:text-red-1': level === EnumLevel.WARN,
								'text-cyan-2 bg-cyan-5 dark:text-cyan-1':
									level === EnumLevel.INFO,
							}
						)}
					>
						{title}
					</span>
				);
			})}
		</div>
	);
}

export default BadgesGenerator;
