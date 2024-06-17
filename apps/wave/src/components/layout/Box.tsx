import clsx from 'clsx';

function Box({
	className,
	display = 'block',
	...rest
}: React.HTMLAttributes<HTMLDivElement> & {
	display?: 'block' | 'inline-block' | 'inline' | 'none';
}) {
	return (
		<div
			className={clsx(
				// Display
				display === 'block' && 'block',
				display === 'inline-block' && 'inline-block',
				display === 'inline' && 'inline',
				display === 'none' && 'hidden',
				className
			)}
			{...rest}
		/>
	);
}

Box.displayName = 'Box';

export default Box;
