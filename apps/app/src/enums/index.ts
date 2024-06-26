export enum EnumResponse {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'success',
	FAILED = 'failed',
}

export enum EnumLevel {
	SUCCESS = 'success',
	WARN = 'warn',
	INFO = 'info',
}

export enum EnumState {
	DRAFT = 'draft',
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export enum EnumRepresent {
	TABLE = 'table',
	LIST = 'list',
}

export enum EnumPeriod {
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year',
}

export enum EnumRole {
	owner = 'owner',
	super = 'super',
	admin = 'admin',
	manager = 'manager',
	user = 'user',
}

export enum EnumSortBy {
	NONE = 'none',
	SR_ONLY = 'sr-only',
	SYMBOLIC = 'symbolic',
	NUMERIC = 'numeric',
}

export enum EnumDeviceType {
	NONE = 'none',
	MOBILE = 'mobile',
	DESKTOP = 'desktop',
	TABLET = 'tablet',
}

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

export enum EnumCurrency {
	UAH = 'UAH',
	USD = 'USD',
	EUR = 'EUR',
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

export const COLORS = Object.values(EnumColor);
export const CURRENCIES = Object.values(EnumCurrency);
export const WEEK_DAYS = Object.values(EnumWeekDay);
