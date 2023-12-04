import { User } from 'firebase/auth';

export enum EnumSignIn {
	VERIFIED = 'verified',
	UNVERIFIED = 'unverified',
	SUCCESS = 'success',
	FAILED = 'failed',
}

export type TError = {
	code: string;
	message: string;
};

export type TSignIn = {
	status: EnumSignIn;
	error?: TError;
	user?: User;
};
