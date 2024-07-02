'use client';

import * as Form from '@radix-ui/react-form';
import {
	EnumOAuthProvider,
	EnumProtectedRoutes,
	EnumResponseStatus,
} from '~constants/enums';
import { useTranslations } from 'next-intl';
import OAuthForm from './OAuthForm';
import GoogleIcon from '~root/icons/GoogleIcon';
import { Box } from '../layout';
import { Button } from '~components/buttons/Button';
import Input from '~components/form/Input';
import SpanBlock from '~components/richText/SpanBlock';
import { useAction } from '~hooks/action';
import { signInWithLoginAndPassword } from '~actions/auth-action';
import { useEffect } from 'react';
import Spinner from '../spinner';
import * as ErrorCodes from '~errorCodes';
import ErrorCopy from '~components/errors/ErrorCopy';

function SignIn({
	changeMode,
	confirm,
}: {
	changeMode?: () => void;
	confirm: () => void;
}) {
	const t = useTranslations();
	const { action, submit, reset, pending, result } = useAction(
		signInWithLoginAndPassword
	);

	const errorCodes = result?.error?.code;

	useEffect(() => {
		if (result?.status === EnumResponseStatus.SUCCESS) {
			confirm();
		}
	}, [result, confirm]);

	return (
		<Box>
			<Box className='mt-4 w-full'>
				<OAuthForm
					redirectTo={EnumProtectedRoutes.APP}
					provider={EnumOAuthProvider.GOOGLE}
					buttonProps={{
						icon: <GoogleIcon />,
						disabled: pending,
					}}
				>
					{t('page.sign_in.with_google')}
				</OAuthForm>
			</Box>
			<div className='my-4 flex items-center justify-between'>
				<span className='border-stroke w-1/5 border-b' />

				<p className='text-secondary-text text-center text-sm'>
					{t('page.sign_in.with_email')}
				</p>

				<span className='border-stroke w-1/5 border-b' />
			</div>
			<Form.Root
				className='gap-4'
				action={action}
				onChange={reset}
				onSubmit={submit}
			>
				<Input
					serverInvalid={
						errorCodes?.includes(ErrorCodes.MISSING_LOGIN) ||
						errorCodes?.includes(ErrorCodes.INVALID_LOGIN)
					}
					label={t('form.login')}
					name='login'
					required
					messages={[
						{
							name: 'valueMissing',
							match: 'valueMissing',
							forceMatch: errorCodes?.includes(ErrorCodes.MISSING_LOGIN),
							children: t('error.missing_login'),
						},
						{
							name: 'typeMismatch',
							match: 'typeMismatch',
							forceMatch: errorCodes?.includes(ErrorCodes.INVALID_LOGIN),
							children: t('error.invalid_login'),
						},
					]}
				/>
				<Input
					serverInvalid={
						errorCodes?.includes(ErrorCodes.MISSING_PASSWORD) ||
						errorCodes?.includes(ErrorCodes.INVALID_PASSWORD)
					}
					label={t('form.password')}
					type='password'
					name='password'
					required
					messages={[
						{
							name: 'valueMissing',
							match: 'valueMissing',
							forceMatch: errorCodes?.includes(ErrorCodes.MISSING_PASSWORD),
							children: t('error.missing_password'),
						},
						{
							name: 'typeMismatch',
							match: 'typeMismatch',
							forceMatch: errorCodes?.includes(ErrorCodes.INVALID_PASSWORD),
							children: t('error.invalid_password'),
						},
					]}
				/>

				<ErrorCopy
					className='my-6'
					codes={errorCodes}
					list={{
						[ErrorCodes.INVALID_LOGIN]: false,
						[ErrorCodes.MISSING_LOGIN]: false,
						[ErrorCodes.INVALID_PASSWORD]: false,
						[ErrorCodes.MISSING_PASSWORD]: false,
					}}
				/>

				<Form.Submit asChild>
					<Button
						type='submit'
						variant='primary'
						message={t('page.sign_in.submit')}
						disabled={pending}
						icon={pending ? <Spinner /> : undefined}
					/>
				</Form.Submit>
			</Form.Root>

			<Box className='mt-4'>
				<Button
					onClick={changeMode}
					variant='text'
					className='gap-2'
					disabled={pending}
				>
					{t.rich('page.sign_in.dont_have_account_rt', {
						span: SpanBlock,
					})}
				</Button>
			</Box>
		</Box>
	);
}

export default SignIn;
