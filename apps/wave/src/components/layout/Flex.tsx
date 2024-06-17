import clsx from 'clsx';

function Flex({
	direction = 'row',
	justify = 'flex-start',
	align = 'flex-start',
	wrap = 'nowrap',
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement> & {
	direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	justify?:
		| 'flex-start'
		| 'center'
		| 'flex-end'
		| 'space-between'
		| 'space-around';
	align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
	wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}) {
	return (
		<div
			className={clsx(
				'flex',
				direction === 'row' && 'flex-row',
				direction === 'column' && 'flex-col',
				direction === 'row-reverse' && 'flex-row-reverse',
				direction === 'column-reverse' && 'flex-col-reverse',
				// Align
				align === 'center' && 'items-center',
				align === 'flex-end' && 'items-end',
				align === 'stretch' && 'items-stretch',
				align === 'baseline' && 'items-baseline',
				align === 'flex-start' && 'items-start',
				// Justify
				justify === 'center' && 'justify-center',
				justify === 'flex-end' && 'justify-end',
				justify === 'space-between' && 'justify-between',
				justify === 'space-around' && 'justify-around',
				justify === 'flex-start' && 'justify-start',
				// Wrap
				wrap === 'wrap' && 'flex-wrap',
				wrap === 'wrap-reverse' && 'flex-wrap-reverse',
				wrap === 'nowrap' && 'flex-nowrap',
				// Custom class
				className
			)}
			{...rest}
		/>
	);
}

Flex.displayName = 'Flex';

export default Flex;
