import { User } from 'firebase/auth';
export enum EnumStatus {
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
	status: EnumStatus;
	error?: TError;
	user?: User;
};
