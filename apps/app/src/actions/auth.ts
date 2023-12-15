'use server';
import { redirect } from 'next/navigation';
import { sign } from '@/lib/jwt';
import { validate } from '@/utils/validation';
import ErrorCodes from '@/errorCodes';
import { TError } from '@/types/auth';
import { EnumStatus } from '@/types/status';
import { cookies } from 'next/headers';
import googleOAuthClient from '@/lib/googleOAuth';
import * as user from '@/models/user';
import { sessionCookie, refreshCookie, trailCookie } from '@/utils/cookies';
import { API } from '@/routes';

type Response = {
	status: EnumStatus;
	error?: TError;
};

function getError(error: any): TError {
	return {
		code: String(error?.code || error?.cause?.code || 'unknown'),
		message: String(error.message || ''),
	};
}

export async function signOut() {
	cookies().set(sessionCookie(null));
	cookies().set(refreshCookie(null));
	return { status: EnumStatus.SUCCESS, user: null };
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
			state: sign(
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
): Promise<Response> {
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

		const result = await user.getUser({ email, password });

		if (!!result) {
			await user.updateUser(result.uuid, { last_login_at: new Date() });
			cookies().set(sessionCookie(result));
			cookies().set(trailCookie('1'));
			cookies().set(refreshCookie(result));
			return { status: EnumStatus.SUCCESS };
		} else {
			throw { code: ErrorCodes.CREDENTIAL_MISMATCH };
		}
	} catch (error) {
		console.log('ERROR', error);
		return { status: EnumStatus.FAILED, error: getError(error) };
	}
}

export async function signUpWithEmailAndPassword(
	formData: FormData,
): Promise<Response> {
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

		const result = await user.createUser({
			email,
			password,
			name,
			email_verified: false,
		});

		if (!!result) {
			await user.updateUser(result.uuid, { last_login_at: new Date() });
			//Add the cookie to the browser
			cookies().set(sessionCookie(result));
			cookies().set(trailCookie('1'));
			cookies().set(refreshCookie(result));
			return { status: EnumStatus.SUCCESS };
		} else {
			throw { code: ErrorCodes.WENT_WRONG };
		}
	} catch (error) {
		const er = error as unknown as any;
		if (er.constraint === 'users_email_unique') {
			error = {
				code: ErrorCodes.EMAIL_EXISTS,
				message: 'Email already exists',
			};
		}

		console.log('ERROR', error);
		return { status: EnumStatus.FAILED, error: getError(error) };
	}
}
