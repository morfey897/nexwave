import { EnumStatus } from './status';

export type TError = {
	code: string;
	message: string;
};

export type TAuth = {
	status: EnumStatus;
	error?: TError;
	// user?: User;
};
