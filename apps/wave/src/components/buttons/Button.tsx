import React from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';

interface IButtonProps {
	message?: string | number | undefined;
	icon?: React.ReactNode;
	iconAfter?: React.ReactNode;
	// eslint-disable-next-line react/no-unused-prop-types
	variant?: 'default' | 'text' | 'primary' | 'secondary';
	// eslint-disable-next-line react/no-unused-prop-types
	isFullWidth?: boolean;
}
const componentClassName = ({
	isFullWidth = true,
	icon,
	iconAfter,
	variant = 'default',
	className,
}: IButtonProps & { className?: string }) =>
	clsx(
		'disabled:contrast-[.6]',
		'flex items-center justify-center rounded-md tracking-wide shrink-0 transition-all duration-200 border',
		isFullWidth && 'w-full',
		// Font
		'font-medium text-base',
		// Padding
		(!!icon || !!iconAfter) && 'gap-2',
		// Size
		variant !== 'text' && 'px-6 py-3',
		// Text color
		{
			// Default
			'text-primary-text': variant === 'default' || variant === 'text',
			// Primary & Secondary
			'text-white': variant === 'primary' || variant === 'secondary',
			// Text
		},
		// Background color
		{
			// Default
			'border-dark-7 dark:border-dark-5 hover:ring-2': variant === 'default',
			// Primary
			'bg-blue-1 dark:bg-blue-2 border-blue-1 dark:border-blue-2 hover:bg-blue-2 dark:hover:bg-blue-1 disabled:bg-blue-1 disabled:dark:bg-blue-2':
				variant === 'primary',
			// Text
			'border-0 hover:decoration-1 hover:underline disabled:no-underline disabled:decoration-0':
				variant === 'text',
		},
		'disabled:cursor-not-allowed',
		className
	);

const Content = ({
	icon,
	message,
	iconAfter,
	children,
}: IButtonProps & { children?: React.ReactNode }) => (
	<>
		{icon}
		{!!message && <span className='message truncate'>{message}</span>}
		{iconAfter}
		{children}
	</>
);

const Button = ({
	type = 'button',
	...btnProps
}: IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		{...btnProps}
		className={componentClassName(btnProps)}
		type={
			type === 'button' || type === 'reset' || type === 'submit'
				? // eslint-disable-next-line react/button-has-type
					type
				: 'button'
		}
	>
		<Content {...btnProps} />
	</button>
);

const Link = ({
	href,
	...linkProps
}: IButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
	<NextLink
		{...linkProps}
		className={componentClassName(linkProps)}
		href={href || ''}
	>
		<Content {...linkProps} />
	</NextLink>
);

const Anchor = (
	props: IButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
) => (
	<a {...props} className={componentClassName(props)}>
		<Content {...props} />
	</a>
);

const Div = (props: IButtonProps & React.HTMLAttributes<HTMLDivElement>) => (
	<div {...props} className={componentClassName(props)}>
		<Content {...props} />
	</div>
);

const Span = (props: IButtonProps & React.HTMLAttributes<HTMLSpanElement>) => (
	<span {...props} className={componentClassName(props)}>
		<Content {...props} />
	</span>
);

export { Link, Anchor, Div, Span, Button };

export default Button;
