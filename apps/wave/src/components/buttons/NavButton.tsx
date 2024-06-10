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
				'flex transform flex-col items-center rounded-lg text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 lg:flex-row dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200',
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
