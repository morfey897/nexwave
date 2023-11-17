'use client';
import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { FILTER } from '@/constants/searchparams';

export function useFilter() {
	const params = useSearchParams();
	const router = useRouter();

	const onFilter = useCallback(
		(uid: string) => {
			const clone = new URLSearchParams(params);
			clone.set(FILTER, uid);
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[params, router],
	);

	const filter = useMemo(() => params.get(FILTER), [params]);

	return { onFilter, filter };
}
