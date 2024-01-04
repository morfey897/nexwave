'use client';
import { useRouter } from 'next/navigation';
import { HOME } from '@/routes';
import Overlay from '@/components/Overlay';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal/Central';
import { HiX } from 'react-icons/hi';
import Headline from '@/components/Headline';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Auth({ mode }: { mode: 'signIn' | 'signUp' }) {
	const [localMode, setLocalMode] = useState(mode);

	const route = useRouter();
	const t = useTranslations('auth_page');
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
		<Overlay blur='sm' className='bg-gray-100/20 dark:bg-black/60 z-50'>
			<div className='mt-[100px]'>
				<Modal className={'mx-auto max-w-[375px] relative'} name={''}>
					<Button
						variant='text'
						className='absolute top-2 right-0.5 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800'
						icon={<HiX size={28} />}
						onClick={() => onDismiss()}
					/>
					<Headline
						headline={t('headline')}
						subheadline={t('subheadline')}
						className='text-lg md:text-xl font-semibold text-center'
						bodyClassName='text-center'
					/>
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
				</Modal>
			</div>
		</Overlay>
	);
}

export default Auth;
