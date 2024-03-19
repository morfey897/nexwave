import { TUID } from './common';
import { TGenerator } from './view';

export type TTimes = {
	min: number;
	max: number;
	step: number;
};

export interface INode extends TUID {
	date: Date | string;
	duration: number;
}

export interface ICalendarProps<T extends INode> {
	dates: Array<string>;
	events: Array<T>;
	Generator: TGenerator<T>;
}
