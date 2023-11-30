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
