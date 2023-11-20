import { TUID } from './common';
export enum EnumSort {
	NONE = 'none',
	SR_ONLY = 'sr-only',
	SYMBOLIC = 'symbolic',
	NUMERIC = 'numeric',
}

export type TGenerator<T extends TUID> = React.FC<{
	item: T;
	token?: string;
	isMobile?: boolean;
}>;

export interface IHeadProps<T extends TUID> {
	token: string;
	title: string;
	type?: EnumSort | EnumSort[];
	onSort?: (uid: string) => void;
	comparator?: 1 | -1 | 0;
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
