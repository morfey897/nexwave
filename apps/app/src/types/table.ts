export type TUID = { _uid: string };

export type TSort = 'head' | 'sorted_s' | 'sorted_n' | 'none' | 'sr-only';

export type TGenerator<T extends TUID> = React.FC<{ item: T; token?: string }>;

export interface IHeadProps<T extends TUID> {
	token: string;
	title: string;
	type: TSort | TSort[];
	Generator: TGenerator<T>;
}

export interface ITableProps<T extends TUID> {
	head: Array<IHeadProps<T>>;
	headMobile?: Array<IHeadProps<T>>;
	body?: Array<T>;
}

export type TLevel = 'success' | 'warn' | 'info';
