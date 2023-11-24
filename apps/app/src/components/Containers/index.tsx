import clsx from 'clsx';

export function Container({
	children,
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx('max-w-screen-2xl', className)} {...rest}>
			{children}
		</div>
	);
}

export function ContainerBody({
	className,
	children,
	maxHeight,
	...rest
}: { maxHeight?: number } & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx(className)} {...rest}>
			{children}
		</div>
	);
}

export function ContainerHeader({
	className,
	children,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx('top-[80px] z-20', className)} {...rest}>
			{children}
		</div>
	);
}

export default Container;
