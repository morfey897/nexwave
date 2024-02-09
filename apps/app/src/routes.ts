/// Public routes ///
export const HOME = '/';
export const HANDSHAKE = '/handshake';
export const ACCEPT_INVITE = '/handshake/[uuid]/accept-invite';
export const VERIFY_EMAIL = '/handshake/[uuid]/verify-email';

/// Protected routes ///
export const APP = '/project';
export const ROOT = '/project/[uuid]';
export const CLIENTS = '/project/[uuid]/clients';
export const USERS = '/project/[uuid]/users';
export const SERVICES = '/project/[uuid]/services';
export const PRODUCTS = '/project/[uuid]/products';
export const TIMETABLE = '/project/[uuid]/timetable';
export const SETTINGS = '/project/[uuid]/settings';

/// API routes ///
export const API = {
	AUTH_OAUTH: '/api/auth/[provider]',
	AUTH_REFRESH_TOKEN: '/api/auth/refresh-token',
};

/// Modal windows ///
export const MODALS = {
	SETTINGS: 'settings',
	PROJECTS: 'projects',
	CREATE_PROJECT: 'new-project',
	CREATE_BRANCH: 'new-branch',
} as const;
