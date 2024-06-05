import clsx from 'clsx';
import React from 'react';
import { EnumColor } from '@/enums';

const colors = Object.values(EnumColor);

function Marker({
	size = 12,
	color,
	className,
	...props
}: {
	animate?: boolean;
	size?: number;
	color?: string | null;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>) {
	return (
		<span
			style={{ width: size, height: size }}
			className={clsx(
				'inline-block',
				'shrink-0',
				'rounded-full',
				{
					'bg-pink-500 dark:bg-pink-300': color === EnumColor.PINK,
					'bg-green-500 dark:bg-green-300': color === EnumColor.GREN,
					'bg-yellow-500 dark:bg-yellow-300': color === EnumColor.YELLOW,
					'bg-indigo-500 dark:bg-indigo-300': color === EnumColor.INDIGO,
					'bg-blue-500 dark:bg-blue-300': color === EnumColor.BLUR,
					'bg-slate-500 dark:bg-slate-300': color === EnumColor.GRAY,
					'bg-red-500 dark:bg-red-300': color === EnumColor.RED,
					'bg-orange-500 dark:bg-orange-300': color === EnumColor.ORANGE,
					'bg-sky-500 dark:bg-sky-300': color === EnumColor.SKYBLUE,
					'bg-purple-500 dark:bg-purple-300': color === EnumColor.PURPLE,
					'bg-black dark:bg-white': !colors.includes(color as EnumColor),
				},
				className,
			)}
			{...props}
		>
			{/* <RxDotFilled size={size} /> */}
		</span>
	);
}

export default Marker;
