'use client';
import React from 'react';
import { TiWaves } from 'react-icons/ti';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useCallback, useEffect } from 'react';
import Button from '@/components/Button';
import { SIGN_UP, APP } from '@/constants/routes';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import Input from '@/components/Controls/Form/input';
import { useTranslations } from 'next-intl';
import Modal from '@/components/Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin, EnumProvider, EnumStatus } from '@/hooks/auth';
import Spinner from '@/components/Spinner';

function SignInView({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	const t = useTranslations('sign_in_page');
	const { onLogin, onReset, status } = useLogin(EnumProvider.PASSWORD_SIGN_IN);

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

	const onSignUp = useCallback(() => {
		route.replace(SIGN_UP);
	}, []);

	return (
		<Modal className={className} {...rest}>
			<div>
				<div className='text-gray-800 dark:text-white flex justify-center mx-auto'>
					<TiWaves size={48} />
				</div>
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
					className='w-full max-w-md'
					onSubmit={onSubmit}
					onChange={onReset}
				>
					<div className='space-y-4'>
						<Input
							autoComplete='email'
							icon={<MdOutlineAlternateEmail size={24} />}
							name='email'
							type='email'
							placeholder={t('email')}
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
						icon={
							status === EnumStatus.LOADING && <Spinner variant='primary' />
						}
					/>
				</form>
				<div className='mt-6'>
					<div className='text-center mx-auto space-y-2'>
						<Button
							onClick={onSignUp}
							variant='text'
							className='text-sm text-blue-500 hover:underline dark:text-blue-400 text-center mx-auto block'
							message={t('dont_have_account')}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default SignInView;
