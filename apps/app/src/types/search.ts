import { searchParams } from '@nw/config';

export type UnionSearchParams = Exclude<(typeof searchParams.SEARCH_PARAMS)[number], typeof searchParams.DIALOG>;

export type TFilterParams = {
	prefix?: string;
	defaultValue?: string | number;
	name: UnionSearchParams;
};
