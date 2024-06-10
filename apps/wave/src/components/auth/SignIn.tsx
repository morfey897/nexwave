'use client';
import React, { useEffect } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Button from '~components/buttons';
import OAuthButton from './OAuthButton';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '~components/controls/Form';
import { useTranslations } from 'next-intl';
import Spinner from '~components/spinner';
import * as ErrorCodes from '~errorCodes';
import { signInWithEmailAndPassword } from '~actions/auth-action';
import { EnumProtectedRoutes } from '~constants/enums';

import { useAction } from '~hooks/action';
import { EnumResponseStatus } from '~enums';
import { ErrorCopy } from '~components/errors';

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
		signInWithEmailAndPassword
	);
	const t = useTranslations();

	useEffect(() => {
		if (result?.status === EnumResponseStatus.SUCCESS) {
			confirm();
		}
	}, [result, confirm]);

	return (
		<div>
			<OAuthButton
				redirect_to={EnumProtectedRoutes.APP}
				provider='google'
				disabled={pending}
				icon={<FcGoogle size={24} />}
				className='mt-2 w-full px-6 py-3'
				message={t('page.sign_in.with_google')}
			/>
			<div className='my-4 flex items-center justify-between'>
				<span className='w-1/5 border-b dark:border-gray-600'></span>

				<p className='text-center text-sm text-gray-500 dark:text-gray-400'>
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
									className='mt-1 !p-0 text-center text-xs text-blue-500 hover:underline dark:text-blue-400'
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

				<ErrorCopy
					className='mt-6'
					code={result?.error?.code}
					codes={{
						[ErrorCodes.INVALID_EMAIL]: t('error.invalid_email_or_pass'),
						[ErrorCodes.INVALID_PASSWORD]: t('error.invalid_email_or_pass'),
						[ErrorCodes.MISSING_PASSWORD]: false,
						[ErrorCodes.MISSING_EMAIL]: false,
					}}
				/>

				<Button
					variant='primary'
					type='submit'
					className='mt-6 w-full transform rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
					message={t('page.sign_in.submit')}
					disabled={pending}
					icon={pending && <Spinner variant='primary' />}
				/>
			</form>
			<div className='mt-6'>
				<div className='mx-auto space-y-2 text-center'>
					<Button
						onClick={changeMode}
						variant='text'
						className='mx-auto block text-center text-sm text-blue-500 hover:underline dark:text-blue-400'
						message={t('page.sign_in.dont_have_account')}
					/>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
