import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, RedirectType } from 'next/navigation';
import {
	openModal,
	closeModal,
	closeAllModal,
	getModalParams,
} from '@/utils/modal';

export function useModalParams<T>(name: string) {
	const searchParams = useSearchParams();
	const params = useMemo(
		() => getModalParams(name, searchParams) as T,
		[searchParams, name],
	);
	return params;
}

/**
 * Close, open modal
 * @returns
 */
export function useModals() {
	const searchParams = useSearchParams();
	const router = useRouter();

	/**
	 * Open dialog window
	 */
	const onOpen = useCallback(
		(
			name: string,
			props?: Record<string, string | boolean | number> | null,
			type?: RedirectType,
		) => {
			const route = openModal(name, props, searchParams);
			if (type === RedirectType.replace) {
				router.replace(route);
			} else {
				router.push(route);
			}
		},
		[searchParams, router],
	);

	/**
	 * Close dialog window
	 */
	const onClose = useCallback(
		(name: string, pathname: string = '', type?: RedirectType) => {
			const route = closeModal(name, searchParams);
			if (type === RedirectType.replace) {
				router.replace(`${pathname}${route}`);
			} else {
				router.push(`${pathname}${route}`);
			}
		},
		[searchParams, router],
	);

	const onCloseAll = useCallback(() => {
		const route = closeAllModal(searchParams);
		router.push(route);
	}, [searchParams, router]);

	const memoized = useMemo(
		() => ({
			onOpen,
			onClose,
			onCloseAll,
		}),
		[onOpen, onClose, onCloseAll],
	);

	return memoized;
}
