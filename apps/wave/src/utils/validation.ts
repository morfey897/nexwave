/* eslint-disable no-useless-escape */

export const EMAIL_REGEXP =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PHONE_REGEXP = /^\+?[0-9]{10,15}$/;

export const PASSWORD_REGEXP =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\-#@$!%*?&])[A-Za-z\d_\-#@$!%*?&]{6,}$/;

export const UUID_REGEXP = /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i;

export const isEmail = (email?: string) => !!email && EMAIL_REGEXP.test(email);

export const isPhone = (phone?: string) => !!phone && PHONE_REGEXP.test(phone);

export const isLogin = (login?: string) => isEmail(login) || isPhone(login);

export const isPassword = (password?: string) =>
	!!password && PASSWORD_REGEXP.test(password);

export const isUUID = (uuid?: string | null | undefined) =>
	typeof uuid === 'string' && UUID_REGEXP.test(uuid);

export const isNumber = (number: number | null | undefined) =>
	typeof number === 'number' && !Number.isNaN(number);

export const isTime = (time?: string) => {
	if (!time) return false;
	const [hour, minute] = time.split(':');
	return +hour < 24 && +minute < 60 && +hour >= 0 && +minute >= 0;
};

export const isDate = (date?: string) =>
	!!date && /^\d{4}-\d{2}-\d{2}$/.test(date);

export const isDateTime = (date?: string) =>
	!!date && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(date);

export const isValidDate = (date: Date) =>
	date instanceof Date && !Number.isNaN(date.getTime());
export const isIdOurUUID = (
	id: number | null | undefined,
	uuid: string | null | undefined
) => isNumber(id) || isUUID(uuid || '');
