import clsx from 'clsx';
import Link from 'next/link';

const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => (
	<button {...props} />
);

function NavItem({
	href,
	onClick,
	label,
	className,
	Icon,
}: {
	onClick?: () => void;
	href?: string;
	className?: string;
	label?: string;
	Icon?: (props: React.SVGProps<any>) => JSX.Element;
}) {
	const Component = href ? Link : Button;

	return (
		<Component
			href={href || ''}
			onClick={onClick}
			className={clsx(
				'flex items-center flex-col lg:flex-row px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
				'relative transition-all w-min-content',
				'before:w-0 before:h-0.5 before:absolute before:bottom-0 before:right-0 before:bg-blue-400 before:transition-all before:duration-500',
				'hover:before:w-full hover:before:left-0 hover:before:bg-blue-600',
				className,
			)}
		>
			{!!Icon && <Icon className={'w-8 h-8 shrink-0'} />}
			{!!label && (
				<span className={'mx-4 font-medium hidden md:block'}>{label}</span>
			)}
		</Component>
	);
}

export default NavItem;
