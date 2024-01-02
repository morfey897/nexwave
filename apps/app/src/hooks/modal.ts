'use client';
import { useCallback, useMemo, useContext } from 'react';
import { useSearchParams, useRouter, RedirectType } from 'next/navigation';
import { openModal, closeModal, isModalByName } from '@/utils/modal';
import { ModalContext } from '@/providers/ModalProvider';

export function useModalState(name: string) {
	const modals = useContext(ModalContext);
	const state = modals[name]?.state;
	return state;
}

export function useModalParams<T extends any>(name: string) {
	const modals = useContext(ModalContext);
	const params = modals[name]?.params as T;
	return params ? (params as T) : null;
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
			props: Record<string, string | boolean | number> | null = null,
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
		const clone = new URLSearchParams(searchParams);
		for (const [key] of clone.entries()) {
			if (isModalByName(key)) {
				clone.delete(key);
			}
		}
		router.push(`?${clone.toString()}`);
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
