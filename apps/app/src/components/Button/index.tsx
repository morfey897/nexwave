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
				'px-5 py-2 flex items-center justify-center rounded-lg tracking-wide text-sm shrink-0 gap-x-2 transition-colors duration-200',
				{
					'text-white bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 disabled:dark:text-gray-700 disabled:text-gray-300 disabled:bg-blue-400 disabled:dark:bg-blue-700':
						variant === 'primary',
					'text-gray-700 bg-white border !border-l !border-r dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 disabled:dark:text-gray-700 disabled:text-gray-200':
						variant === 'default',
					'text-white bg-green-700 hover:bg-green-800 dark:hover:bg-green-700 dark:bg-green-800 disabled:dark:text-gray-700 disabled:text-gray-300 disabled:bg-green-400 disabled:dark:bg-green-700':
						variant === 'secondary',
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
	const len = Array.isArray(children)
		? children.filter((el) => Boolean(el)).length
		: 1;

	return (
		<div
			className={clsx(
				'inline-flex overflow-hidden divide-x',
				len > 1 &&
					'[&>*:first-child]:rounded-r-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:last-child]:rounded-l-none',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export default Button;
