import { TUID } from './common';
export enum EnumView {
	MONTH = 'month', 
	WEEK = 'week', 
	DAY = 'day', 
	LIST = 'list'
}

export interface IEvent extends TUID {
	start: string;
	end: string;
}

export interface ICalendarProps<T extends IEvent> {
	events?: Array<T>;
}
