'use server';

import { redirect } from 'next/navigation';
import { signAuth } from '~lib/jwt';
import { signinSchema, signupSchema } from '~lib/validation';
import * as ErrorCodes from '~errorCodes';
import { IResponse } from '~types';
import { cookies } from 'next/headers';
import googleOAuthClient from '~lib/googleOAuth';
import { ICurrentUser, getUser, updateUser } from '~models/user';
import { start } from '~models/start';
import { sessionCookie, refreshCookie, trailCookie } from '~utils/cookies';
import { EnumApiRoutes, EnumResponseStatus } from '~enums';
import { parseError, doError } from '~utils';
import * as Yup from 'yup';
import { COOKIES } from '@nw/config';

async function updateUserLoginMetadata(
	user: ICurrentUser | null,
	method: string = 'password'
) {
	if (!user) return null;
	const result = await updateUser(user.id, {
		loginMetadata: {
			ip: '',
			device: cookies().get(COOKIES.DEVICE)?.value || '',
			method,
			timestamp: Date.now(),
		},
	});
	if (!result) return null;
	cookies().set(sessionCookie(result));
	cookies().set(trailCookie('1'));
	cookies().set(refreshCookie(result));
	return result;
}

export async function signOut() {
	cookies().set(sessionCookie(null));
	cookies().set(refreshCookie(null));
	return { status: EnumResponseStatus.SUCCESS, user: null };
}

export async function signInWithOauth(formData: FormData): Promise<never> {
	const redirectTo = (formData.get('redirect_to')?.toString() || '').trim();
	const provider = formData.get('provider')?.toString() || '';

	if (provider === 'google') {
		const path = new URL(
			process.env.NEXT_PUBLIC_LOCAL_DOMAIN ||
				process.env.NEXT_PUBLIC_DOMAIN ||
				''
		);

		const redirectUrl = googleOAuthClient.generateAuthUrl({
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email',
			],
			redirect_uri: new URL(
				EnumApiRoutes.AUTH_OAUTH.replace('[provider]', provider),
				path
			).toString(),
			state: signAuth(
				{
					redirect_to: redirectTo.replace(/^[\w\d]*:?\/{2}[^/]+/, ''),
					state: 'log_in',
				},
				'5m'
			),
		});

		return redirect(redirectUrl);
	}

	throw doError(ErrorCodes.INVALID_PROVIDER);
}

export async function signInWithLoginAndPassword(
	formData: FormData
): Promise<IResponse> {
	try {
		const { login, password } = {
			login: (formData.get('login')?.toString() || '').trim().toLowerCase(),
			password: (formData.get('password')?.toString() || '').trim(),
		};

		console.log('LOGIN:', login, password);

		await signinSchema.validate(
			{
				login,
				password,
			},
			{ abortEarly: false, disableStackTrace: true }
		);

		const userData = await getUser({ login, password });
		console.log('USER_DATA:', userData);
		const updatedUser = await updateUserLoginMetadata(userData);

		if (!updatedUser)
			throw new Yup.ValidationError(ErrorCodes.CREDENTIAL_MISMATCH);
		return { status: EnumResponseStatus.SUCCESS };
	} catch (error) {
		const parsedError = parseError(error);
		console.error('PARSED_ERROR:', parsedError);
		return { status: EnumResponseStatus.FAILED, error: parsedError };
	}
}

export async function signUpWithEmailAndPassword(
	formData: FormData
): Promise<IResponse> {
	try {
		const { name, login, password, confirmPassword, langs, timezone } = {
			name: (formData.get('name')?.toString() || '').trim(),
			login: (formData.get('login')?.toString() || '').trim().toLowerCase(),
			password: (formData.get('password')?.toString() || '').trim(),
			timezone: (formData.get('timezone')?.toString() || '').trim(),
			langs: (formData.get('langs')?.toString() || '').trim().split(','),
			confirmPassword: (
				formData.get('confirm_password')?.toString() || ''
			).trim(),
		};
		await signupSchema.validate(
			{
				name,
				login,
				confirmPassword,
				password,
			},
			{ abortEarly: false, disableStackTrace: true }
		);

		const user = await start({
			login,
			name,
			password,
			timezone,
			langs,
		});

		const updatedUser = await updateUserLoginMetadata(user);
		if (!updatedUser) throw new Yup.ValidationError(ErrorCodes.WENT_WRONG);

		return { status: EnumResponseStatus.SUCCESS };
	} catch (error) {
		// let newError = error as Error;
		// // @ts-expect-error error could be anything
		// if (error?.constraint === 'users_email_unique') {
		// 	newError = new Error('Email already exists', {
		// 		cause: { code: ErrorCodes.EMAIL_EXISTS },
		// 	});
		// }

		console.log('ERROR:', error);

		const parsedError = parseError(error);

		console.log('PARSED_ERROR', parsedError);
		return { status: EnumResponseStatus.FAILED, error: parsedError };
	}
}
