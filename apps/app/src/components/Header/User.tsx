import { MdVerified } from 'react-icons/md';
import { fullname, abbrev } from '@/utils';
import Picture from './Picture';
import { ICurrentUser } from '@/models/user';
import clsx from 'clsx';

function User({
	user,
	size = 'md',
	className,
	...props
}: {
	user: ICurrentUser | null;
	size?: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLDivElement>) {
	const sizeNumber = size === 'sm' ? 32 : size === 'md' ? 40 : 52;

	return (
		<div
			className={clsx(
				'flex p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 cursor-default',
				className,
			)}
			{...props}
		>
			<Picture
				variant='primary'
				size={sizeNumber}
				photo={user?.avatar}
				abbrev={abbrev([
					[user?.name, user?.surname],
					user?.email.split('@').slice(0, 2),
				])}
				name={fullname(user)}
			/>
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
