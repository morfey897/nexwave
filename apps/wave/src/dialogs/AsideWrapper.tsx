import clsx from 'clsx';

function AsideWrapper({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<aside
			className={clsx(
				'px-4 py-8 pb-[100px] pt-[86px]',
				'min-h-screen w-64',
				'border-r bg-white dark:border-gray-700 dark:bg-gray-800',
				className
			)}
			{...rest}
		/>
	);
}

export default AsideWrapper;
