import clsx from 'clsx';
import { IButtonProps } from '@/types/view';

export function Button({
	variant = 'default',
	icon,
	message,
	iconAfter,
	className,
	children,
	...props
}: IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={clsx(
				'px-5 py-2 flex items-center justify-center rounded-lg tracking-wide text-sm shrink-0 sm:w-auto gap-x-2 transition-colors duration-200',
				{
					'text-white bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 disabled:dark:text-gray-700 disabled:text-gray-300 disabled:bg-blue-400 disabled:dark:bg-blue-700':
						variant === 'primary',
					'text-gray-700 bg-white border dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 disabled:dark:text-gray-700 disabled:text-gray-200':
						variant === 'default',
				},
				className,
			)}
			{...props}
		>
			{icon}
			{!!message && <span>{message}</span>}
			{iconAfter}
			{children}
		</button>
	);
}

export function GroupButton({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		// className=''
		<div
			className={clsx(
				'inline-flex overflow-hidden divide-x [&>*:first-child]:rounded-r-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:last-child]:rounded-l-none',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
