import * as Yup from 'yup';
import * as ErrorCodes from '~errorCodes';

const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\-#@$!%*?&])[A-Za-z\d_\-#@$!%*?&]{6,}$/;

export const signinSchema = Yup.object().shape({
	email: Yup.string()
		.matches(emailRegex, ErrorCodes.INVALID_EMAIL)
		.required(ErrorCodes.MISSING_EMAIL),
	password: Yup.string().required(ErrorCodes.MISSING_PASSWORD),
});

export const signupSchema = Yup.object().shape({
	name: Yup.string(),
	email: Yup.string()
		.matches(emailRegex, ErrorCodes.INVALID_EMAIL)
		.required(ErrorCodes.MISSING_EMAIL),
	password: Yup.string()
		.matches(passwordRegex, ErrorCodes.WEAK_PASSWORD)
		.required(ErrorCodes.MISSING_PASSWORD),
	confirmPassword: Yup.string()
		.required(ErrorCodes.MISSING_PASSWORD)
		.oneOf([Yup.ref('password')], ErrorCodes.INVALID_PASSWORD),
});
