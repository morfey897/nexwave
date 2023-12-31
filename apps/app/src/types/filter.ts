import { EnumSearchParams } from './search';
export enum EnumStore {
	QUERY = 'query',
	STORAGE = 'localStorage',
}

export type TFilterParams = {
	prefix?: string;
	defaultValue?: string | number;
	name: EnumSearchParams;
};
