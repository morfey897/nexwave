'use client';

import React from 'react';
import { TiWaves } from 'react-icons/ti';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import {
	RiLockPasswordLine,
	RiLockPasswordFill,
	RiFileUserLine,
} from 'react-icons/ri';
import { useCallback } from 'react';
import { signUpWithEmailAndPassword } from '@/lib/firebase';
import Button from '@/components/Button';
import Link from 'next/link';
import { SIGN_IN } from '@/constants/routes';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { AuthErrorCodes } from 'firebase/auth';
import Input from '@/components/Controls/Form/input';
import { useTranslations } from 'next-intl';
import Spinner from '@/components/Spinner';
import { EnumStatus } from '@/types/firebase';
import clsx from 'clsx';

function SignUpView({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	const t = useTranslations('sign_up_page');
	const [loading, setLoading] = useState(false);
	const [invalid, setInvalid] = useState<Array<string>>([]);

	const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const formData = new FormData(event.currentTarget);
		setLoading(true);

		signUpWithEmailAndPassword({
			email: formData.get('email')?.toString(),
			password: formData.get('password')?.toString(),
			confirmPassword: formData.get('confirm_password')?.toString(),
			name: formData.get('name')?.toString(),
		})
			.then(({ status, error, user }) => {
				if (status === EnumStatus.FAILED) {
					setInvalid(error?.code?.split(',') || []);
				} else {
					console.log('user', user);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const onChange = useCallback((event: React.FormEvent<HTMLFormElement>) => {
		setInvalid([]);
	}, []);

	return (
		<div className={clsx('max-w-[375px] w-full bg-gray-100 dark:bg-gray-900', className)} {...rest}>
			<div className='px-12 py-4 rounded-lg border shadow dark:border-gray-600'>
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
						onChange={onChange}
					>
						<div className='space-y-4'>
							<Input
								icon={<RiFileUserLine size={24} />}
								name='name'
								type='text'
								placeholder={t('name')}
							/>
							<Input
								required
								icon={<MdOutlineAlternateEmail size={24} />}
								name='email'
								type='email'
								placeholder={t('email')}
								errorCopy={
									invalid.includes(AuthErrorCodes.INVALID_EMAIL) &&
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
									invalid.includes(AuthErrorCodes.WEAK_PASSWORD) &&
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
									invalid.includes(AuthErrorCodes.INVALID_PASSWORD) &&
									t('invalid_password')
								}
							/>
						</div>

						<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto'>
							{invalid.includes(AuthErrorCodes.EMAIL_EXISTS) && (
								<>
									<span className='pr-1'>{t('email_in_use')}</span>
									<Link
										href={SIGN_IN}
										className='text-sm text-blue-500 hover:underline dark:text-blue-400'
									>
										{t('sign_in')}
									</Link>
								</>
							)}
						</p>

						<Button
							variant='primary'
							type='submit'
							className='w-full mt-6 px-6 py-3'
							message={t('submit')}
							disabled={loading}
							icon={loading && <Spinner variant='primary' />}
						/>
					</form>
					<div className='mt-6'>
						<div className='text-center mx-auto space-y-2'>
							<Link
								href={SIGN_IN}
								className='text-sm text-blue-500 hover:underline dark:text-blue-400 text-center mx-auto block'
							>
								{t('have_account')}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUpView;
