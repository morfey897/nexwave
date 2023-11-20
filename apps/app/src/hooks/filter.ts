'use client';
import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TFilterParams } from '@/types/filter';

const parseSort = (sort: string | null) => ({
	asc: (sort?.charAt(0) === '-' ? '' : sort) || '',
	desc: (sort?.charAt(0) === '-' ? sort?.slice(1) : '') || '',
});

/**
 * Hook for filter
 * @param name - search param name
 * @returns
 */
export function useFilter({ prefix, name }: TFilterParams) {
	const params = useSearchParams();
	const router = useRouter();

	const searchParam = prefix ? `${prefix}-${name}` : name;

	const onFilter = useCallback(
		(uid: string) => {
			const clone = new URLSearchParams(params);
			clone.set(searchParam, uid);
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[params, router, searchParam],
	);

	const filter = useMemo(() => params.get(searchParam), [params, searchParam]);

	return { onFilter, filter };
}

/**
 * Hook for search
 * @param name - search param name
 * @returns
 */
export function useSearch({ prefix, name }: TFilterParams) {
	const params = useSearchParams();
	const router = useRouter();

	const searchParam = prefix ? `${prefix}-${name}` : name;

	const onSearch = useCallback(
		(input: string) => {
			const clone = new URLSearchParams(params);
			if (!input) {
				clone.delete(searchParam);
			} else {
				clone.set(searchParam, input);
			}
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[params, router, searchParam],
	);

	const search = useMemo(() => params.get(searchParam), [params, searchParam]);

	return { onSearch, search };
}

/**
 * Hook for sorting
 * @param name - search param name
 * @returns
 */
export function useSort({ prefix, name }: TFilterParams) {
	const params = useSearchParams();
	const router = useRouter();

	const searchParam = prefix ? `${prefix}-${name}` : name;

	const onSort = useCallback(
		(uid: string) => {
			const clone = new URLSearchParams(params);
			const sort = parseSort(clone.get(searchParam));
			if (sort.asc === uid) {
				clone.set(searchParam, `-${uid}`);
			} else if (sort.desc === uid) {
				clone.delete(searchParam);
			} else {
				clone.set(searchParam, uid);
			}
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[params, router, searchParam],
	);

	const sort = useMemo(
		() => parseSort(params.get(searchParam)),
		[params, searchParam],
	);

	return { onSort, sort };
}

/**
 * Hook for pagination
 * @param name - search param name
 * @returns
 */
export function usePage({ prefix, name }: TFilterParams) {
	const params = useSearchParams();
	const router = useRouter();

	const searchParam = prefix ? `${prefix}-${name}` : name;

	const onPage = useCallback(
		(page: number) => {
			const clone = new URLSearchParams(params);
			if (page === 1) {
				clone.delete(searchParam);
			} else {
				clone.set(searchParam, String(page));
			}
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[params, router, searchParam],
	);

	const page = useMemo(() => {
		const page = parseInt(params.get(searchParam) || '');
		return Number.isNaN(page) || page < 1 ? 1 : page;
	}, [params, searchParam]);

	return { onPage, page };
}
