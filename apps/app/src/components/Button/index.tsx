import clsx from 'clsx';

export interface IButtonProps {
	message?: string | number | undefined;
	variant?: 'primary' | 'default' | 'text' | 'secondary';
	size?: 'sm' | 'md' | 'lg';
	icon?: React.ReactNode;
	iconAfter?: React.ReactNode;
}

export function Button({
	variant = 'default',
	size = 'md',
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
				'flex items-center justify-center rounded-lg tracking-wide shrink-0 transition-colors duration-200 font-semibold',
				{
					'text-white bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 disabled:dark:text-gray-700 disabled:text-gray-300 disabled:bg-blue-400 disabled:dark:bg-blue-700':
						variant === 'primary',
					'text-gray-700 border !border-l !border-r dark:hover:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 disabled:dark:text-gray-700 disabled:text-gray-200':
						variant === 'default',
					'text-white bg-green-700 hover:bg-green-800 dark:hover:bg-green-700 dark:bg-green-800 disabled:dark:text-gray-700 disabled:text-gray-300 disabled:bg-green-400 disabled:dark:bg-green-700':
						variant === 'secondary',
					'text-gray-700 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300 disabled:dark:text-gray-700 disabled:text-gray-300':
						variant === 'text',
				},
				{
					'px-4 py-1 text-sm gap-x-2': size === 'sm',
					'px-5 py-2 text-base gap-x-4': size === 'md',
					'px-6 py-3 text-xl gap-x-6': size === 'lg',
				},
				className,
			)}
			{...props}
		>
			{icon}
			{!!message && (
				<span className='message'>{message}</span>
			)}
			{iconAfter}
			{children}
		</button>
	);
}

export function ButtonSkeleton({
	size = 'md',
	className,
}: IButtonProps & { className?: string }) {
	return (
		<div
			className={clsx(
				'animate-pulse rounded-lg shrink-0 bg-gray-300 dark:bg-gray-600',
				'border !border-l !border-r border-gray-400 dark:border-gray-700',
				{
					'h-[30px]': size === 'sm',
					'h-[42px]': size === 'md',
					'h-[54px]': size === 'lg',
				},
				className,
			)}
		/>
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
