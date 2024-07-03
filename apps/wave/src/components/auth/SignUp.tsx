'use client';

import * as Form from '@radix-ui/react-form';
import { useEffect } from 'react';
import {
	EnumOAuthProvider,
	EnumProtectedRoutes,
	EnumResponseStatus,
} from '~/constants/enums';
import { useTranslations } from 'next-intl';
import OAuthForm from './OAuthForm';
import GoogleIcon from '~/icons/GoogleIcon';
import { Box } from '../layout';
import { Button } from '~/components/buttons/Button';
import Input from '~/components/form/Input';
import SpanBlock from '~/components/richText/SpanBlock';
import { useAction } from '~/hooks/action';
import { signUpWithEmailAndPassword } from '~/actions/auth-action';
import Spinner from '~/components/spinner';
import ErrorCopy from '~/components/errors/ErrorCopy';
import * as ErrorCodes from '~/constants/errorCodes';

function ButtonBlockHOC(onClick: (() => void) | undefined) {
	const ButtonBlock = (chunks: React.ReactNode) => (
		<button
			onClick={onClick}
			type='button'
			className='text-blue-2 dark:text-blue-1 underline'
		>
			{chunks}
		</button>
	);
	return ButtonBlock;
}

function SignIn({
	changeMode,
	confirm,
}: {
	changeMode?: () => void;
	confirm: () => void;
}) {
	const t = useTranslations();
	const { action, submit, reset, pending, result } = useAction(
		signUpWithEmailAndPassword
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
					{t('page.sign_up.with_google')}
				</OAuthForm>
			</Box>
			<div className='my-4 flex items-center justify-between'>
				<span className='border-stroke w-1/5 border-b' />

				<p className='text-secondary-text text-center text-sm'>
					{t('page.sign_up.with_login')}
				</p>

				<span className='border-stroke w-1/5 border-b' />
			</div>
			<Form.Root
				className='gap-4'
				action={action}
				onChange={reset}
				onSubmit={submit}
			>
				<Input name='name' label={t('form.name')} />
				<Input
					serverInvalid={
						errorCodes?.includes(ErrorCodes.MISSING_LOGIN) ||
						errorCodes?.includes(ErrorCodes.INVALID_LOGIN)
					}
					name='login'
					label={t('form.login')}
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
						errorCodes?.includes(ErrorCodes.WEAK_PASSWORD)
					}
					name='password'
					label={t('form.password')}
					type='password'
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
							forceMatch: errorCodes?.includes(ErrorCodes.WEAK_PASSWORD),
							children: t('error.weak_password'),
						},
					]}
				/>
				<Input
					serverInvalid={
						errorCodes?.includes(ErrorCodes.MISSING_PASSWORD) ||
						errorCodes?.includes(ErrorCodes.INVALID_PASSWORD)
					}
					name='confirm_password'
					label={t('form.confirm_password')}
					type='password'
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
							children: t('error.passwords_not_match'),
						},
					]}
				/>

				<input type='hidden' name='langs' value={navigator.languages} />
				<input
					type='hidden'
					name='timezone'
					value={Intl.DateTimeFormat().resolvedOptions().timeZone}
				/>

				<ErrorCopy
					className='my-6'
					codes={errorCodes}
					list={{
						[ErrorCodes.INVALID_EMAIL]: false,
						[ErrorCodes.MISSING_EMAIL]: false,
						[ErrorCodes.WEAK_PASSWORD]: false,
						[ErrorCodes.MISSING_PASSWORD]: false,
						[ErrorCodes.INVALID_PASSWORD]: false,
						[ErrorCodes.LOGIN_EXISTS]: t.rich('error.login_in_use_rt', {
							button: ButtonBlockHOC(changeMode),
						}),
					}}
				/>

				<Form.Submit asChild>
					<Button
						type='submit'
						variant='primary'
						message={t('page.sign_up.submit')}
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
					{t.rich('page.sign_up.have_account_rt', {
						span: SpanBlock,
					})}
				</Button>
			</Box>
		</Box>
	);
}

export default SignIn;
