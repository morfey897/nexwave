'use client';
import { MdVerified, MdModeEditOutline } from 'react-icons/md';
import { fullname, abbrev } from '@/utils';
import Picture from './Picture';
import { ICurrentUser } from '@/models/user';
import Button from '@/components/Button';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

function User({
	user,
	variant = 'medium',
	className,
	...props
}: {
	user: ICurrentUser | null;
	variant?: 'small' | 'medium' | 'large';
} & React.HTMLAttributes<HTMLDivElement>) {
	const t = useTranslations('common');
	const size = variant === 'small' ? 32 : variant === 'medium' ? 40 : 52;

	const onEdit = useCallback(() => {
		console.log('edit');
	}, []);

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
				size={size}
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
				<Button
					variant='text'
					message={t('edit')}
					className='hover:underline !p-0 mt-1'
					iconAfter={<MdModeEditOutline size={12} />}
					onClick={onEdit}
				/>
			</div>
		</div>
	);
}

export default User;
