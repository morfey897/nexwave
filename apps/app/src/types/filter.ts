import { UnionSearchParams } from './search';

export type TFilterParams = {
	prefix?: string;
	defaultValue?: string | number;
	name: UnionSearchParams;
};
