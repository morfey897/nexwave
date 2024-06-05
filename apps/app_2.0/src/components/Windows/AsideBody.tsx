import clsx from 'clsx';

function AsideBody({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={clsx('my-6 w-full', className)} {...rest} />;
}

export default AsideBody;
