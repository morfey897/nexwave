'use client';
import { MODALS } from '@/routes';
import { useCallback } from 'react';
import Picture from '@/components/Picture';
import { useNWStore } from '@/hooks/store';
import { abbrev, fullname } from '@/utils';
import Button from '@/components/Button';
import { useOpenModal } from '@nw/modal';

function Client() {
	const openModal = useOpenModal();
	const user = useNWStore((state) => state.user);
	const onOpenSettings = useCallback(() => {
		if (!user) return;
		openModal(MODALS.SETTINGS);
	}, [openModal, user]);

	return (
		<Button
			variant='text'
			className='mr-1 mb-1 !p-0'
			onClick={onOpenSettings}
			icon={
				<Picture
					variant='primary'
					size={32}
					photo={user?.avatar}
					abbrev={abbrev([
						[user?.name, user?.surname],
						user?.email.split('@').slice(0, 2),
					])}
					name={fullname(user)}
				/>
			}
		/>
	);
}

export default Client;
