export enum EnumRoutes {
	HOME = '/',
	HANDSHAKE = '/handshake',
	ACCEPT_INVITE = '/handshake/[uuid]/accept-invite',
	VERIFY_EMAIL = '/handshake/[uuid]/verify-email',
}

export enum EnumProtectedRoutes {
	APP = '/project',
	ROOT = '/project/[uuid]',
	CLIENTS = '/project/[uuid]/clients',
	USERS = '/project/[uuid]/users',
	SERVICES = '/project/[uuid]/services',
	PRODUCTS = '/project/[uuid]/products',
	TIMETABLE = '/project/[uuid]/timetable',
	SETTINGS = '/project/[uuid]/settings',
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

// export enum EnumLevel {
// 	SUCCESS = 'success',
// 	WARN = 'warn',
// 	INFO = 'info',
// }

// export enum EnumState {
//   DRAFT = 'draft',
//   ACTIVE = 'active',
//   INACTIVE = 'inactive',
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

// export enum EnumRole {
// 	owner = 'owner',
// 	super = 'super',
// 	admin = 'admin',
// 	manager = 'manager',
// 	user = 'user',
// }

// TODO take from DB
export enum EnumColor {
	RED = 'red',
	GREN = 'green',
	BLUR = 'blue',
	YELLOW = 'yellow',
	INDIGO = 'indigo',
	ORANGE = 'orange',
	SKYBLUE = 'skyblue',
	PURPLE = 'purple',
	PINK = 'pink',
	GRAY = 'gray',
}

// export enum EnumCurrency {
// 	UAH = 'UAH',
// 	USD = 'USD',
// 	EUR = 'EUR',
// }

// COLORS = Object.values(EnumColor);
// CURRENCIES = Object.values(EnumCurrency);
// WEEK_DAYS = Object.values(EnumWeekDay);
