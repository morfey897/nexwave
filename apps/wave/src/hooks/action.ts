'use client';

import { IResponse } from '~/types';
import {
	FormEvent,
	useCallback,
	useMemo,
	useState,
	useTransition,
} from 'react';
import { EnumResponseStatus, EnumProtectedRoutes } from '~/constants/enums';
import { WENT_WRONG } from '~/constants/errorCodes';
import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import { buildDynamicHref } from '~/utils';
import { useFormStatus } from 'react-dom';

const fetcher = (...args: unknown[]) =>
	fetch(...(args as [RequestInfo, RequestInit])).then((res) => res.json());

/**
 * Using the server action
 * @param serverAction
 * @returns
 */
export function useAction<R = unknown>(
	serverAction: (props: FormData) => Promise<R>
) {
	const [result, setResult] = useState<R | null>(null);
	const [pending, startTransition] = useTransition();

	const action = useCallback(
		async (props: FormData) => {
			startTransition(async () => {
				const actionResult = await serverAction(props);
				setResult(actionResult);
			});
		},
		[serverAction]
	);

	const onReset = useCallback<React.FormEventHandler<HTMLFormElement>>(
		(event: React.FormEvent<HTMLFormElement>) => {
			setResult(null);
		},
		[]
	);

	const onChange = useCallback<React.FormEventHandler<HTMLFormElement>>(
		(event: React.FormEvent<HTMLFormElement>) => {
			setResult(null);
		},
		[]
	);

	const memoResult = useMemo(
		() => ({
			result,
			pending,
			formProps: {
				action,
				onReset,
				onChange,
			},
		}),
		[result, pending, action, onReset, onChange]
	);

	return memoResult;
}

/**
 * Using the server action with projectUUID
 * @param serverAction
 * @returns
 */
export function useNWAction<R = unknown>(
	serverAction: (props: FormData) => Promise<R>
) {
	const pathname = usePathname();

	const parentAction = useAction<R>(serverAction);
	const action = useCallback(
		async (props: FormData) => {
			const projectUUID = pathname
				.replace(buildDynamicHref(EnumProtectedRoutes.ROOT, { uuid: '' }), '')
				.replace(/\/.*?$/, '');
			props.append('projectUUID', projectUUID);
			await parentAction.formProps.action(props);
		},
		[parentAction, pathname]
	);

	const memoResult = useMemo(
		() => ({
			...parentAction,
			formProps: {
				...parentAction.formProps,
				action,
			},
		}),
		[parentAction, action]
	);

	return memoResult;
}

/**
 * Using the API
 */
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
