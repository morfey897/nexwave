import * as ErrorCodes from '~errorCodes';
import { strTimeToMinutes } from '~utils/datetime';
import * as Yup from 'yup';


// yup.

// export const validate = (
// 	props: Array<{
// 		value: any;
// 		key: 'email' | 'password' | 'time' | 'time-range' | 'date';
// 	}>
// ) =>
// 	props.reduce((prev: Array<string>, { value, key }) => {
// 		switch (key) {
// 			case 'email': {
// 				if (!value) {
// 					prev.push(ErrorCodes.MISSING_EMAIL);
// 				} else if (!isEmail(value)) {
// 					prev.push(ErrorCodes.INVALID_EMAIL);
// 				}
// 				break;
// 			}
// 			case 'password': {
// 				if (!value) {
// 					prev.push(ErrorCodes.MISSING_PASSWORD);
// 				} else if (!isPassword(value)) {
// 					prev.push(ErrorCodes.WEAK_PASSWORD);
// 				}
// 				break;
// 			}
// 			case 'time': {
// 				if (!value) {
// 					prev.push(ErrorCodes.MISSING_TIME);
// 				} else if (!isTime(value)) {
// 					prev.push(ErrorCodes.INVALID_TIME);
// 				}
// 				break;
// 			}
// 			case 'time-range': {
// 				const [from, to] = (
// 					Array.isArray(value) ? value : String(value).split('-')
// 				).map((v) => v.trim());

// 				if (!from) {
// 					prev.push(ErrorCodes.MISSING_TIME_FROM);
// 				} else if (!isTime(from)) {
// 					prev.push(ErrorCodes.INVALID_TIME_FROM);
// 				}
// 				if (!to) {
// 					prev.push(ErrorCodes.MISSING_TIME_TO);
// 				} else if (!isTime(to)) {
// 					prev.push(ErrorCodes.INVALID_TIME_TO);
// 				}
// 				if (
// 					isTime(from) &&
// 					isTime(to) &&
// 					strTimeToMinutes(to) - strTimeToMinutes(from) < 0
// 				) {
// 					prev.push(ErrorCodes.INVALID_TIME_RANGE);
// 				}
// 				break;
// 			}
// 			case 'date': {
// 				if (!value) {
// 					prev.push(ErrorCodes.MISSING_DATE);
// 				} else if (!isDate(value)) {
// 					prev.push(ErrorCodes.INVALID_DATE);
// 				}
// 				break;
// 			}
// 		}
// 		return prev;
// 	}, []);

export const isEmail = (email?: string) =>
	!!email &&
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);

export const isPhone = (phone?: string) =>
	!!phone &&
	/^\+?[\d\s-\(\)]+$/.test(phone) &&
	phone.replace(/\D/g, '').length >= 10;

export const isPassword = (password?: string) =>
	!!password &&
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\-#@$!%*?&])[A-Za-z\d_\-#@$!%*?&]{6,}$/.test(
		password
	);

export const isUUID = (uuid?: string) =>
	!!uuid && /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(uuid);

export const isTime = (time?: string) => {
	if (!time) return false;
	const [hour, minute] = time.split(':');
	return (
		+hour < 24 &&
		+minute < 60 &&
		+hour >= 0 &&
		+minute >= 0 &&
		+hour === +hour &&
		+minute === +minute
	);
};

export const isDate = (date?: string) =>
	!!date && /^\d{4}-\d{2}-\d{2}$/.test(date);

export const isDateTime = (date?: string) =>
	!!date && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(date);

export const isNumber = (number: any) =>
	typeof number === 'number' && !Number.isNaN(number);
export const isValidDate = (date: Date) =>
	date instanceof Date && !Number.isNaN(date.getTime());
export const isIdOurUUID = (
	id: number | null | undefined,
	uuid: string | null | undefined
) => isNumber(id) || isUUID(uuid || '');
