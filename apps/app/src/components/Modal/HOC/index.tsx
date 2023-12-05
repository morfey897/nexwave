import clsx from 'clsx';
import {
	useCallback,
	useRef,
	useEffect,
	MouseEventHandler,
	useMemo,
} from 'react';
import Overlay from '../../Overlay';
import { useModal, useModals } from '@/hooks/modal';
import { IModal } from '@/types/view';
import { RedirectType } from 'next/navigation';

export default function withModal<T>(
	Component: React.FC<IModal<T>>,
	name: string,
) {
	function Wrapper() {
		const overlay = useRef(null);
		const wrapper = useRef(null);
		const { open, params } = useModal<T>(name);
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

		return open ? (
			<Overlay
				ref={overlay}
				className='bg-gray-100/20 dark:bg-black/60'
				blur='sm'
				onClick={onClickOverlay}
			>
				<div
					ref={wrapper}
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-full'
				>
					<Component
						name={name}
						onDismiss={onDismiss}
						onConfirm={onConfirm}
						params={params}
					/>
				</div>
			</Overlay>
		) : null;
	}
	return Wrapper;
}
