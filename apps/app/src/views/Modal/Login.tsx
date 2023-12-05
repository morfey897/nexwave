'use client';

import React, { useEffect, useState } from 'react';
import { TiWaves } from 'react-icons/ti';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useCallback } from 'react';
import Button from '@/components/Button';
import { FcGoogle } from 'react-icons/fc';
import Input from '@/components/Controls/Form/input';
import { useTranslations } from 'next-intl';
import Modal from '@/components/Modal';
import { useLogin, EnumProvider, EnumStatus } from '@/hooks/auth';
import Spinner from '@/components/Spinner';
import { IModal } from '@/types/view';
import { APP } from '@/routes';
import { useModals } from '@/hooks/modal';
import { RedirectType } from 'next/navigation';
import { AuthErrorCodes } from '@/errorCodes';
import { RiLockPasswordFill, RiFileUserLine } from 'react-icons/ri';
import { HiX } from 'react-icons/hi';
import Headline from '@/components/Headline';

type TProps = {
	name: string;
	errors: Array<string>;
	status: EnumStatus;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onChange: (event: React.FormEvent<HTMLFormElement>) => void;
	onChangeMode: () => void;
};

const SignUp = ({
	name,
	onSubmit,
	onChange,
	onChangeMode,
	errors,
	status,
}: TProps) => {
	const t = useTranslations('sign_up_page');
	return (
		<div>
			<Button
				icon={<FcGoogle size={24} />}
				className='!w-full px-6 py-3 mt-2'
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
				onSubmit={onSubmit}
				onChange={onChange}
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
							(errors.includes(AuthErrorCodes.INVALID_EMAIL) &&
								t('invalid_email')) ||
							(errors.includes(AuthErrorCodes.MISSING_EMAIL) &&
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
							(errors.includes(AuthErrorCodes.WEAK_PASSWORD) &&
								t('weak_password')) ||
							(errors.includes(AuthErrorCodes.MISSING_PASSWORD) &&
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
							errors.includes(AuthErrorCodes.INVALID_PASSWORD) &&
							t('invalid_password')
						}
					/>
				</div>

				<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto'>
					{errors.includes(AuthErrorCodes.EMAIL_EXISTS) && (
						<>
							<span className='pr-1'>{t('email_in_use')}</span>
							<Button
								onClick={onChangeMode}
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
					disabled={status === EnumStatus.LOADING}
					icon={status === EnumStatus.LOADING && <Spinner variant='primary' />}
				/>
			</form>
			<div className='mt-6'>
				<div className='text-center mx-auto space-y-2'>
					<Button
						onClick={onChangeMode}
						variant='text'
						className='text-sm text-blue-500 hover:underline dark:text-blue-400 text-center mx-auto block'
						message={t('have_account')}
					/>
				</div>
			</div>
		</div>
	);
};

const SignIn = ({
	name,
	onSubmit,
	onChange,
	onChangeMode,
	errors,
	status,
}: TProps) => {
	const t = useTranslations('sign_in_page');
	return (
		<div>
			<Button
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
				className='w-full'
				onSubmit={onSubmit}
				onChange={onChange}
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
							errors.includes(AuthErrorCodes.MISSING_EMAIL) &&
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
							errors.includes(AuthErrorCodes.MISSING_PASSWORD) &&
							t('missing_password')
						}
					/>
				</div>

				<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto'>
					{status === EnumStatus.FAILED && t('invalid_credential')}
				</p>

				<Button
					variant='primary'
					type='submit'
					className='w-full mt-6 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
					message={t('submit')}
					disabled={status === EnumStatus.LOADING}
					icon={status === EnumStatus.LOADING && <Spinner variant='primary' />}
				/>
			</form>
			<div className='mt-6'>
				<div className='text-center mx-auto space-y-2'>
					<Button
						onClick={onChangeMode}
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

function LoginView({
	headline,
	subheadline,
	name,
	params,
	onConfirm,
	onDismiss,
}: IModal<TLoginProps> & { headline?: string; subheadline?: string }) {
	const signIn = useLogin(EnumProvider.PASSWORD_SIGN_IN);
	const signUp = useLogin(EnumProvider.PASSWORD_SIGN_UP);
	const { onOpen } = useModals();
	const [isNew, setNew] = useState(params?.mode === 'new');

	useEffect(() => {
		setNew(params?.mode === 'new');
	}, [params]);

	const onSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			event.stopPropagation();

			const formData = new FormData(event.currentTarget);
			const form = event.currentTarget.name;
			let result: EnumStatus = EnumStatus.FAILED;
			if (form === 'signUp') {
				result = await signUp.onLogin({
					name: formData.get('name')?.toString(),
					email: formData.get('email')?.toString(),
					password: formData.get('password')?.toString(),
					confirmPassword: formData.get('confirm_password')?.toString(),
				});
			} else if (form === 'signIn') {
				result = await signIn.onLogin({
					email: formData.get('email')?.toString(),
					password: formData.get('password')?.toString(),
				});
			}
			if (result === EnumStatus.SUCCESS) {
				onConfirm(APP);
			}
		},
		[signIn, signUp, onConfirm],
	);

	const onToggleView = useCallback(() => {
		if (name) {
			onOpen(name, isNew ? null : { mode: 'new' }, RedirectType.replace);
		} else {
			setNew((v) => !v);
		}
	}, [onOpen, isNew, name]);

	return (
		<Modal className={'mx-auto max-w-[375px] relative'}>
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
				<SignUp
					name='signUp'
					onChange={signUp.onReset}
					onChangeMode={onToggleView}
					onSubmit={onSubmit}
					errors={signUp.errors}
					status={signUp.status}
				/>
			) : (
				<SignIn
					name='signIn'
					onChange={signIn.onReset}
					onChangeMode={onToggleView}
					onSubmit={onSubmit}
					errors={signIn.errors}
					status={signIn.status}
				/>
			)}
		</Modal>
	);
}

export default LoginView;
