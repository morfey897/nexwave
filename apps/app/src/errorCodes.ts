import { AuthErrorCodes as codes } from 'firebase/auth';

export const AuthErrorCodes = {
	...codes,
	MISSING_EMAIL: 'auth/missing-email',
	MISSING_PASSWORD: 'auth/missing-password',
};
