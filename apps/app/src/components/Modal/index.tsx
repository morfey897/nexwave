'use client';
import { useCallback, useRef, useEffect, MouseEventHandler, memo } from 'react';
import Overlay from '../Overlay';
import { useModalParams, useModalState, useModals } from '@/hooks/modal';
import { IModal } from '@/types/view';
import { RedirectType } from 'next/navigation';
import clsx from 'clsx';

export type TModalState = {
	state: 'mounted' | 'open' | 'closing' | 'close' | 'none';
};

export default function withModal<T>(
	Component: React.FC<IModal<T> & TModalState>,
	zIndex: 20 | 30 | 40 = 30,
) {
	function Wrapper({ name }: { name: string }) {
		const state = useModalState(name);
		const overlay = useRef(null);
		const wrapper = useRef(null);
		const params = useModalParams<T>(name);
		const { onClose } = useModals();

		const onConfirm = useCallback<IModal<T>['onConfirm']>(
			(pathname, type?: RedirectType) => {
				onClose(name, pathname, type);
			},
			[onClose],
		);

		const onDismiss = useCallback<IModal<T>['onDismiss']>(
			(type?: RedirectType) => {
				onClose(name, '', type);
			},
			[onClose],
		);

		const onClickOverlay: MouseEventHandler = useCallback(
			(e) => {
				if (e.target === overlay.current || e.target === wrapper.current) {
					onDismiss();
				}
			},
			[onDismiss, overlay, wrapper],
		);

		const onKeyDown = useCallback(
			(e: KeyboardEvent) => {
				if (e.key === 'Escape') onDismiss();
			},
			[onDismiss],
		);

		useEffect(() => {
			document.addEventListener('keydown', onKeyDown);
			return () => document.removeEventListener('keydown', onKeyDown);
		}, [onKeyDown]);

		return (
			<section
				className={clsx(
					'inset-0 fixed',
					state === 'close' ? 'hidden' : 'block',
					{
						'z-20': zIndex === 20,
						'z-30': zIndex === 30,
						'z-40': zIndex === 40,
					},
				)}
			>
				<Overlay
					ref={overlay}
					className={clsx(
						'bg-gray-100/20 dark:bg-black/60',
						'transition-opacity duration-300',
						state === 'mounted' && 'opacity-30',
						state === 'open' && 'opacity-100',
						state === 'closing' && 'opacity-30',
						// state === 'close' && 'hidden',
					)}
					blur='sm'
					onClick={onClickOverlay}
				/>
				<Component
					state={state}
					name={name}
					onDismiss={onDismiss}
					onConfirm={onConfirm}
					params={params}
				/>
			</section>
		);
	}
	return memo(Wrapper);
}
