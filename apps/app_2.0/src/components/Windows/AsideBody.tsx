import clsx from 'clsx';

function AsideBody({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'w-full my-6',
				className,
			)}
			{...rest}
		/>
	);
}

export default AsideBody;
