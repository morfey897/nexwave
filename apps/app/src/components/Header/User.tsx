import clsx from 'clsx';
import { MdVerified } from 'react-icons/md';
import { useNWStore } from '@/hooks/store';
import { fullname, abbreviation } from '@/utils/data';

export const Avatar = ({
	className,
	size,
}: {
	className?: string;
	size?: number;
}) => {
	const user = useNWStore((state) => state.user);
	const photo = user?.avatar;

	return (
		<div
			className={clsx(
				'shrink-0 rounded-lg ring text-gray-200 dark:ring-gray-200 ring-gray-300 bg-blue-500 dark:bg-blue-600',
				'flex items-center justify-center',
				className,
			)}
			style={{ width: size, height: size }}
		>
			{!!photo ? (
				<picture>
					<img
						className={clsx('rounded-full object-cover')}
						src={photo}
						alt={fullname(user) || 'avatar'}
						style={{ width: size, height: size }}
						width={size}
						height={size}
					/>
				</picture>
			) : (
				<p className='font-semibold' style={{ fontSize: `calc(${size}px/2)` }}>
					{abbreviation(user)}
				</p>
			)}
		</div>
	);
};

function User(props: React.HTMLAttributes<HTMLDivElement>) {
	const user = useNWStore((state) => state.user);
	return (
		<div {...props}>
			<Avatar size={32} />
			<div className='mx-4'>
				<h1 className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
					{fullname(user)}
				</h1>
				<p className='text-sm text-gray-500 dark:text-gray-400 break-words hyphens-auto'>
					{user?.email}{' '}
					{user?.emailVerified && (
						<sup className='inline-block text-blue-500'>
							<MdVerified size={12} />
						</sup>
					)}
				</p>
			</div>
		</div>
	);
}

export default User;
