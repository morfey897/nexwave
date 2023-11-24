import clsx from 'clsx';

function ContainerBody({
	className,
	children,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={clsx(className)}>{children}</div>;
}

export default ContainerBody;
