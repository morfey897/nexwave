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
					'text-white bg-blue-500 dark:bg-blue-600 disabled:dark:text-gray-700 disabled:text-gray-300 disabled:bg-blue-400 disabled:dark:bg-blue-700':
						variant === 'primary',

					'text-gray-700 bg-white border !border-l !border-r  dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 disabled:dark:text-gray-700 disabled:text-gray-200':
						variant === 'default',

					'text-white bg-green-700  dark:bg-green-800 disabled:dark:text-gray-700 disabled:text-gray-300 disabled:bg-green-400 disabled:dark:bg-green-700':
						variant === 'secondary',
				},
				className,
			)}
			style={{ width: size, height: size }}
		>
			{!!photo ? (
				<picture>
					<img
						className={clsx('rounded-full object-cover')}
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
