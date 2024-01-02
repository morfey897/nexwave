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
import { RiLockPasswordFill, RiFileUserLine } from 'react-icons/ri';
import {
	signUpWithEmailAndPassword,
} from '@/actions/auth';
import { APP } from '@/routes';

import { useAction } from '@/hooks/action';
import { EnumStatus } from '@/types/status';

const SignUp = ({
	name,
	changeMode,
	confirm,
}: {
	name: string;
	changeMode: () => void;
	confirm: () => void;
}) => {
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

export default SignUp;
