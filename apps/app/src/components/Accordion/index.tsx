import clsx from 'clsx';

function Accordion({
	id,
	head,
	className,
	children,
	active,
	...props
}: React.HtmlHTMLAttributes<HTMLDivElement> & {
	id: string;
	head?: React.ReactNode;
	active?: boolean;
}) {
	return (
		<div className={clsx(className)} {...props}>
			<input
				type='checkbox'
				defaultChecked={active}
				id={id}
				className={clsx('peer sr-only')}
			/>
			<label
				htmlFor={id}
				className='cursor-pointer peer-checked:[&_.icon]:rotate-180'
			>
				{head}
			</label>
			<div
				className={clsx(
					'overflow-hidden max-h-0 ease-out transition-all peer-checked:max-h-[100vh]',
				)}
			>
				{children}
			</div>
		</div>
	);
}

export default Accordion;
