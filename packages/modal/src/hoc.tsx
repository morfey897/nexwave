import * as React from 'react';
import {
	IModal,
	IModalWrapper,
	Position,
	PositionX,
	PositionY,
	ModalState,
	SetOfAnimParams,
} from './types';
import clsx from 'clsx';
import { ModalWrapper, Container, Overlay } from './components';
import debounce from './debounce';
import { totalHeight, getPosition } from './utils';
import useModalStore from './store';

type TModalHOC = {
	noCancelByOverlay?: boolean;
	position?: Position | [PositionX, PositionY];
	animParams?: SetOfAnimParams;
	wrapper?: {
		className?: string;
		style?: React.CSSProperties;
	};
	container?: {
		className?: string;
		style?: React.CSSProperties;
	};
	overlay?: {
		className?: string;
		style?: React.CSSProperties;
	};
};

function withModal(Component: React.FC<IModal>, props?: TModalHOC) {
	const FinalPosition = getPosition(props?.position);

	function Wrapper({ name, params }: IModalWrapper) {
		const closeModal = useModalStore((state) => state.closeModal);
		const onFinishedAnimation = useModalStore((state) => state.finishedAnim);
		const state = useModalStore((state) => state.getModalState(name));

		const refOverlay = React.useRef(null);
		const refContainer = React.useRef(null);

		/**
		 * Close the current modal
		 */
		const closeMe = React.useCallback(() => {
			typeof closeModal === 'function' && closeModal(name);
		}, [closeModal, name]);

		/**
		 * Close the current modal by clicking on the overlay
		 */
		const onClickOverlay: React.MouseEventHandler = React.useCallback(
			(event) => {
				if (event.target === refOverlay.current && !props.noCancelByOverlay) {
					closeMe();
				}
			},
			[closeMe, refOverlay]
		);

		/**
		 * Close the current modal by pressing the ESC key
		 */
		const onKeyDown = React.useCallback(
			(e: KeyboardEvent) => {
				if (e.key === 'Escape' && !props.noCancelByOverlay) closeMe();
			},
			[closeMe]
		);

		const onAnimEnd = React.useCallback(() => {
			typeof onFinishedAnimation === 'function' && onFinishedAnimation(name);
		}, [onFinishedAnimation, name]);

		const onChangeSize = React.useMemo(
			() =>
				debounce(() => {
					const element = refContainer.current as HTMLElement;
					if (!element) return;
					const height = totalHeight(element);
					refOverlay.current?.style.setProperty('height', `${height}px`);
				}, 200),
			[]
		);

		React.useEffect(() => {
			document.addEventListener('keydown', onKeyDown);
			return () => document.removeEventListener('keydown', onKeyDown);
		}, [onKeyDown]);

		React.useEffect(() => {
			const element = refContainer.current as HTMLElement;
			if (!element || state != ModalState.OPENED) return;
			const height = totalHeight(element);
			refOverlay.current?.style.setProperty('height', `${height}px`);
		}, [state]);

		React.useEffect(() => {
			window.addEventListener('resize', onChangeSize);
			return () => window.removeEventListener('resize', onChangeSize);
		}, [onChangeSize]);

		return (
			<ModalWrapper
				className={clsx(props?.wrapper?.className)}
				style={props?.wrapper?.style}
				onScroll={onChangeSize}
			>
				<Overlay
					ref={refOverlay}
					$state={state}
					className={clsx(props?.overlay?.className)}
					onClick={onClickOverlay}
					style={{
						...props?.overlay?.style,
						// height: `${height}px`,
					}}
				/>
				<Container
					$position={FinalPosition}
					$state={state}
					$animParams={props?.animParams}
					className={clsx(props?.container?.className)}
					style={props?.container?.style}
					role='dialog'
					ref={refContainer}
					onAnimationEnd={onAnimEnd}
				>
					<Component
						name={name}
						state={state}
						params={params}
						closeMe={closeMe}
					/>
				</Container>
			</ModalWrapper>
		);
	}
	return React.memo(Wrapper);
}

export default withModal;
