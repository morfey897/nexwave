import { TUID } from './common';
import { TGenerator } from './view';
import { EnumSortBy } from '@/enums';

interface IHeadProps<T extends TUID> {
	flex?: number;
	token: string;
	title: string;
	type?: EnumSortBy | EnumSortBy[];
	onSort?: (uid: string) => void;
	comparator?: number;
	Generator: TGenerator<T>;
}

export interface ITableProps<T extends TUID>{
	head: Array<IHeadProps<T>>;
	body?: Array<T>;
}
