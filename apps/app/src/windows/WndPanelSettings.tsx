'use client';
import { useCallback } from 'react';
import { type IModal, withModal, Position } from '@nw/modal';
import Button from '@/components/Button';
import { HiCog, HiLogout } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { HOME } from '@/routes';
import { signOut } from '@/actions/auth-action';
import User from '@/components/Header/User';
import { useNWStore } from '@/hooks/store';
import clsx from 'clsx';

function AsideSettings(props: IModal) {
	const user = useNWStore((state) => state.user);
	const t = useTranslations();
	const route = useRouter();

	const onExit = useCallback(async () => {
		// setOpen(false);
		// onCloseAll();
		await signOut();
		route.push(HOME);
	}, [route]);

	const onSettings = useCallback(() => {
		// setOpen(false);
		console.log('onSettings');
	}, []);

	return (
		<aside
			className={clsx(
				'pt-[calc(86px+2rem)] pb-[100px] px-4 py-8',
				'min-h-screen w-64',
				'bg-white dark:bg-gray-800 dark:border-gray-700 border-l',
			)}
		>
			<div>
				<User user={user} size='md' />
				<Button
					variant='text'
					size='lg'
					icon={<HiCog size={32} />}
					message={t('general.settings')}
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
			</div>
		</aside>
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
