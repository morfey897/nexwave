import { TUID } from './common';
import { TGenerator } from './view';

export enum EnumView {
	TABLE = 'table',
	LIST = 'list',
}

export enum EnumSort {
	NONE = 'none',
	SR_ONLY = 'sr-only',
	SYMBOLIC = 'symbolic',
	NUMERIC = 'numeric',
}

interface IHeadProps<T extends TUID> {
	flex?: number;
	token: string;
	title: string;
	type?: EnumSort | EnumSort[];
	onSort?: (uid: string) => void;
	comparator?: number;
	Generator: TGenerator<T>;
}

export interface ITableProps<T extends TUID>{
	head: Array<IHeadProps<T>>;
	body?: Array<T>;
}
