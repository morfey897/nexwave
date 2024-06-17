import clsx from 'clsx';

function Container({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={clsx('container mx-auto', className)} {...rest} />;
}

Container.displayName = 'Container';

export default Container;
