'use client';
import { IModal } from '@/types/view';
import { useCallback } from 'react';
import Aside from '@/components/Modal/Side';
import withModal, { TModalState } from '@/components/Modal';
import Button from '@/components/Button';
import { HiCog, HiLogout } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { HOME, MODALS } from '@/routes';
import { signOut } from '@/actions/auth';
import User from '@/components/Header/User';
import { useNWStore } from '@/hooks/store';

export type TAsideSettingsProps = null;

function AsideSettings({
	name,
	params,
	state,
	onConfirm,
	onDismiss,
}: IModal<TAsideSettingsProps> & TModalState) {
	const user = useNWStore((state) => state.user);
	const t = useTranslations('common');
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
		<Aside position='right' state={state}>
			<div>
				<User user={user} size='md' />
				<Button
					variant='text'
					size='lg'
					icon={<HiCog size={32} />}
					message={t('settings')}
					onClick={onSettings}
					className='w-full'
				/>
				<hr className='border-gray-200 dark:border-gray-700' />
				<Button
					variant='text'
					size='lg'
					icon={<HiLogout size={32} />}
					message={t('sign_out')}
					onClick={onExit}
					className='w-full'
				/>
			</div>
		</Aside>
	);
}

export default withModal<TAsideSettingsProps>(
	AsideSettings,
	MODALS.SETTINGS,
	20,
);
