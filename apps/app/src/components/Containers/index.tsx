import { forwardRef } from 'react';
import clsx from 'clsx';
import { useRef, useCallback } from 'react';

export function useSyncScroll() {
	const refHeader = useRef<HTMLDivElement>(null);
	const refBody = useRef<HTMLDivElement>(null);

	const onScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			event.stopPropagation();
			const currentTarget = event.currentTarget;
			if (currentTarget != refHeader.current && refHeader.current) {
				refHeader.current.scrollLeft = currentTarget.scrollLeft;
			} else if (currentTarget != refBody.current && refBody.current) {
				refBody.current.scrollLeft = currentTarget.scrollLeft;
			}
		},
		[],
	);
	return { refHeader, refBody, onScroll };
}

export function Container({
	children,
	className,
	header,
	body,
	threshold = 0,
	...rest
}: {
	threshold?: number;
	body?: React.ReactNode;
	header?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx('max-w-screen-2xl overflow-x-clip', className)}
			{...rest}
		>
			{children}
		</div>
	);
}

export const ContainerBody = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(function Component({ children, className, ...rest }, ref) {
	return (
		<div ref={ref} className={clsx('overflow-x-scroll overflow-y-hidden', className)} {...rest}>
			{children}
		</div>
	);
});

export const ContainerHeader = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(function Component({ children, className, ...rest }, ref) {
	return (
		<div
			ref={ref}
			className={clsx('sticky top-[80px] z-20', className)}
			{...rest}
		>
			{children}
		</div>
	);
});

export const ContainerScrollableHeader = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(function Component({ children, className, ...rest }, ref) {
	return (
		<div
			ref={ref}
			className={clsx('overflow-x-scroll hide-scroll', className)}
			{...rest}
		>
			{children}
		</div>
	);
});

export default Container;
