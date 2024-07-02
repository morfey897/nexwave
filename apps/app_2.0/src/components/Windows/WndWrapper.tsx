import clsx from 'clsx';

function WndWrapper({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'relative rounded-lg border bg-gray-100 shadow dark:border-gray-600 dark:bg-gray-900',
				'w-[95vw] md:w-[475px]',
				className
			)}
			{...rest}
		/>
	);
}

export default WndWrapper;
