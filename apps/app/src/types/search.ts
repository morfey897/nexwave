export enum EnumStore {
	QUERY = 'query',
	STORAGE = 'localStorage',
}

export enum EnumSearchParams {
	PAGE = 'page',
	FILTER = 'filter',
	SEARCH = 'search',
	SORT = 'sort',
	VIEW = 'view',
	DAY = 'day',
	MODAL = 'modal',
}

export type TFilterParams = {
	prefix?: string;
	defaultValue?: string | number;
	name: EnumSearchParams;
};
