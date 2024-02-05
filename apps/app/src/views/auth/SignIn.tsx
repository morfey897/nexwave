'use client';
import React, { useEffect } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Button from '@/components/Button';
import OAuthButton from '@/components/Button/OAuthButton';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '@/components/Controls/Form';
import { useTranslations } from 'next-intl';
import Spinner from '@/components/Spinner';
import * as ErrorCodes from '@/errorCodes';
import { signInWithEmailAndPassword } from '@/actions/auth-action';
import { APP } from '@/routes';

import { useAction } from '@/hooks/action';
import { EnumResponse } from '@/enums';

const SignIn = ({
	name,
	changeMode,
	confirm,
}: {
	name: string;
	changeMode: () => void;
	confirm: () => void;
}) => {
	const { action, submit, reset, pending, result } = useAction(
		signInWithEmailAndPassword,
	);
	const t = useTranslations();

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS) {
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
				message={t('page.sign_in.with_google')}
			/>
			<div className='flex items-center justify-between my-4'>
				<span className='w-1/5 border-b dark:border-gray-600'></span>

				<p className='text-sm text-center text-gray-500 dark:text-gray-400'>
					{t('page.sign_in.with_email')}
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
						hidePlaceholder
						autoComplete='email'
						icon={<MdOutlineAlternateEmail size={24} />}
						name='email'
						type='email'
						placeholder={t('form.email')}
						errorCopy={
							result?.error?.code?.includes(ErrorCodes.MISSING_EMAIL) &&
							t('error.missing_email')
						}
					/>

					<Input
						hidePlaceholder
						hint={
							<div className='flex justify-end'>
								<Button
									variant='text'
									message={t('page.sign_in.forgot_password')}
									className='text-center text-xs text-blue-500 hover:underline dark:text-blue-400 !p-0 mt-1'
								/>
							</div>
						}
						icon={<RiLockPasswordLine size={24} />}
						name='password'
						type='password'
						placeholder={t('form.password')}
						errorCopy={
							result?.error?.code?.includes(ErrorCodes.MISSING_PASSWORD) &&
							t('error.missing_password')
						}
					/>
				</div>

				<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto'>
					{result?.status === EnumResponse.FAILED &&
						t('error.invalid_email_or_pass')}
				</p>

				<Button
					variant='primary'
					type='submit'
					className='w-full mt-6 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
					message={t('button.sign_in')}
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
						message={t('page.sign_in.dont_have_account')}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
