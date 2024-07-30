import React from 'react';
import clsx from 'clsx';
import { EnumLevel } from '~/constants/enums';

export type BadgeProps = {
	label: string;
	value: string;
	level: EnumLevel;
};

const Badge = ({
	label,
	value,
	level,
	hoverEffect = true,
	className,
}: BadgeProps & { hoverEffect?: boolean; className?: string }) => (
	<span
		data-value={value}
		className={clsx(
			'capitalize',
			'border-secondary -ml-4 inline-block shrink-0 cursor-pointer rounded-full border-2 px-2.5 py-1 text-xs lg:first:ml-0 ',
			!!hoverEffect &&
				'transition-all hover:z-20 hover:scale-110 hover:!opacity-100 group-hover:opacity-50',
			'dark:bg-dark-3',
			{
				'text-green-2 bg-green-8 dark:text-green-1':
					level === EnumLevel.SUCCESS,
				'text-yellow-2 bg-yellow-7 dark:text-yellow-1':
					level === EnumLevel.WARN,
				'text-cyan-2 bg-cyan-5 dark:text-cyan-1': level === EnumLevel.INFO,
				'text-red-2 bg-red-8 dark:text-red-1': level === EnumLevel.CRIT,
			},
			className
		)}
	>
		{label}
	</span>
);

export default Badge;
