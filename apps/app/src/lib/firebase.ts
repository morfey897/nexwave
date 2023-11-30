'use client';
import * as app from 'firebase/app';
import * as Auth from 'firebase/auth';
import * as validation from '@/utils/validation';
import { TError, TSignIn, EnumStatus } from '@/types/firebase';
import { ca } from 'date-fns/locale';

const firebaseConfig: app.FirebaseOptions = JSON.parse(
	process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS || '{}',
);

function getApp() {
	let instance = app.getApps()[0];
	if (!!instance) {
		console.log('From cache');
		return instance;
	}
	console.log('New app');
	return app.initializeApp(firebaseConfig);
}

function getError(error: any): TError {
	return {
		code: String(error?.code || error?.cause?.code || 'unknown'),
		message: String(error.message || ''),
	};
}

function validate(props: Array<{ value: any; key: 'email' | 'password' }>) {
	return props.reduce((prev: Array<string>, { value, key }) => {
		switch (key) {
			case 'email': {
				if (!validation.isEmail(value)) {
					prev.push(Auth.AuthErrorCodes.INVALID_EMAIL);
				}
				break;
			}
			case 'password': {
				if (!validation.isPassword(value)) {
					prev.push(Auth.AuthErrorCodes.WEAK_PASSWORD);
				}
			}
		}
		return prev;
	}, []);
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
	const app = getApp();
	const auth = Auth.getAuth(app);

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
				console.warn(error);
			}
		}

		const verified = userCredential.user.emailVerified;

		if (!verified) {
			try {
				auth.languageCode = 'ru';
				await Auth.sendEmailVerification(userCredential.user);
			} catch (error: any) {
				console.warn(error);
			}
		}
		return {
			status: verified ? EnumStatus.VERIFIED : EnumStatus.UNVERIFIED,
			user: userCredential.user,
		};
	} catch (error: any) {
		return { status: EnumStatus.FAILED, error: getError(error) };
	}
}

export async function signInWithEmailAndPassword({
	email,
	password,
}: {
	email?: string;
	password?: string;
}): Promise<TSignIn> {
	const app = getApp();
	const auth = Auth.getAuth(app);

	try {
		const userCredential = await Auth.signInWithEmailAndPassword(
			auth,
			email || '',
			password || '',
		);
		const verified = userCredential.user.emailVerified;
		return {
			status: verified ? EnumStatus.VERIFIED : EnumStatus.UNVERIFIED,
			user: userCredential.user,
		};
	} catch (error: any) {
		return { status: EnumStatus.FAILED, error: getError(error) };
	}
}

export async function signOut(): Promise<TSignIn> {
	const app = getApp();
	const auth = Auth.getAuth(app);
	try {
		await auth.signOut();
		return { status: EnumStatus.SUCCESS };
	} catch (error: any) {
		return { status: EnumStatus.FAILED, error: getError(error) };
	}
}
