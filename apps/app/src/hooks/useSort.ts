'use client';
import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { SORT_ASC, SORT_DESC } from '@/constants/searchparams';

export function useSort() {
	const params = useSearchParams();
	const router = useRouter();

	const onSort = useCallback(
		(uid: string) => {
			const clone = new URLSearchParams(params);
			if (clone.get(SORT_ASC) === uid) {
				clone.set(SORT_ASC, '');
				clone.set(SORT_DESC, uid);
			} else if (clone.get(SORT_DESC) === uid) {
				clone.set(SORT_DESC, '');
			} else {
				clone.set(SORT_ASC, uid);
			}
			if (!clone.get(SORT_DESC)) {
				clone.delete(SORT_DESC);
			}
			if (!clone.get(SORT_ASC)) {
				clone.delete(SORT_ASC);
			}
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[params, router],
	);

	const s_asc = useMemo(() => params.get(SORT_ASC), [params]);
	const s_desc = useMemo(() => params.get(SORT_DESC), [params]);

	return { onSort, s_asc, s_desc };
}
