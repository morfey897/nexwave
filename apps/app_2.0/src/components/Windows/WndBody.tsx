import clsx from 'clsx';

function WndBody({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx('my-6 w-full px-6 md:px-12', className)} {...rest} />
	);
}

export default WndBody;
