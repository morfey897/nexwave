import clsx from 'clsx';
import React from 'react';
import { EnumColor } from '@/enums';
import { RxDotFilled } from 'react-icons/rx';

function Marker({
	size = 24,
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
			className={clsx(
				'shrink-0',
				'text-black dark:text-white',
				{
					'text-pink-500 dark:text-pink-300': color === EnumColor.PINK,
					'text-green-500 dark:text-green-300': color === EnumColor.GREN,
					'text-yellow-500 dark:text-yellow-300': color === EnumColor.YELLOW,
					'text-indigo-500 dark:text-indigo-300': color === EnumColor.INDIGO,
					'text-blue-500 dark:text-blue-300': color === EnumColor.BLUR,
					'text-slate-500 dark:text-slate-300': color === EnumColor.GRAY,
					'text-red-500 dark:text-red-300': color === EnumColor.RED,
					'text-orange-500 dark:text-orange-300': color === EnumColor.ORANGE,
					'text-sky-500 dark:text-sky-300': color === EnumColor.SKYBLUE,
					'text-purple-500 dark:text-purple-300': color === EnumColor.PURPLE,
				},
				className,
			)}
			{...props}
		>
			<RxDotFilled size={size} />
		</span>
	);
}

export default Marker;
