import clsx from 'clsx';

function Group({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'flex items-center',
				'[&>*:first-child:not(:only-child)]:rounded-r-none',
				'[&>*:not(:first-child):not(:last-child)]:rounded-none',
				'[&>*:last-child:not(:only-child)]:rounded-l-none',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export default Group;
