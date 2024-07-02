'use client';

import { useRouter } from 'next/navigation';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useCallback, useState } from 'react';
import { useMounted } from '~root/hooks/mounted';
import Spinner from '../spinner';

const Overlay = () => (
	<div
		className={clsx('fixed inset-0', 'bg-black/20 backdrop-blur-md', 'z-20')}
	>
		<Spinner size={36} className='ml-[50%] mt-[50%]' />
	</div>
);

function Auth({ mode }: { mode: 'signIn' | 'signUp' }) {
	const t = useTranslations();

	const isMounted = useMounted();

	const [localMode, setLocalMode] = useState(mode);

	const route = useRouter();
	const onConfirm = useCallback(() => {
		console.log('onConfirm');
		route.refresh();
	}, [route]);

	const onToggleView = useCallback(() => {
		setLocalMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'));
	}, []);

	if (!isMounted) return <Overlay />;

	return (
		<AlertDialog.Root open>
			<AlertDialog.Portal>
				<AlertDialog.Overlay
					className={clsx(
						'data-[state=open]:animate-overlayShow fixed inset-0',
						'bg-black/20 backdrop-blur-md',
						'z-20'
					)}
				/>
				<AlertDialog.Content
					className={clsx(
						'data-[state=open]:animate-contentShow z-30 focus:outline-none',
						'fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
						'rounded-lg p-6',
						'max-h-[85vh] w-[90vw] max-w-[500px]',
						'shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]',
						'bg-secondary text-primary-text'
					)}
				>
					<AlertDialog.Title className='text-primary-text text-xl font-semibold'>
						{t(
							localMode === 'signIn'
								? 'page.sign_in.headline'
								: 'page.sign_up.headline'
						)}
					</AlertDialog.Title>
					<AlertDialog.Description className='text-secondary-text mt-4'>
						{t(
							localMode === 'signIn'
								? 'page.sign_in.subheadline'
								: 'page.sign_up.subheadline'
						)}
					</AlertDialog.Description>
					{localMode === 'signIn' ? (
						<SignIn changeMode={onToggleView} confirm={onConfirm} />
					) : (
						<SignUp changeMode={onToggleView} confirm={onConfirm} />
					)}
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}

export default Auth;
