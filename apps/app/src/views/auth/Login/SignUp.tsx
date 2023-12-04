'use client';

import React from 'react';
import { TiWaves } from 'react-icons/ti';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import {
	RiLockPasswordLine,
	RiLockPasswordFill,
	RiFileUserLine,
} from 'react-icons/ri';
import { useCallback, useEffect } from 'react';
import Button from '@/components/Button';
import { APP, SIGN_IN } from '@/constants/routes';
import { FcGoogle } from 'react-icons/fc';
import { AuthErrorCodes } from 'firebase/auth';
import Input from '@/components/Controls/Form/input';
import { useTranslations } from 'next-intl';
import Spinner from '@/components/Spinner';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import { useLogin, EnumProvider, EnumStatus } from '@/hooks/auth';

function SignUpView({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	const t = useTranslations('sign_up_page');
	const { onLogin, onReset, status, errors } = useLogin(
		EnumProvider.PASSWORD_SIGN_UP,
	);

	const route = useRouter();

	const onSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			event.stopPropagation();

			const formData = new FormData(event.currentTarget);
			const result = await onLogin({
				email: formData.get('email')?.toString(),
				password: formData.get('password')?.toString(),
				confirmPassword: formData.get('confirm_password')?.toString(),
				name: formData.get('name')?.toString(),
			});
			if (result === EnumStatus.SUCCESS) {
				route.push(APP);
			}
		},
		[onLogin],
	);

	const onSignIn = useCallback(() => {
		route.replace(SIGN_IN);
	}, []);

	return (
		<Modal className={className} {...rest}>
			<div>
				<div className='text-gray-800 dark:text-white flex justify-center mx-auto'>
					<TiWaves size={48} />
				</div>
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
					onChange={onReset}
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
								errors.includes(AuthErrorCodes.INVALID_EMAIL) &&
								t('invalid_email')
							}
						/>

						<Input
							required
							icon={<RiLockPasswordLine size={24} />}
							name='password'
							type='password'
							placeholder={t('password')}
							errorCopy={
								errors.includes(AuthErrorCodes.WEAK_PASSWORD) &&
								t('weak_password')
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
									onClick={onSignIn}
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
						icon={
							status === EnumStatus.LOADING && <Spinner variant='primary' />
						}
					/>
				</form>
				<div className='mt-6'>
					<div className='text-center mx-auto space-y-2'>
						<Button
							onClick={onSignIn}
							variant='text'
							className='text-sm text-blue-500 hover:underline dark:text-blue-400 text-center mx-auto block'
							message={t('have_account')}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default SignUpView;
