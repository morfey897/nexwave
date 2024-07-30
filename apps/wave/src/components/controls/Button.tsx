import React from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';

interface IButtonProps {
	message?: string | number | undefined;
	icon?: React.ReactNode;
	iconAfter?: React.ReactNode;
	// eslint-disable-next-line react/no-unused-prop-types
	variant?: 'default' | 'text' | 'primary' | 'secondary' | 'tertiary' | 'icon';
	// eslint-disable-next-line react/no-unused-prop-types
	isFullWidth?: boolean;
}
const componentClassName = ({
	isFullWidth = false,
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
		{
			'px-2 py-1.5': variant === 'icon',
			'px-6 py-3': variant !== 'icon' && variant !== 'text',
		},
		// Text color
		{
			// Default
			'text-primary-text':
				variant === 'default' ||
				variant === 'text' ||
				variant === 'tertiary' ||
				variant === 'icon',
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
			// Tertiary
			'hover:bg-gray-2 border-transparent dark:hover:bg-gray-700':
				variant === 'tertiary' || variant === 'icon',
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
	icon,
	message,
	iconAfter,
	children,
	isFullWidth,
	variant,
	className,
	...btnProps
}: IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		{...btnProps}
		className={componentClassName({
			isFullWidth,
			icon,
			iconAfter,
			variant,
			className,
		})}
		type={
			type === 'button' || type === 'reset' || type === 'submit'
				? // eslint-disable-next-line react/button-has-type
					type
				: 'button'
		}
	>
		<Content icon={icon} iconAfter={iconAfter} message={message}>
			{children}
		</Content>
	</button>
);

const Link = ({
	href,
	icon,
	message,
	iconAfter,
	children,
	isFullWidth,
	variant,
	className,
	...linkProps
}: IButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
	<NextLink
		{...linkProps}
		className={componentClassName({
			isFullWidth,
			icon,
			iconAfter,
			variant,
			className,
		})}
		href={href || ''}
	>
		<Content icon={icon} iconAfter={iconAfter} message={message}>
			{children}
		</Content>
	</NextLink>
);

const Anchor = ({
	icon,
	message,
	iconAfter,
	children,
	isFullWidth,
	variant,
	className,
	...props
}: IButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
	<a
		{...props}
		className={componentClassName({
			isFullWidth,
			icon,
			iconAfter,
			variant,
			className,
		})}
	>
		<Content icon={icon} iconAfter={iconAfter} message={message}>
			{children}
		</Content>
	</a>
);

const DivButton = ({
	icon,
	message,
	iconAfter,
	children,
	isFullWidth,
	variant,
	className,
	...props
}: IButtonProps & React.HTMLAttributes<HTMLDivElement>) => (
	<div
		{...props}
		className={componentClassName({
			isFullWidth,
			icon,
			iconAfter,
			variant,
			className,
		})}
	>
		<Content icon={icon} iconAfter={iconAfter} message={message}>
			{children}
		</Content>
	</div>
);

const SpanButton = ({
	icon,
	message,
	iconAfter,
	children,
	isFullWidth,
	variant,
	className,
	...props
}: IButtonProps & React.HTMLAttributes<HTMLSpanElement>) => (
	<span
		{...props}
		className={componentClassName({
			isFullWidth,
			icon,
			iconAfter,
			variant,
			className,
		})}
	>
		<Content icon={icon} iconAfter={iconAfter} message={message}>
			{children}
		</Content>
	</span>
);

Button.Link = Link;
Button.Anchor = Anchor;
Button.Div = DivButton;
Button.Span = SpanButton;

export default Button;
