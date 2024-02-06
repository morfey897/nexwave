'use client';
import { useRouter } from 'next/navigation';
import { HOME } from '@/routes';
import {
	type IModal,
	withModal,
	Position,
	ModalWrapper,
	Overlay,
	Container,
	ModalState,
	Modal,
} from '@nw/modal';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
export { default as RefreshToken } from './RefreshToken';
import {
	WndWrapper,
	WndHeader,
	WndBody,
	WndFooter,
} from '@/components/Windows';
import clsx from 'clsx';

function Auth({ mode }: { mode: 'signIn' | 'signUp' }) {
	const [localMode, setLocalMode] = useState(mode);

	const route = useRouter();
	const t = useTranslations();
	const onConfirm = useCallback(() => {
		route.refresh();
	}, [route]);

	const onDismiss = useCallback(() => {
		route.push(HOME);
	}, [route]);

	const onToggleView = useCallback(() => {
		setLocalMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'));
	}, []);

	return (
		<Modal
			className='z-50'
			overlay={{
				className: clsx('bg-gray-100/20 dark:bg-black/60 backdrop-blur'),
			}}
			state={ModalState.OPENED}
			position={[Position.CENTER, `-${Position.TOP}`]}
			container={{
				className: clsx('mt-20 mb-0 md:mb-12'),
			}}
		>
			<WndWrapper>
				<WndHeader
					headline={t('page.auth.headline')}
					subheadline={t('page.auth.subheadline')}
					onClose={onDismiss}
				/>
				<WndBody>
					{localMode === 'signUp' && (
						<SignUp
							name='signUp'
							changeMode={onToggleView}
							confirm={onConfirm}
						/>
					)}
					{localMode === 'signIn' && (
						<SignIn
							name='signIn'
							changeMode={onToggleView}
							confirm={onConfirm}
						/>
					)}
				</WndBody>
			</WndWrapper>
		</Modal>
	);
}

export default Auth;
