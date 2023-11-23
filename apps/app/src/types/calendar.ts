import { TUID } from './common';
import { TGenerator } from './view';
export enum EnumView {
	MONTH = 'month',
	WEEK = 'week',
	DAY = 'day',
	LIST = 'list',
}

export interface INode extends TUID {
	date: string;
	duration: number;
}

export interface ICalendarProps<T extends INode> {
	calendar: {
		dates: Array<string>;
		events: Array<T>;
		Generator: TGenerator<T>;
	};
}
