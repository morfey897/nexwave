'use client';
import { useRouter } from 'next/navigation';
import { EnumRoutes } from '~constants/enums';
// import { Position, ModalState, Modal } from '@nw/modal';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp_old';
import { Dialog, Button, Text, TextField, Flex } from '@radix-ui/themes';
import { WndWrapper, WndHeader, WndBody } from '~dialogs/index';
// import clsx from 'clsx';

function Auth({ mode }: { mode: 'signIn' | 'signUp' }) {
	const t = useTranslations();
	const route = useRouter();

	const [localMode, setLocalMode] = useState(mode);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const onConfirm = useCallback(() => {
		route.refresh();
	}, [route]);

	const onDismiss = useCallback(() => {
		route.push(EnumRoutes.HOME);
	}, [route]);

	const onToggleView = useCallback(() => {
		setLocalMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'));
	}, []);

	return (
		<Dialog.Root open>
			{localMode === 'signIn' && mounted && (
				<SignIn
					name='signIn'
					changeMode={onToggleView}
					confirm={onConfirm}
					close={onDismiss}
				/>
			)}
			{/* {localMode === 'signUp' && mounted && (
				<SignUp name='signUp' changeMode={onToggleView} confirm={onConfirm} />
			)} */}
		</Dialog.Root>
		// <Modal
		// 	className='z-50'
		// 	overlay={{
		// 		className: clsx('bg-gray-100/20 dark:bg-black/60 backdrop-blur'),
		// 	}}
		// 	state={ModalState.OPENED}
		// 	position={[Position.CENTER, `-${Position.TOP}`]}
		// 	container={{
		// 		className: clsx('mt-20 mb-0 md:mb-12'),
		// 	}}
		// >
		// 	<WndWrapper>
		// 		<WndHeader
		// 			headline={t('page.auth.headline')}
		// 			subheadline={t('page.auth.subheadline')}
		// 			onClose={onDismiss}
		// 		/>
		// 		<WndBody>
		// 			{localMode === 'signIn' ? (
		// 				<SignIn
		// 					name='signIn'
		// 					changeMode={onToggleView}
		// 					confirm={onConfirm}
		// 				/>
		// 			) : (
		// 				<SignUp
		// 					name='signUp'
		// 					changeMode={onToggleView}
		// 					confirm={onConfirm}
		// 				/>
		// 			)}
		// 		</WndBody>
		// 	</WndWrapper>
		// </Modal>
	);
}

export default Auth;
