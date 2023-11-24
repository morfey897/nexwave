import clsx from 'clsx';

function ContainerHeader({
	className,
	children,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={clsx(className)}>{children}</div>;
}

export default ContainerHeader;
