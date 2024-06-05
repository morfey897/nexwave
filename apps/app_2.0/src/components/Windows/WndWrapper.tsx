import clsx from 'clsx';

function WndWrapper({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'relative rounded-lg border shadow dark:border-gray-600 bg-gray-100 dark:bg-gray-900',
				'md:w-[475px] w-[95vw]',
				className,
			)}
			{...rest}
		/>
	);
}

export default WndWrapper;
