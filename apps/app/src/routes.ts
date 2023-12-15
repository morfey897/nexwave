export const HOME = '/';

export const APP = '/app';
export const CLIENTS = '/app/clients';
export const CLIENT = '/app/clients/[id]';
export const USERS = '/app/users';
export const SERVICES = '/app/services';
export const PRODUCTS = '/app/products';
export const SETTINGS = '/app/settings';
export const TIMETABLE = '/app/timetable';

export const EXTERNAL = {
	site: 'https://studio-kalipos.com',
	cms: 'https://edit.studio-kalipos.com',
};

export const API = {
	AUTH_OAUTH: '/api/auth/[provider]',
	AUTH_REFRESH_TOKEN: '/api/auth/refresh',
};

export const MODALS = {
	LOGIN: 'login',
	REGISTER: 'register',
	REGISTER_SUCCESS: 'register-success',
	REGISTER_ERROR: 'register-error',
	REGISTER_CONFIRM: 'register-confirm',
	REGISTER_CONFIRM_SUCCESS: 'register-confirm-success',
	REGISTER_CONFIRM_ERROR: 'register-confirm-error',
	REGISTER_CONFIRM_RESEND: 'register-confirm-resend',
	REGISTER_CONFIRM_RESEND_SUCCESS: 'register-confirm-resend-success',
	REGISTER_CONFIRM_RESEND_ERROR: 'register-confirm-resend-error',
	REGISTER_CONFIRM_RESEND_LIMIT: 'register-confirm-resend-limit',
	LOGOUT: 'logout',
	LOGOUT_SUCCESS: 'logout-success',
	LOGOUT_ERROR: 'logout-error',
};
