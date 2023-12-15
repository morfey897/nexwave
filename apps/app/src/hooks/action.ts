'use client';
import { useCallback, useState, useMemo } from 'react';
export function useAction<P = any, R = any>(
	serverAction: (props: P) => Promise<R>,
) {
	const [result, setResult] = useState<R | null>(null);
	const [pending, setPending] = useState(false);

	const submit = useCallback(() => {
		setPending(true);
	}, []);

	const action = useCallback(async (props: P) => {
		const result = await serverAction(props);
		setResult(result);
		setPending(false);
	}, []);

	const reset = useCallback(() => {
		setPending(false);
		setResult(null);
	}, []);

	const memoResult = useMemo(
		() => ({
			result,
			pending,
			action,
			reset,
			submit,
		}),
		[result, pending, action, reset],
	);

	return memoResult;
}
