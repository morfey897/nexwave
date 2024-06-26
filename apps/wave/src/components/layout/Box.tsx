import clsx from 'clsx';

function Box({
	className,
	display = 'block',
	flexGrow,
	flexShrink,
	...rest
}: React.HTMLAttributes<HTMLDivElement> & {
	display?: 'block' | 'inline-block' | 'inline' | 'none';
	flexGrow?: '1' | '0';
	flexShrink?: '1' | '0';
}) {
	return (
		<div
			className={clsx(
				// Display
				display === 'block' && 'block',
				display === 'inline-block' && 'inline-block',
				display === 'inline' && 'inline',
				display === 'none' && 'hidden',
				// Flex
				flexGrow === '1' && 'grow',
				flexGrow === '0' && 'grow-0',
				flexShrink === '1' && 'shrink',
				flexShrink === '0' && 'shrink-0',
				className
			)}
			{...rest}
		/>
	);
}

Box.displayName = 'Box';

export default Box;
