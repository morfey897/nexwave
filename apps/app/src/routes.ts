/// Public routes ///
export const HOME = '/';
export const HANDSHAKE = '/handshake';
export const ACCEPT_INVITE = '/handshake/[uuid]/accept-invite';
export const VERIFY_EMAIL = '/handshake/[uuid]/verify-email';

/// Protected routes ///
export const APP = '/app';
export const ROOT = '/app/[uuid]';
export const CLIENTS = '/app/[uuid]/clients';
export const USERS = '/app/[uuid]/users';
export const SERVICES = '/app/[uuid]/services';
export const PRODUCTS = '/app/[uuid]/products';
export const TIMETABLE = '/app/[uuid]/timetable';
export const SETTINGS = '/app/[uuid]/settings';
export const PROFILE = '/app/profile';

/// API routes ///
export const API = {
	AUTH_OAUTH: '/api/auth/[provider]',
	AUTH_REFRESH_TOKEN: '/api/auth/refresh-token',
	EVENTS: '/api/events?[params]',
	PROJECTS: '/api/projects',
};

/// Modal windows ///
export const MODALS = {
	SETTINGS: 'settings',
	PROJECTS: 'projects',
	CREATE_PROJECT: 'new-project',
	CREATE_BRANCH: 'new-branch',
	CREATE_EVENT: 'new-event',
} as const;
