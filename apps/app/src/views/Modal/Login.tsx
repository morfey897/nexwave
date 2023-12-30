'use client';

import React, { useEffect, useState } from 'react';
import { TiWaves } from 'react-icons/ti';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useCallback } from 'react';
import Button from '@/components/Button';
import OAuthButton from '@/components/Button/OAuthButton';
import { FcGoogle } from 'react-icons/fc';
import Input from '@/components/Controls/Form/input';
import { useTranslations } from 'next-intl';
import Modal from '@/components/Modal/Central';
import Spinner from '@/components/Spinner';
import { IModal } from '@/types/view';
import { useModals } from '@/hooks/modal';
import { RedirectType } from 'next/navigation';
import ErrorCodes from '@/errorCodes';
import { RiLockPasswordFill, RiFileUserLine } from 'react-icons/ri';
import { HiX } from 'react-icons/hi';
import Headline from '@/components/Headline';
import {
	signInWithEmailAndPassword,
	signUpWithEmailAndPassword,
} from '@/actions/auth';
import { APP, MODALS } from '@/routes';

import { useAction } from '@/hooks/action';
import { EnumStatus } from '@/types/status';
import withModal, { TModalState } from '@/components/Modal';

type TProps = {
	name: string;
	changeMode: () => void;
	confirm: () => void;
};

const SignUp = ({ name, changeMode, confirm }: TProps) => {
	const { action, submit, reset, pending, result } = useAction(
		signUpWithEmailAndPassword,
	);
	const t = useTranslations('sign_up_page');

	useEffect(() => {
		if (result?.status === EnumStatus.SUCCESS) {
			confirm();
		}
	}, [result, confirm]);

	return (
		<div>
			<OAuthButton
				redirect_to={APP}
				provider='google'
				disabled={pending}
				icon={<FcGoogle size={24} />}
				className='w-full px-6 py-3 mt-2'
				message={t('with_google')}
			/>
			<div className='flex items-center justify-between my-4'>
				<span className='w-1/5 border-b dark:border-gray-600'></span>

				<p className='text-sm text-center text-gray-500 dark:text-gray-400'>
					{t('with_email')}
				</p>

				<span className='w-1/5 border-b dark:border-gray-600'></span>
			</div>
			<form
				className='w-full max-w-md'
				onSubmit={submit}
				action={action}
				onChange={reset}
				name={name}
			>
				<div className='space-y-4'>
					<Input
						autoComplete='name'
						icon={<RiFileUserLine size={24} />}
						name='name'
						type='text'
						placeholder={t('name')}
					/>
					<Input
						required
						autoComplete='email'
						icon={<MdOutlineAlternateEmail size={24} />}
						name='email'
						type='email'
						placeholder={t('email')}
						errorCopy={
							(result?.error?.code?.includes(ErrorCodes.INVALID_EMAIL) &&
								t('invalid_email')) ||
							(result?.error?.code?.includes(ErrorCodes.MISSING_EMAIL) &&
								t('missing_email'))
						}
					/>

					<Input
						required
						icon={<RiLockPasswordLine size={24} />}
						name='password'
						type='password'
						placeholder={t('password')}
						errorCopy={
							(result?.error?.code?.includes(ErrorCodes.WEAK_PASSWORD) &&
								t('weak_password')) ||
							(result?.error?.code?.includes(ErrorCodes.MISSING_PASSWORD) &&
								t('missing_password'))
						}
					/>

					<Input
						required
						icon={<RiLockPasswordFill size={24} />}
						name='confirm_password'
						type='password'
						placeholder={t('confirm_password')}
						errorCopy={
							result?.error?.code?.includes(ErrorCodes.INVALID_PASSWORD) &&
							t('invalid_password')
						}
					/>
				</div>

				<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto flex items-center'>
					{result?.error?.code?.includes(ErrorCodes.EMAIL_EXISTS) && (
						<>
							<span className='pr-1'>{t('email_in_use')}</span>
							<Button
								onClick={changeMode}
								variant='text'
								className='text-sm text-blue-500 hover:underline dark:text-blue-400'
								message={t('sign_in')}
							/>
						</>
					)}
				</p>

				<Button
					variant='primary'
					type='submit'
					className='w-full mt-6 px-6 py-3'
					message={t('submit')}
					disabled={pending}
					icon={pending && <Spinner variant='primary' />}
				/>
			</form>
			<div className='mt-6'>
				<div className='text-center mx-auto space-y-2'>
					<Button
						onClick={changeMode}
						variant='text'
						className='text-sm text-blue-500 hover:underline dark:text-blue-400 text-center mx-auto block'
						message={t('have_account')}
					/>
				</div>
			</div>
		</div>
	);
};

const SignIn = ({ name, changeMode, confirm }: TProps) => {
	const { action, submit, reset, pending, result } = useAction(
		signInWithEmailAndPassword,
	);
	const t = useTranslations('sign_in_page');

	useEffect(() => {
		if (result?.status === EnumStatus.SUCCESS) {
			confirm();
		}
	}, [result]);

	return (
		<div>
			<OAuthButton
				redirect_to={APP}
				provider='google'
				disabled={pending}
				icon={<FcGoogle size={24} />}
				className='w-full px-6 py-3 mt-2'
				message={t('with_google')}
			/>
			<div className='flex items-center justify-between my-4'>
				<span className='w-1/5 border-b dark:border-gray-600'></span>

				<p className='text-sm text-center text-gray-500 dark:text-gray-400'>
					{t('with_email')}
				</p>

				<span className='w-1/5 border-b dark:border-gray-600'></span>
			</div>
			<form
				action={action}
				className='w-full'
				onChange={reset}
				onSubmit={submit}
				name={name}
			>
				<div className='space-y-4'>
					<Input
						autoComplete='email'
						icon={<MdOutlineAlternateEmail size={24} />}
						name='email'
						type='email'
						placeholder={t('email')}
						errorCopy={
							result?.error?.code?.includes(ErrorCodes.MISSING_EMAIL) &&
							t('missing_email')
						}
					/>

					<Input
						hint={
							<Button
								variant='text'
								message={t('forgot_password')}
								className='text-center text-xs text-blue-500 hover:underline dark:text-blue-400 !p-0 mt-1'
							/>
						}
						icon={<RiLockPasswordLine size={24} />}
						name='password'
						type='password'
						placeholder={t('password')}
						errorCopy={
							result?.error?.code?.includes(ErrorCodes.MISSING_PASSWORD) &&
							t('missing_password')
						}
					/>
				</div>

				<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto'>
					{result?.status === EnumStatus.FAILED && t('invalid_credential')}
				</p>

				<Button
					variant='primary'
					type='submit'
					className='w-full mt-6 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
					message={t('submit')}
					disabled={pending}
					icon={pending && <Spinner variant='primary' />}
				/>
			</form>
			<div className='mt-6'>
				<div className='text-center mx-auto space-y-2'>
					<Button
						onClick={changeMode}
						variant='text'
						className='text-sm text-blue-500 hover:underline dark:text-blue-400 text-center mx-auto block'
						message={t('dont_have_account')}
					/>
				</div>
			</div>
		</div>
	);
};

export type TLoginProps = { mode: string } | null;

export function LoginView({
	headline,
	subheadline,
	name,
	params,
	onConfirm,
	onDismiss,
}: IModal<TLoginProps> & { headline?: string; subheadline?: string }) {
	const { onOpen } = useModals();
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

export default withModal<TLoginProps>(LoginView);
