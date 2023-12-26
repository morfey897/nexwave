/// Public routes ///
export const HOME = '/';
export const HANDSHAKE = '/handshake';
export const ACCEPT_INVITE = '/handshake/[uuid]/accept-invite';
export const VERIFY_EMAIL = '/handshake/[uuid]/verify-email';

/// Protected routes ///
export const APP = '/app';
export const ROOT = '/app/[slug]';
export const CLIENTS = '/app/[slug]/clients';
export const USERS = '/app/[slug]/users';
export const SERVICES = '/app/[slug]/services';
export const PRODUCTS = '/app/[slug]/products';
export const TIMETABLE = '/app/[slug]/timetable';
export const SETTINGS = '/app/[slug]/settings';
export const DYNAMIC = [
	ROOT,
	CLIENTS,
	USERS,
	SERVICES,
	PRODUCTS,
	TIMETABLE,
	SETTINGS,
];

/// API routes ///
export const API = {
	AUTH_OAUTH: '/api/auth/[provider]',
	AUTH_REFRESH_TOKEN: '/api/auth/refresh-token',
};

/// Modal windows ///
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
