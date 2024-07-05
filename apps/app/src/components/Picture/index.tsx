import clsx from 'clsx';

function Picture({
	className,
	size,
	photo,
	name,
	abbrev,
	variant = 'default',
}: {
	className?: string;
	size?: number;
	photo?: string | null;
	name?: string;
	abbrev?: string;
	variant?: 'default' | 'primary' | 'secondary';
}) {
	return (
		<div
			className={clsx(
				'shrink-0 rounded-lg ring',
				'flex items-center justify-center',
				{
					'bg-blue-500 text-white disabled:bg-blue-400 disabled:text-gray-300 dark:bg-blue-600 disabled:dark:bg-blue-700 disabled:dark:text-gray-700':
						variant === 'primary',

					'border !border-l !border-r bg-white text-gray-700  disabled:text-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 disabled:dark:text-gray-700':
						variant === 'default',

					'bg-green-700 text-white  disabled:bg-green-400 disabled:text-gray-300 dark:bg-green-800 disabled:dark:bg-green-700 disabled:dark:text-gray-700':
						variant === 'secondary',
				},
				className
			)}
			style={{ width: size, height: size }}
		>
			{!!photo ? (
				<picture>
					<img
						className={clsx('rounded-lg object-cover')}
						src={photo}
						alt={name || 'picture'}
						style={{ width: size, height: size }}
						width={size}
						height={size}
					/>
				</picture>
			) : (
				<p className='font-semibold' style={{ fontSize: `calc(${size}px/2)` }}>
					{abbrev}
				</p>
			)}
		</div>
	);
}

export default Picture;
