'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const isActive = (pathName: string, route: string) =>
	pathName.replace(/\/+$/, '') === route.replace(/\/+$/, '');

function NavButton({
	href,
	onClick,
	message,
	className,
	icon,
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	message?: string | number | undefined;
	icon?: React.ReactNode;
	href: string;
}) {
	const pathname = usePathname();

	const active = isActive(pathname, href);

	return (
		<Link
			href={href}
			onClick={
				onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined
			}
			className={clsx(
				'px-1 py-2 md:px-3 md:py-2',
				'text-gray-6 hover:bg-gray-1 dark:hover:bg-gray-1 dark:hover:text-gray-7 hover:text-gray-7 flex transform flex-col items-center rounded-lg transition-colors duration-300 lg:flex-row',
				'w-min-content relative transition-all',
				'before:absolute before:bottom-0 before:right-0 before:h-0.5 before:w-0 before:transition-all before:duration-500',
				'before:bg-blue-500 hover:before:left-0 hover:before:w-full hover:before:bg-gradient-to-r hover:before:from-blue-500 hover:before:to-blue-800',
				active && '!bg-gray-200 dark:!bg-gray-700',
				className
			)}
		>
			{icon}
			{!!message && (
				<span className={'mx-4 hidden font-medium md:block'}>{message}</span>
			)}
		</Link>
	);
}

export default NavButton;
