import { S_PARAMS } from '@nw/config';

export type UnionSearchParams = Exclude<
	(typeof S_PARAMS.LIST)[number],
	typeof S_PARAMS.DIALOG
>;

export type TFilterParams = {
	prefix?: string;
	defaultValue?: string | number;
	name: UnionSearchParams;
};
