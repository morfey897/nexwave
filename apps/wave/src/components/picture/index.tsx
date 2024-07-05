import clsx from 'clsx';
import { getColorSchema } from '~/utils';

function Picture({
	className,
	size,
	photo,
	name,
	abbrev,
	color,
}: {
	className?: string;
	size?: number;
	photo?: string | null;
	name?: string;
	abbrev?: string;
	color?: Parameters<typeof getColorSchema>[0];
}) {
	return (
		<div
			className={clsx(
				'shrink-0 rounded-lg',
				'flex items-center justify-center',
				'text-primary-text',
				className
			)}
			style={{
				width: size,
				height: size,
				backgroundColor: `var(--user-${getColorSchema(color)})`,
			}}
		>
			{photo ? (
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
				<p style={{ fontSize: `calc(${size}px/2)` }}>{abbrev}</p>
			)}
		</div>
	);
}

export default Picture;
