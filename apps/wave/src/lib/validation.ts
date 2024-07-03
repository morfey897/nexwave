/* eslint-disable no-useless-escape */

import * as Yup from 'yup';
import * as ErrorCodes from '~/constants/errorCodes';
import {
	EMAIL_REGEXP,
	PHONE_REGEXP,
	PASSWORD_REGEXP,
} from '~/utils/validation';

export const emailSchema = Yup.string().matches(
	EMAIL_REGEXP,
	ErrorCodes.INVALID_EMAIL
);

export const phoneSchema = Yup.string()
	.transform((value: string) => `+${value.replace(/\D/g, '')}`)
	.matches(PHONE_REGEXP, ErrorCodes.INVALID_PHONE);

export const signinSchema = Yup.object().shape({
	login: Yup.string()
		.required(ErrorCodes.MISSING_EMAIL)
		.test('login', ErrorCodes.INVALID_LOGIN, (value) => {
			if (!value) return false;
			if (emailSchema.isValidSync(value)) return true;
			return phoneSchema.isValidSync(value);
		}),
	password: Yup.string().required(ErrorCodes.MISSING_PASSWORD),
});

export const signupSchema = Yup.object().shape({
	name: Yup.string(),
	login: Yup.string()
		.required(ErrorCodes.MISSING_EMAIL)
		.test('login', ErrorCodes.INVALID_LOGIN, (value) => {
			if (!value) return false;
			if (emailSchema.isValidSync(value)) return true;
			return phoneSchema.isValidSync(value);
		}),
	password: Yup.string()
		.matches(PASSWORD_REGEXP, ErrorCodes.WEAK_PASSWORD)
		.required(ErrorCodes.MISSING_PASSWORD),
	confirmPassword: Yup.string()
		.required(ErrorCodes.MISSING_PASSWORD)
		.oneOf([Yup.ref('password')], ErrorCodes.INVALID_PASSWORD),
});
