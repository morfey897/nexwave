import Image from 'next/image';
import { User } from 'firebase/auth';
import clsx from 'clsx';
import { HiOutlineUser } from 'react-icons/hi';

export const Avatar = ({
	user,
	className,
	size,
}: {
	user: User | null;
	className?: string;
	size?: number;
}) => {
	const photo = user?.photoURL;
	const abrev = (user?.displayName?.split(' ') || user?.email?.split('@'))
		?.map((n) => n[0].toUpperCase())
		.join('');

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
				<img
					className={clsx('rounded-full object-cover')}
					src={photo}
					alt={user?.displayName || 'avatar'}
					style={{ width: size, height: size }}
					width={size}
					height={size}
				/>
			) : abrev && abrev.length > 0 ? (
				<p className='font-semibold' style={{ fontSize: `calc(${size}px/2)` }}>
					{abrev}
				</p>
			) : (
				<HiOutlineUser size={size} />
			)}
		</div>
	);
};

function User({
	user,
	...props
}: { user: User | null } & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props}>
			<Avatar user={user} size={32} />
			<div className='mx-4'>
				<h1 className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
					{user?.displayName}
				</h1>
				<p className='text-sm text-gray-500 dark:text-gray-400 break-words hyphens-auto'>
					{user?.email}
				</p>
			</div>
		</div>
	);
}

export default User;
