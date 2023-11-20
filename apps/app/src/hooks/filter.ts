'use client';
import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TFilterParams } from '@/types/filter';
import { type } from 'os';
import { max } from 'lodash';

function _use({ prefix, name, defaultValue }: TFilterParams) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const searchParam = prefix ? `${prefix}-${name}` : name;

	const onChange = useCallback(
		(value: string | number) => {
			const clone = new URLSearchParams(searchParams);
			if (defaultValue === value || !value) {
				clone.delete(searchParam);
			} else {
				clone.set(searchParam, String(value));
			}
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[router, searchParams],
	);

	const value = useMemo(
		() => (searchParams.get(searchParam) || defaultValue || '').toString(),
		[searchParams],
	);
	return { onChange, value };
}

/**
 * Hook for filter
 * @param name - search param name
 * @returns
 */
export function useFilter(params: TFilterParams) {
	const { onChange, value } = _use(params);
	return { onFilter: onChange, filter: value };
}

/**
 * Hook for search
 * @param name - search param name
 * @returns
 */
export function useSearch(params: TFilterParams) {
	const { onChange, value } = _use(params);
	return { onSearch: onChange, search: value };
}

/**
 * Hook for view
 * @param name - search param name
 * @returns
 */
export function useView(params: TFilterParams) {
	const { onChange, value } = _use(params);
	return { onView: onChange, view: value };
}

/**
 * Hook for pagination
 * @param name - search param name
 * @returns
 */
export function usePage({
	pages,
	...params
}: TFilterParams & { pages?: number }) {
	const { onChange, value } = _use(params);

	const maxPage = useMemo(
		() => (!pages || Number.isNaN(pages) ? 1 : pages),
		[pages],
	);

	const page = useMemo(() => {
		const page = parseInt(value);
		return Number.isNaN(page) || page < 1 || page > maxPage ? 1 : page;
	}, [value, maxPage]);

	const onPage = useCallback(
		(page: number | string) => {
			if (typeof page === 'string') {
				page = parseInt(page);
			}
			if (Number.isNaN(page)) return;
			if (page <= 1) {
				onChange(1);
			} else if (page >= maxPage) {
				onChange(maxPage);
			} else {
				onChange(page);
			}
		},
		[page, maxPage, onChange],
	);

	return { onPage, page, maxPage };
}

/**
 * Hook for sorting
 * @param name - search param name
 * @returns
 */
export function useSort(params: TFilterParams) {
	const { onChange, value } = _use(params);

	const sort = useMemo(() => {
		return {
			asc: (value?.charAt(0) === '!' ? '' : value) || '',
			desc: (value?.charAt(0) === '!' ? value?.slice(1) : '') || '',
		};
	}, [value]);

	const onSort = useCallback(
		(uid: string) => {
			if (sort.asc === uid) {
				onChange(`!${uid}`);
			} else if (sort.desc === uid) {
				onChange('');
			} else {
				onChange(uid);
			}
		},
		[sort, onChange],
	);

	return { onSort, sort };
}
