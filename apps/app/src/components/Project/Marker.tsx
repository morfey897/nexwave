import clsx from 'clsx';
import React from 'react';
import { EnumColor } from '@packages/storage/dist';

function Marker({
	size = 'sm',
	color,
	className,
	...props
}: {
	size?: 'sm' | 'md' | 'lg';
	color?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={clsx(
				'rounded-full shrink-0 animate-pulse',
				{
					'bg-pink-500': color === EnumColor.PINK,
					'bg-green-500': color === EnumColor.GREN,
					'bg-yellow-500': color === EnumColor.YELLOW,
					'bg-indigo-500': color === EnumColor.INDIGO,
					'bg-blue-500': color === EnumColor.BLUR,
					'bg-slate-500': color === EnumColor.GRAY,
					'bg-red-500': color === EnumColor.RED,
					'bg-orange-500': color === EnumColor.ORANGE,
					'bg-sky-500': color === EnumColor.SKYBLUE,
					'bg-purple-500': color === EnumColor.PURPLE,
				},
				{
					'w-1.5 h-1.5': size === 'sm',
					'w-2.5 h-2.5': size === 'md',
					'w-3 h-3': size === 'lg',
				},
				className,
			)}
			{...props}
		/>
	);
}

export default Marker;
