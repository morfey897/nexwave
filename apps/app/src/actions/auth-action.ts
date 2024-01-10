'use server';
import { redirect } from 'next/navigation';
import { signAuth } from '@/lib/jwt';
import { validate } from '@/utils/validation';
import * as ErrorCodes from '@/errorCodes';
import { IResponse } from '@/types';
import { EnumResponse } from '@/enums';
import { cookies } from 'next/headers';
import googleOAuthClient from '@/lib/googleOAuth';
import * as users from '@/models/user';
import { start } from '@/models/start';
import { sessionCookie, refreshCookie, trailCookie } from '@/utils/cookies';
import { API } from '@/routes';
import { getError } from '@/utils';

export async function signOut() {
	cookies().set(sessionCookie(null));
	cookies().set(refreshCookie(null));
	return { status: EnumResponse.SUCCESS, user: null };
}

export async function signInWithOauth(formData: FormData): Promise<never> {
	const redirect_to = (formData.get('redirect_to')?.toString() || '').trim();
	const provider = formData.get('provider')?.toString() || '';

	if (provider === 'google') {
		const path = new URL(
			process.env.NEXT_PUBLIC_LOCAL_DOMAIN ||
				process.env.NEXT_PUBLIC_DOMAIN ||
				'',
		);

		const redirectUrl = googleOAuthClient.generateAuthUrl({
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email',
			],
			redirect_uri: new URL(
				API.AUTH_OAUTH.replace('[provider]', provider),
				path,
			).toString(),
			state: signAuth(
				{
					redirect_to: redirect_to.replace(/^[\w\d]*:?\/{2}[^\/]+/, ''),
					state: 'log_in',
				},
				'5m',
			),
		});

		return redirect(redirectUrl);
	}

	throw new Error('Invalid provider');
}

export async function signInWithEmailAndPassword(
	formData: FormData,
): Promise<IResponse> {
	try {
		const { email, password } = {
			email: (formData.get('email')?.toString() || '').trim().toLowerCase(),
			password: (formData.get('password')?.toString() || '').trim(),
		};
		const invalid = validate([
			{ value: email, key: 'email' },
			{ value: password, key: 'password' },
		]);
		if (invalid.length) {
			throw { code: invalid.join(',') };
		}

		const result = await users.getUser({ email, password });

		if (!!result) {
			await users.updateUser(result.uuid, { lastLoginAt: new Date() });
			cookies().set(sessionCookie(result));
			cookies().set(trailCookie('1'));
			cookies().set(refreshCookie(result));
			return { status: EnumResponse.SUCCESS };
		} else {
			throw { code: ErrorCodes.CREDENTIAL_MISMATCH };
		}
	} catch (error) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: getError(error) };
	}
}

export async function signUpWithEmailAndPassword(
	formData: FormData,
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
			throw { code: invalid.join(',') };
		}

		const { user } = await start({
			email: email,
			emailVerified: false,
			name: name,
			password: password,
		});

		if (!user) {
			throw { code: ErrorCodes.WENT_WRONG };
		}
		await users.updateUser(user.uuid, { lastLoginAt: new Date() });
		cookies().set(sessionCookie(user));
		cookies().set(trailCookie('1'));
		cookies().set(refreshCookie(user));
		//TODO if user has project redirect to project page
		//TODO if user has invitations redirect to invitations page
		return { status: EnumResponse.SUCCESS };
	} catch (error) {
		const er = error as unknown as any;
		if (er.constraint === 'users_email_unique') {
			error = {
				code: ErrorCodes.EMAIL_EXISTS,
				message: 'Email already exists',
			};
		}

		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: getError(error) };
	}
}
