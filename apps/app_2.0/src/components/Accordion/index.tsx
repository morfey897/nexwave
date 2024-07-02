import clsx from 'clsx';
import { useId } from 'react';

function Accordion({
	className,
	children,
	inputProps,
	...props
}: React.HtmlHTMLAttributes<HTMLDivElement> & {
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
	const internalId = useId();
	const {
		id: inputId,
		children: _,
		className: inputClassName,
		...inputPropsRest
	} = inputProps || {};

	const id = inputId || internalId;
	return (
		<div className={clsx(className)} {...props}>
			<input
				type='checkbox'
				id={id}
				className={clsx('peer sr-only')}
				{...inputPropsRest}
			/>
			<label
				htmlFor={id}
				className={clsx(
					'cursor-pointer peer-checked:[&_.icon]:rotate-180',
					inputClassName
				)}
			>
				{_}
			</label>
			<div
				className={clsx(
					'max-h-0 overflow-hidden transition-all duration-500 ease-in-out peer-checked:max-h-[100vh]'
				)}
			>
				{children}
			</div>
		</div>
	);
}

export default Accordion;
