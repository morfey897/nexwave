'use client';
import React, { useEffect } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Button from '@/components/Button';
import OAuthButton from '@/components/Button/OAuthButton';
import { FcGoogle } from 'react-icons/fc';
import Input from '@/components/Controls/Form/input';
import { useTranslations } from 'next-intl';
import Spinner from '@/components/Spinner';
import ErrorCodes from '@/errorCodes';
import {
	signInWithEmailAndPassword,
} from '@/actions/auth';
import { APP } from '@/routes';

import { useAction } from '@/hooks/action';
import { EnumStatus } from '@/types/status';

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

export default SignIn;
