import { TUID } from './common';
import { TDeviceProps } from './view';
export type TSort = 'head' | 'sorted_s' | 'sorted_n' | 'none' | 'sr-only';

export type TGenerator<T extends TUID> = React.FC<{
	item: T;
	token?: string;
	isMobile?: boolean;
}>;

export interface IHeadProps<T extends TUID> {
	token: string;
	title: string;
	type: TSort | TSort[];
	Generator: TGenerator<T>;
}

export interface ITableBodyProps<T extends TUID> {
	body?: Array<T>;
}

export interface ITableHeadProps<T extends TUID> {
	head: Array<IHeadProps<T>>;
}

export interface ITableProps<T extends TUID>
	extends ITableHeadProps<T>,
		ITableBodyProps<T> {}
