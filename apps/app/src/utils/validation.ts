import * as ErrorCodes from '@/errorCodes';

export const validate = (
	props: Array<{ value: any; key: 'email' | 'password' }>,
) =>
	props.reduce((prev: Array<string>, { value, key }) => {
		switch (key) {
			case 'email': {
				if (!value) {
					prev.push(ErrorCodes.MISSING_EMAIL);
				} else if (!isEmail(value)) {
					prev.push(ErrorCodes.INVALID_EMAIL);
				}
				break;
			}
			case 'password': {
				if (!value) {
					prev.push(ErrorCodes.MISSING_PASSWORD);
				} else if (!isPassword(value)) {
					prev.push(ErrorCodes.WEAK_PASSWORD);
				}
			}
		}
		return prev;
	}, []);

export const isEmail = (email?: string) =>
	!!email &&
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email,
	);

export const isPhone = (phone?: string) =>
	!!phone &&
	/^\+?[\d\s-\(\)]+$/.test(phone) &&
	phone.replace(/\D/g, '').length >= 10;

export const isPassword = (password?: string) =>
	!!password &&
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\-#@$!%*?&])[A-Za-z\d_\-#@$!%*?&]{6,}$/.test(
		password,
	);

export const isUUID = (uuid?: string) =>
	!!uuid && /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(uuid);
