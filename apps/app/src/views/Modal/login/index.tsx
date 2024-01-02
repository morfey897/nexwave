'use client';
import { TiWaves } from 'react-icons/ti';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal/Central';
import { useModals, useModalParams } from '@/hooks/modal';
import { RedirectType } from 'next/navigation';
import { HiX } from 'react-icons/hi';
import Headline from '@/components/Headline';
import { APP } from '@/routes';

import withModal, { type IModal } from '@/components/Modal';
import SignIn from './SignIn';
import SignUp from './SignUp';

export type TLoginProps = { mode: string } | null;

export function LoginView({
	headline,
	subheadline,
	externalParams,
	name,
	onConfirm,
	onDismiss,
}: IModal & {
	headline?: string;
	subheadline?: string;
	externalParams?: TLoginProps;
}) {
	const { onOpen } = useModals();
	const params = useModalParams<{ mode?: string }>(name);
	const [isNew, setNew] = useState(params?.mode === 'new');

	useEffect(() => {
		setNew(params?.mode === 'new');
	}, [params]);

	const confirm = useCallback(() => {
		onConfirm(APP);
	}, [onConfirm]);

	const onToggleView = useCallback(() => {
		if (name) {
			onOpen(name, isNew ? null : { mode: 'new' }, RedirectType.replace);
		} else {
			setNew((v) => !v);
		}
	}, [onOpen, isNew, name]);

	return (
		<Modal className={'mx-auto max-w-[375px] relative'} name={name}>
			<Button
				variant='text'
				className='absolute top-2 right-0.5 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800'
				icon={<HiX size={28} />}
				onClick={() => onDismiss()}
			/>
			{!!headline ? (
				<Headline
					headline={headline}
					subheadline={subheadline}
					className='text-lg md:text-xl font-semibold text-center'
					bodyClassName='text-center'
				/>
			) : (
				<div className='flex justify-center'>
					<div className='text-gray-800 dark:text-white'>
						<TiWaves size={48} />
					</div>
				</div>
			)}
			{isNew ? (
				<SignUp name='signUp' changeMode={onToggleView} confirm={confirm} />
			) : (
				<SignIn name='signIn' changeMode={onToggleView} confirm={confirm} />
			)}
		</Modal>
	);
}

export default withModal(LoginView);
