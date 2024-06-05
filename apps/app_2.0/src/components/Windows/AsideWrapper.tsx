import clsx from 'clsx';

function AsideWrapper({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<aside
			className={clsx(
				'pt-[86px] pb-[100px] px-4 py-8',
				'min-h-screen w-64',
				'bg-white dark:bg-gray-800 dark:border-gray-700 border-r',
				className,
			)}
			{...rest}
		/>
	);
}

export default AsideWrapper;
