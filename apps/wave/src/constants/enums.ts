export enum EnumRoutes {
	HOME = '/',
	HANDSHAKE = '/handshake',
	ACCEPT_INVITE = '/handshake/[uuid]/accept-invite',
	VERIFY_EMAIL = '/handshake/[uuid]/verify-email',
}

export enum EnumProtectedRoutes {
	APP = '/wave',
	ROOT = '/wave/[uuid]',
	CLIENTS = '/wave/[uuid]/clients',
	EMPLOYEES = '/wave/[uuid]/employees',
	SERVICES = '/wave/[uuid]/services',
	PRODUCTS = '/wave/[uuid]/products',
	TIMETABLE = '/wave/[uuid]/timetable',
	SETTINGS = '/wave/[uuid]/settings',
}

export enum EnumApiRoutes {
	AUTH_OAUTH = '/api/auth/[provider]',
	AUTH_REFRESH_TOKEN = '/api/auth/refresh-token',
	EVENTS = '/api/events?[params]',
	PROJECTS = '/api/projects',
}

export enum EnumModalWindows {
	SETTINGS = 'settings',
	PROJECTS = 'projects',
	CREATE_PROJECT = 'new-project',
	CREATE_BRANCH = 'new-branch',
	CREATE_EVENT = 'new-event',
}

export enum EnumDeviceType {
	NONE = 'none',
	MOBILE = 'mobile',
	DESKTOP = 'desktop',
	TABLET = 'tablet',
}

export enum EnumResponseStatus {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'success',
	FAILED = 'failed',
}

export enum EnumSortBy {
	NONE = 'none',
	SR_ONLY = 'sr-only',
	SYMBOLIC = 'symbolic',
	NUMERIC = 'numeric',
}

export enum EnumRepeatPeriod {
	WEEKLY = 'WEEKLY',
	MONTHLY = 'MONTHLY',
	YEARLY = 'YEARLY',
}

export enum EnumWeekDay {
	SUNDAY = 'SU',
	MONDAY = 'MO',
	TUESDAY = 'TU',
	WEDNESDAY = 'WE',
	THURSDAY = 'TH',
	FRIDAY = 'FR',
	SATURDAY = 'SA',
}

export enum EnumTheme {
	LIGHT = 'light',
	DARK = 'dark',
}

export enum EnumOAuthProvider {
	GOOGLE = 'google',
}

// export enum EnumLevel {
// 	SUCCESS = 'success',
// 	WARN = 'warn',
// 	INFO = 'info',
// }

// export enum EnumState {
// 	DRAFT = 'draft',
// 	ACTIVE = 'active',
// 	INACTIVE = 'inactive',
// }

// export enum EnumRepresent {
// 	TABLE = 'table',
// 	LIST = 'list',
// }

// export enum EnumPeriod {
//   DAY = 'day',
//   WEEK = 'week',
//   MONTH = 'month',
//   YEAR = 'year',
// }

export enum EnumRole {
	owner = 'owner',
	super = 'super',
	admin = 'admin',
	manager = 'manager',
	user = 'user',
}

export enum EnumColor {
	BLUE = 'blue',
	GREN = 'green',
	YELLOW = 'yellow',
	PURPLE = 'purple',
	CYAN = 'cyan',
	ORANGE = 'orange',
	PINK = 'pink',
	TEAL = 'teal',
}

export enum EnumCurrency {
	UAH = 'UAH',
	USD = 'USD',
	EUR = 'EUR',
}

export const COLORS = Object.values(EnumColor);
export const CURRENCIES = Object.values(EnumCurrency);
export const WEEK_DAYS = Object.values(EnumWeekDay);
