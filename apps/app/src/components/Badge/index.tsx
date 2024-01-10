import clsx from 'clsx';
import React from 'react';

export function CountBadge({
	count,
	wrapperClassName,
	className,
	children,
	...props
}: {
	count: string | number | undefined;
	wrapperClassName?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<div className={clsx('relative', wrapperClassName)}>
			{children}
			<span
				className={clsx(
					'absolute inline-flex items-center justify-center h-6 min-w-[24px] text-xs p-1 rounded-full -top-1 -end-6',
					'border-2 border-white dark:border-gray-900',
					'text-blue-600 bg-blue-100 dark:bg-gray-800 dark:text-blue-400',
					typeof count === 'undefined' && 'hidden',
					className,
				)}
				{...props}
			>
				{count}
			</span>
		</div>
	);
}
