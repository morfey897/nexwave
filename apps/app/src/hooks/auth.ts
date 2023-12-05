import { useCallback, useMemo, useState } from 'react';
import {
	signUpWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	AuthErrorCodes,
} from '@/lib/firebase';
import { EnumSignIn, TSignIn } from '@/types/firebase';
import { API_AUTH_LOGIN, API_AUTH_LOGOUT } from '@/constants/routes';

export enum EnumProvider {
	PASSWORD_SIGN_IN = 'password-sign-in',
	PASSWORD_SIGN_UP = 'password-sign-up',
}

export enum EnumStatus {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'success',
	FAILED = 'failed',
}

function useHook<T>(func: (props: T) => Promise<TSignIn>) {
	const [status, setStatus] = useState(EnumStatus.IDLE);
	const [errors, setErrors] = useState<string[]>([]);

	/**
	 * Function for login
	 */
	const onLogin = useCallback(
		async (props: Parameters<typeof func>[0]) => {
			setStatus(EnumStatus.LOADING);

			try {
				const { status: requestStatus, error, user } = await func(props);
				// TODO: check status
				// if (status !== EnumStatus.LOADING)
				// 	throw new Error('Interrupted', { cause: 'interrupted' });
				if (requestStatus === EnumSignIn.FAILED || !user) {
					const errors = error?.code?.split(',') || [];
					setErrors(errors);
					setStatus(EnumStatus.FAILED);
				} else {
					const token = await user.getIdToken();
					// TODO: check status
					// if (status !== EnumStatus.LOADING)
					// 	throw new Error('Interrupted', { cause: 'interrupted' });
					const response = await fetch(API_AUTH_LOGIN, {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (response.status === 401) {
						throw new Error('Unauthorized', { cause: 'unauthorized' });
					}
					// TODO: check status
					// if (status !== EnumStatus.LOADING)
					// 	throw new Error('Interrupted', { cause: 'interrupted' });
					setStatus(EnumStatus.SUCCESS);
					return EnumStatus.SUCCESS;
				}
			} catch (error: any) {
				console.warn('Error login', error);
				if (error?.cause !== 'interrupted') {
					setStatus(EnumStatus.FAILED);
				}
			}
			return EnumStatus.FAILED;
		},
		[func],
	);

	const onReset = useCallback(() => {
		setErrors([]);
		setStatus(EnumStatus.IDLE);
	}, []);

	const memoResult = useMemo(() => {
		return {
			status,
			onLogin,
			onReset,
			errors,
		};
	}, [status, onLogin, onReset, errors]);

	return memoResult;
}

export function useLogin(provider: EnumProvider) {
	const _undefined = useHook<any>(
		(props: any) =>
			new Promise((resolve) =>
				resolve({
					status: EnumSignIn.FAILED,
					error: {
						code: AuthErrorCodes.NO_SUCH_PROVIDER,
						message: 'Undefined provider',
					},
				}),
			),
	);
	const signUpPassword = useHook<
		Parameters<typeof signUpWithEmailAndPassword>[0]
	>(signUpWithEmailAndPassword);
	const signInPassword = useHook<
		Parameters<typeof signInWithEmailAndPassword>[0]
	>(signInWithEmailAndPassword);

	switch (provider) {
		case EnumProvider.PASSWORD_SIGN_IN:
			return signInPassword;
		case EnumProvider.PASSWORD_SIGN_UP:
			return signUpPassword;
		default:
			return _undefined;
	}
}

export function useLogout() {
	/**
	 * Function for logout
	 */
	const onLogout = useCallback(async () => {
		await Promise.allSettled([
			signOut(),
			fetch(API_AUTH_LOGOUT, { method: 'POST' }),
		]);
		return EnumStatus.SUCCESS;
	}, []);

	return onLogout;
}
