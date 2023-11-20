export enum EnumStore {
	QUERY = 'query',
	STORAGE = 'localStorage',
}

export enum EnumSearchParams {
	PAGE = 'page',
	FILTER = 'filter',
	SEARCH = 'search',
	SORT = 'sort',
}

export type TFilterParams = {
	prefix?: string;
	defaultValue?: string;
	name: EnumSearchParams;
	store?: EnumStore;
};
