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
	SETTINGS: 'settings',
	PROJECTS: 'projects',
} as const;
