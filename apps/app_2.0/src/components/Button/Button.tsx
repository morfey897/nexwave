import clsx from 'clsx';
import Link from 'next/link';

export interface IButtonProps {
	message?: string | number | undefined;
	variant?:
		| 'default'
		| 'text'
		| 'primary'
		| 'secondary'
		| 'warn'
		| 'danger'
		| 'light'
		| 'dark';
	size?: 'xs' | 'sm' | 'md' | 'lg';
	icon?: React.ReactNode;
	iconAfter?: React.ReactNode;
	shadow?: boolean;
	tag?: 'button' | 'link' | 'a' | 'div' | 'span';
}

function Button<
	T extends
		React.HTMLAttributes<any> = React.ButtonHTMLAttributes<HTMLButtonElement>,
>({
	variant = 'default',
	size = 'md',
	shadow = true,
	icon,
	message,
	iconAfter,
	children,
	className,
	tag = 'button',
	...props
}: IButtonProps & T) {
	// | React.AnchorHTMLAttributes<HTMLAnchorElement>
	// | React.HTMLAttributes<HTMLDivElement>
	// | React.HTMLAttributes<HTMLSpanElement>

	const componentClassName = clsx(
		'flex items-center justify-center rounded-lg tracking-wide shrink-0 transition-all duration-200 font-semibold border',
		// Size
		{
			'px-2 py-1 text-xs space-x-1': size === 'xs',
			'px-4 py-1.5 text-sm space-x-2': size === 'sm',
			'px-5 py-2 text-base space-x-2.5': size === 'md',
			'px-6 py-3 text-xl space-x-3': size === 'lg',
		},
		// Text color
		{
			// Default
			'text-gray-7 disabled:dark:text-gray-3 disabled:text-gray-3':
				variant === 'default',
			// Primary & Secondary
			'text-white disabled:dark:text-gray-3 disabled:text-gray-3':
				variant === 'primary' ||
				variant === 'secondary' ||
				variant === 'warn' ||
				variant === 'danger',
			// Text
			'text-gray-7 hover:text-gray-8 dark:hover:text-gray-3 disabled:dark:text-gray-3 disabled:text-gray-3':
				variant === 'text',
		},
		// Background color
		{
			// Default
			'border-slate-100 dark:border-slate-700': variant === 'default',
			// Light
			'border-slate-100 dark:border-slate-900 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-900 hover:border-white dark:hover:border-slate-800':
				variant === 'light',
			'border-white dark:border-slate-800 bg-slate-100 hover:bg-white dark:bg-slate-900 dark:hover:bg-slate-800 hover:border-slate-100 dark:hover:border-slate-900':
				variant === 'dark',
			// Primary
			'border-blue-500 dark:border-blue-600 bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 disabled:bg-blue-400 disabled:dark:bg-blue-700':
				variant === 'primary',
			// Secondary
			'border-green-700 dark:border-green-800 bg-green-700 hover:bg-green-800 dark:hover:bg-green-700 dark:bg-green-800 disabled:bg-green-400 disabled:dark:bg-green-700':
				variant === 'secondary',
			// Warn
			'border-orange-500 dark:border-orange-600 bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-500 dark:bg-orange-600 disabled:bg-orange-400 disabled:dark:bg-orange-700':
				variant === 'warn',
			// Danger
			'border-red-500 dark:border-red-600 bg-red-500 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600 disabled:bg-red-400 disabled:dark:bg-red-700':
				variant === 'danger',
			// Text
			'border-0': variant === 'text',
		},
		// Shadow
		shadow && {
			// Default
			'hover:shadow-md hover:shadow-slate-400': variant === 'default',
			// Primary
			'hover:shadow-md hover:shadow-blue-600 hover:dark:hover:bg-blue-500':
				variant === 'primary',
			// Secondary
			'hover:shadow-md hover:shadow-green-800 hover:dark:hover:bg-green-700':
				variant === 'secondary',
			// Warn
			'hover:shadow-md hover:shadow-orange-600 hover:dark:hover:bg-orange-500':
				variant === 'warn',
			// Danger
			'hover:shadow-md hover:shadow-red-600 hover:dark:hover:bg-red-500':
				variant === 'danger',
			// Text
			'shadow-none': variant === 'text',
		},
		'disabled:shadow-none disabled:cursor-not-allowed',
		// 'hover:shadow-md hover:shadow-blue-500',
		className
	);
	const content = (
		<>
			{icon}
			{!!message && <span className='message truncate'>{message}</span>}
			{iconAfter}
			{children}
		</>
	);

	switch (tag) {
		case 'button':
			const { type, ...btnProps } =
				props as React.ButtonHTMLAttributes<HTMLButtonElement>;
			return (
				<button
					className={componentClassName}
					{...btnProps}
					type={type || 'button'}
				>
					{content}
				</button>
			);
		case 'link':
			const { href, ...rest } =
				props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
			return (
				<Link className={componentClassName} href={href || ''} {...rest}>
					{content}
				</Link>
			);
		case 'a':
			return (
				<a
					className={componentClassName}
					{...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					{content}
				</a>
			);
		case 'div':
			return (
				<div
					className={componentClassName}
					{...(props as React.HTMLAttributes<HTMLDivElement>)}
				>
					{content}
				</div>
			);
		case 'span':
			return (
				<span
					className={componentClassName}
					{...(props as React.HTMLAttributes<HTMLSpanElement>)}
				>
					{content}
				</span>
			);
	}
	return null;
}

export default Button;
