import clsx from 'clsx';
import Link from 'next/link';
import Button from '@/components/Button';

// const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => (
// 	<button {...props} />
// );

function NavItem({
	href,
	onClick,
	message,
	className,
	icon,
	iconAfter,
	active,
}: Parameters<typeof Button>[0] & {
	href?: string;
	active?: boolean;
}) {
	const wrapperClassName = clsx(
		'px-1 py-2 md:px-3 md:py-2',
		'flex items-center flex-col lg:flex-row text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
		'relative transition-all w-min-content',
		'before:w-0 before:h-0.5 before:absolute before:bottom-0 before:right-0 before:transition-all before:duration-500',
		'hover:before:w-full hover:before:left-0 before:bg-blue-500 hover:before:bg-gradient-to-r hover:before:from-blue-500 hover:before:to-blue-800',
		active && '!bg-gray-200 dark:!bg-gray-700',
		className,
	);

	return !!href ? (
		<Link
			href={href}
			onClick={
				onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined
			}
			className={wrapperClassName}
		>
			{icon}
			{!!message && (
				<span className={'mx-4 font-medium hidden md:block'}>{message}</span>
			)}
			{iconAfter}
		</Link>
	) : (
		<button onClick={onClick} className={wrapperClassName}>
			{icon}
			{!!message && (
				<span className={'mx-4 font-medium hidden md:block'}>{message}</span>
			)}
			{iconAfter}
		</button>
	);
}

export default NavItem;