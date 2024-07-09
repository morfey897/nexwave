import clsx from 'clsx';
import ProfileIcon from '~/icons/ProfileIcon';

function PersonPic({
	className,
	size,
	photo,
}: {
	className?: string;
	size?: number;
	photo?: string | null;
}) {
	return (
		<div
			className={clsx(
				'shrink-0 rounded-full',
				'flex items-center justify-center',
				'font-medium text-white',
				className
			)}
			style={{
				width: size,
				height: size,
			}}
		>
			{photo ? (
				<picture>
					<img
						className={clsx('rounded-full object-cover')}
						src={photo}
						alt='avatar'
						style={{ width: size, height: size }}
						width={size}
						height={size}
					/>
				</picture>
			) : (
				<ProfileIcon width={size} height={size} />
			)}
		</div>
	);
}

export default PersonPic;
