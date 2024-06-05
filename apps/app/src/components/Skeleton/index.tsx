import clsx from 'clsx';

function Skeleton({ className }: { className?: string }) {
	return (
		<div
			className={clsx(
				'shrink-0 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-600',
				'border border-gray-400 dark:border-gray-700',
				'min-h-[20px] w-full',
				className
			)}
		/>
	);
}

export default Skeleton;
