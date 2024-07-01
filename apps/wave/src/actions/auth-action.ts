'use server';

import { redirect } from 'next/navigation';
import { signAuth } from '~lib/jwt';
import { signinSchema, signupSchema } from '~lib/validation';
import * as ErrorCodes from '~errorCodes';
import { IResponse } from '~types';
import { cookies } from 'next/headers';
import googleOAuthClient from '~lib/googleOAuth';
import { getUser, updateUser } from '~models/user';
import { start } from '~models/start';
import { sessionCookie, refreshCookie, trailCookie } from '~utils/cookies';
import { EnumApiRoutes, EnumResponseStatus } from '~enums';
import { parseError, doError } from '~utils';
import * as Yup from 'yup';

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

export async function signInWithEmailAndPassword(
	formData: FormData
): Promise<IResponse> {
	try {
		const { email, password } = {
			email: (formData.get('email')?.toString() || '').trim().toLowerCase(),
			password: (formData.get('password')?.toString() || '').trim(),
		};

		await signinSchema.validate(
			{
				email,
				password,
			},
			{ abortEarly: false, disableStackTrace: true, strict: true }
		);

		const result = await getUser({ login: email, password });

		if (result) {
			await updateUser(result.uuid, { lastLoginAt: new Date() });
			cookies().set(sessionCookie(result));
			cookies().set(trailCookie('1'));
			cookies().set(refreshCookie(result));
			return { status: EnumResponseStatus.SUCCESS };
		}

		throw new Yup.ValidationError(ErrorCodes.CREDENTIAL_MISMATCH);
	} catch (error) {
		const parsedError = parseError(error);
		console.log('ERROR', parsedError);
		return { status: EnumResponseStatus.FAILED, error: parsedError };
	}
}

export async function signUpWithEmailAndPassword(
	formData: FormData
): Promise<IResponse> {
	try {
		const { name, email, password, confirmPassword } = {
			name: (formData.get('name')?.toString() || '').trim(),
			email: (formData.get('email')?.toString() || '').trim().toLowerCase(),
			password: (formData.get('password')?.toString() || '').trim(),
			confirmPassword: (
				formData.get('confirm_password')?.toString() || ''
			).trim(),
		};
		const invalid = validate([
			{ value: email, key: 'email' },
			{ value: password, key: 'password' },
		]);
		if (password !== confirmPassword || !confirmPassword) {
			invalid.push(ErrorCodes.INVALID_PASSWORD);
		}
		if (invalid.length) {
			throw doError(invalid.join(','));
		}

		const { user } = await start({
			email: email,
			emailVerified: false,
			name: name,
			password: password,
		});

		if (!user) throw doError(ErrorCodes.WENT_WRONG);
		await updateUser(user.uuid, { lastLoginAt: new Date() });
		cookies().set(sessionCookie(user));
		cookies().set(trailCookie('1'));
		cookies().set(refreshCookie(user));
		// TODO if user has project redirect to project page
		// TODO if user has invitations redirect to invitations page
		return { status: EnumResponseStatus.SUCCESS };
	} catch (error) {
		let newError = error as Error;
		// @ts-expect-error error could be anything
		if (error?.constraint === 'users_email_unique') {
			newError = new Error('Email already exists', {
				cause: { code: ErrorCodes.EMAIL_EXISTS },
			});
		}

		console.log('ERROR', newError);
		return { status: EnumResponseStatus.FAILED, error: parseError(newError) };
	}
}
