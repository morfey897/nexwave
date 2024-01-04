/// Public routes ///
export const HOME = '/';
export const HANDSHAKE = '/_handshake';
export const ACCEPT_INVITE = '/_handshake/[uuid]/accept-invite';
export const VERIFY_EMAIL = '/_handshake/[uuid]/verify-email';

/// Protected routes ///
export const APP = '/app';
export const ROOT = '/[slug]';
export const CLIENTS = '/[slug]/clients';
export const USERS = '/[slug]/users';
export const SERVICES = '/[slug]/services';
export const PRODUCTS = '/[slug]/products';
export const TIMETABLE = '/[slug]/timetable';
export const SETTINGS = '/[slug]/settings';
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
	SETTINGS: 'settings',
	PROJECTS: 'projects',
} as const;
