'use client';
import { useCallback } from 'react';
import { type IModal, withModal, Position, useCloseAllModal } from '@nw/modal';
import Button from '@/components/Button';
import { HiCog, HiLogout } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { HOME } from '@/routes';
import { signOut } from '@/actions/auth-action';
import useNWStore from '@/lib/store';
import clsx from 'clsx';
import { MdVerified } from 'react-icons/md';
import { fullname, abbrev } from '@/utils';
import Picture from '@/components/Picture';
import { useTranslations } from 'next-intl';
import { AsideWrapper, AsideHeader, AsideBody } from '@/components/Windows';

function AsideSettings(props: IModal) {
	const onCloseAll = useCloseAllModal();
	const user = useNWStore((state) => state.user);
	const destroyStore = useNWStore((state) => state._destroyStore);

	const t = useTranslations();
	const route = useRouter();

	const onExit = useCallback(async () => {
		destroyStore();
		onCloseAll();
		await signOut();
		route.push(HOME);
	}, [route, onCloseAll, destroyStore]);

	const onSettings = useCallback(() => {
		// setOpen(false);
		console.log('onSettings');
	}, []);

	return (
		<AsideWrapper className='!w-fit'>
			<AsideHeader>
				<div
					className={clsx(
						'flex text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 cursor-default',
					)}
				>
					<Picture
						variant='primary'
						size={40}
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
			</AsideHeader>
			<AsideBody>
				<Button
					variant='text'
					size='lg'
					icon={<HiCog size={32} />}
					message={t('button.settings')}
					onClick={onSettings}
					className='w-full'
				/>
				<hr className='border-gray-200 dark:border-gray-700' />
				<Button
					variant='text'
					size='lg'
					icon={<HiLogout size={32} />}
					message={t('button.sign_out')}
					onClick={onExit}
					className='w-full'
				/>
			</AsideBody>
		</AsideWrapper>
	);
}

export default withModal(AsideSettings, {
	position: [Position.RIGHT, Position.TOP],
	wrapper: {
		className: 'z-20',
	},
	overlay: {
		className: 'bg-gray-100/20 dark:bg-black/60 backdrop-blur',
	},
});
