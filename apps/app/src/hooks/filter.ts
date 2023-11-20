'use client';
import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TFilterParams } from '@/types/filter';

const parseSort = (sort: string | null) => ({
	asc: (sort?.charAt(0) === '-' ? '' : sort) || '',
	desc: (sort?.charAt(0) === '-' ? sort?.slice(1) : '') || '',
});

const setValue = (
	params: string | URLSearchParams,
	{ prefix, name, defaultValue }: TFilterParams,
	value: string,
) => {
	const searchParam = prefix ? `${prefix}-${name}` : name;

	const clone = new URLSearchParams(params);
	if (defaultValue === value || !value) {
		clone.delete(searchParam);
	} else {
		clone.set(searchParam, value);
	}
	return clone.toString();
};

const getValue = (
	params: string | URLSearchParams,
	{ prefix, name, defaultValue }: TFilterParams,
) => {
	const searchParam = prefix ? `${prefix}-${name}` : name;
	return new URLSearchParams(params).get(searchParam) || defaultValue || '';
};

// const useStore = (store?: TFilterParams['store']) => {
// 	const params = useSearchParams();

// 	const closure = useMemo(() => {
// 		return {
// 			get: (name: string) => {
// 				if (store === 'localStorage') {
// 					return localStorage.getItem(name);
// 				}
// 				return params.get(name);
// 			},
// 			set: (name: string, value: string) => {
// 				if (store === 'localStorage') {
// 					localStorage.setItem(name, value);
// 					return '';
// 				}
// 				const clone = new URLSearchParams(params);
// 				clone.set(name, value);
// 				return clone.toString();
// 			},
// 			del: (name: string) => {
// 				if (store === 'localStorage') {
// 					localStorage.removeItem(name);
// 					return '';
// 				}
// 				const clone = new URLSearchParams(params);
// 				clone.delete(name);
// 			},
// 			toString: () => {
// 				if (store === 'localStorage') {
// 					localStorage.setItem(name, value);
// 					return '';
// 				}
// 				const clone = new URLSearchParams(params);
// 				clone.set(name, value);
// 				// return clone.toString();
// 			},
// 		};
// 	}, [params]);

// 	return closure;
// };

/**
 * Hook for filter
 * @param name - search param name
 * @returns
 */
export function useFilter(params: TFilterParams) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const onFilter = useCallback(
		(value: string) => {
			const str = setValue(searchParams, params, value);
			router.push(`?${str}`);
		},
		[searchParams, router],
	);

	const filter = useMemo(() => getValue(searchParams, params), [searchParams]);

	return { onFilter, filter };
}

/**
 * Hook for search
 * @param name - search param name
 * @returns
 */
export function useSearch(params: TFilterParams) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const onSearch = useCallback(
		(value: string) => {
			const str = setValue(searchParams, params, value);
			router.push(`?${str}`);
		},
		[router, searchParams],
	);

	const search = useMemo(() => getValue(searchParams, params), [searchParams]);

	return { onSearch, search };
}

/**
 * Hook for sorting
 * @param name - search param name
 * @returns
 */
export function useSort(params: TFilterParams) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const onSort = useCallback(
		(uid: string) => {
			let str = new URLSearchParams(searchParams).toString();
			const sort = parseSort(getValue(searchParams, params));
			if (sort.asc === uid) {
				str = setValue(searchParams, params, `-${uid}`);
			} else if (sort.desc === uid) {
				str = setValue(searchParams, params, '');
			} else {
				str = setValue(searchParams, params, uid);
			}
			router.push(`?${str}`);
		},
		[searchParams, router],
	);

	const sort = useMemo(
		() => parseSort(getValue(searchParams, params)),
		[searchParams],
	);

	return { onSort, sort };
}

/**
 * Hook for pagination
 * @param name - search param name
 * @returns
 */
export function usePage(params: TFilterParams) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const onPage = useCallback(
		(page: string) => {
			const str = setValue(searchParams, params, page);
			router.push(`?${str}`);
		},
		[router, searchParams],
	);

	const page = useMemo(() => {
		const page = parseInt(getValue(searchParams, params));
		return Number.isNaN(page) || page < 1 ? 1 : page;
	}, [searchParams]);

	return { onPage, page };
}
