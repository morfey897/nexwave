import clsx from 'clsx';

function Skeleton({ className }: { className?: string }) {
	return (
		<div
			className={clsx(
				'animate-pulse rounded-lg shrink-0 bg-gray-300 dark:bg-gray-600',
				'border border-gray-400 dark:border-gray-700',
				'w-full min-h-[20px]',
				className,
			)}
		/>
	);
}

export default Skeleton;