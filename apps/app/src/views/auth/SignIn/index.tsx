'use client';
import React from 'react';
import { TiWaves } from 'react-icons/ti';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useCallback, useState } from 'react';
import { signInWithEmailAndPassword } from '@/lib/firebase';
import Button from '@/components/Button';
import { SIGN_UP } from '@/constants/routes';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import Input from '@/components/Controls/Form/input';
import { AuthErrorCodes } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { EnumStatus } from '@/types/firebase';
import clsx from 'clsx';

function SignInView({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	const t = useTranslations('sign_in_page');

	const [loading, setLoading] = useState(false);
	const [invalid, setInvalid] = useState<Array<string>>([]);

	const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		setLoading(true);

		signInWithEmailAndPassword({
			email: formData.get('email')?.toString(),
			password: formData.get('password')?.toString(),
		})
			.then(({ status, error, user }) => {
				if (status === EnumStatus.FAILED) {
					setInvalid(error?.code?.split(',') || []);
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
						onChange={onChange}
					>
						<div className='space-y-4'>
							<Input
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
							{invalid.length > 0 && t('invalid_credential')}
						</p>

						<Button
							variant='primary'
							type='submit'
							className='w-full mt-6 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
							message={t('submit')}
							disabled={loading}
						/>
					</form>
					<div className='mt-6'>
						<div className='text-center mx-auto space-y-2'>
							<Link
								href={SIGN_UP}
								className='text-sm text-blue-500 hover:underline dark:text-blue-400 text-center mx-auto block'
							>
								{t('dont_have_account')}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignInView;
