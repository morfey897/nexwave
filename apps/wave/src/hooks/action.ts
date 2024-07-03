'use client';

import { IResponse } from '~/types';
import { useCallback, useState } from 'react';
import { EnumResponseStatus } from '~/constants/enums';
import { WENT_WRONG } from '~/constants/errorCodes';
import useSWR from 'swr';

export function useAction<P = unknown, R = unknown>(
	serverAction: (props: P) => Promise<R>
) {
	const [result, setResult] = useState<R | null>(null);
	const [pending, setPending] = useState(false);

	const submit = useCallback(() => {
		setPending(true);
	}, []);

	const action = useCallback(async (props: P) => {
		const actionResult = await serverAction(props);
		setResult(actionResult);
		setPending(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const reset = useCallback(() => {
		setPending(false);
		setResult(null);
	}, []);

	return {
		result,
		pending,
		action,
		reset,
		submit,
	};
}

const fetcher = (...args: unknown[]) =>
	fetch(...(args as [RequestInfo, RequestInit])).then((res) => res.json());

export function useAPI<R = unknown>(
	key: Parameters<typeof useSWR>[0],
	params?: Parameters<typeof useSWR>[2]
): {
	result: IResponse<R>;
	pending: boolean;
} {
	const { data, error, isLoading: pending } = useSWR(key, fetcher, params);

	return {
		result: error
			? {
					status: EnumResponseStatus.FAILED,
					error: {
						message: error?.message || 'Unknown error',
						code: WENT_WRONG,
					},
				}
			: { ...data },
		pending,
	};
}
