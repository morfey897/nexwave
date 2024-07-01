'use client';

import * as Form from '@radix-ui/react-form';
import { useEffect } from 'react';
import {
	EnumOAuthProvider,
	EnumProtectedRoutes,
	EnumResponseStatus,
} from '~constants/enums';
import { useTranslations } from 'next-intl';
import OAuthForm from './OAuthForm';
import GoogleIcon from '~root/icons/GoogleIcon';
import { Box } from '../layout';
import Button from '~components/buttons/Button';
import Input from '~components/form/Input';
import SpanBlock from '~components/richText/SpanBlock';
import { useAction } from '~hooks/action';
import { signUpWithEmailAndPassword } from '~actions/auth-action';
import Spinner from '~components/spinner';

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
					{t('page.sign_up.with_email')}
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
					label={t('form.name')}
					required
					messages={[
						{
							name: 'valueMissing',
							match: 'typeMismatch',
							children: 'Please enter your email',
						},
						{
							name: 'typeMismatch',
							match: 'typeMismatch',
							children: 'Please provide a valid email',
						},
					]}
				/>
				<Input
					label={t('form.email')}
					type='email'
					required
					messages={[
						{
							name: 'valueMissing',
							match: 'typeMismatch',
							children: 'Please enter your email',
						},
						{
							name: 'typeMismatch',
							match: 'typeMismatch',
							children: 'Please provide a valid email',
						},
					]}
				/>
				<Input
					label={t('form.password')}
					type='password'
					required
					messages={[
						{
							name: 'valueMissing',
							match: 'typeMismatch',
							children: 'Please enter your email',
						},
						{
							name: 'typeMismatch',
							match: 'typeMismatch',
							children: 'Please provide a valid email',
						},
					]}
				/>
				<Input
					label={t('form.confirm_password')}
					type='password'
					required
					messages={[
						{
							name: 'valueMissing',
							match: 'typeMismatch',
							children: 'Please enter your email',
						},
						{
							name: 'typeMismatch',
							match: 'typeMismatch',
							children: 'Please provide a valid email',
						},
					]}
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
