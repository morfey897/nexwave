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
					'absolute -end-6 -top-1 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full p-1 text-xs',
					'border-2 border-white dark:border-gray-900',
					'bg-blue-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400',
					typeof count === 'undefined' && 'hidden',
					className
				)}
				{...props}
			>
				{count}
			</span>
		</div>
	);
}
