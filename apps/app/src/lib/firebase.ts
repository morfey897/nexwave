'use client';
import * as app from 'firebase/app';
import * as Auth from 'firebase/auth';
import { validate } from '@/utils/validation';
import { TError, TSignIn, EnumSignIn } from '@/types/firebase';

const firebaseConfig: app.FirebaseOptions = JSON.parse(
	process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS || '{}',
);

function getError(error: any): TError {
	return {
		code: String(error?.code || error?.cause?.code || 'unknown'),
		message: String(error.message || ''),
	};
}

export function getApp() {
	return app.getApps()[0] || app.initializeApp(firebaseConfig);
}

export function getAuth() {
	const app = getApp();
	return Auth.getAuth(app);
}

export async function signUpWithEmailAndPassword({
	email,
	password,
	confirmPassword,
	name,
}: {
	email?: string;
	password?: string;
	confirmPassword?: string;
	name?: string;
}): Promise<TSignIn> {
	const auth = getAuth();

	try {
		const invalid = validate([
			{ value: email, key: 'email' },
			{ value: password, key: 'password' },
		]);
		if (password !== confirmPassword || !confirmPassword) {
			invalid.push(Auth.AuthErrorCodes.INVALID_PASSWORD);
		}
		if (invalid.length) {
			throw { code: invalid.join(',') };
		}
		const userCredential = await Auth.createUserWithEmailAndPassword(
			auth,
			email || '',
			password || '',
		);

		if (userCredential.user && name) {
			try {
				await Auth.updateProfile(userCredential.user, {
					displayName: name,
				});
			} catch (error: any) {
				console.warn('Error updating profile', error);
			}
		}

		const verified = userCredential.user.emailVerified;

		if (!verified) {
			try {
				// TODO: set language code
				// auth.languageCode = 'ru';
				await Auth.sendEmailVerification(userCredential.user);
			} catch (error: any) {
				console.warn('Error sending email verification', error);
			}
		}
		return {
			status: verified ? EnumSignIn.VERIFIED : EnumSignIn.UNVERIFIED,
			user: userCredential.user,
		};
	} catch (error: any) {
		return { status: EnumSignIn.FAILED, error: getError(error) };
	}
}

export async function signInWithEmailAndPassword({
	email,
	password,
}: {
	email?: string;
	password?: string;
}): Promise<TSignIn> {
	const auth = getAuth();

	try {
		const invalid = validate([
			{ value: email, key: 'email' },
			{ value: password, key: 'password' },
		]);
		if (invalid.length) {
			throw { code: invalid.join(',') };
		}
		const userCredential = await Auth.signInWithEmailAndPassword(
			auth,
			email || '',
			password || '',
		);
		const verified = userCredential.user.emailVerified;
		return {
			status: verified ? EnumSignIn.VERIFIED : EnumSignIn.UNVERIFIED,
			user: userCredential.user,
		};
	} catch (error: any) {
		return { status: EnumSignIn.FAILED, error: getError(error) };
	}
}

export async function signOut(): Promise<TSignIn> {
	const auth = getAuth();
	try {
		await auth.signOut();
		return { status: EnumSignIn.SUCCESS };
	} catch (error: any) {
		return { status: EnumSignIn.FAILED, error: getError(error) };
	}
}
