import clsx from 'clsx';

function Body({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'w-full px-6 md:px-12 my-6',
				className,
			)}
			{...rest}
		/>
	);
}

export default Body;
