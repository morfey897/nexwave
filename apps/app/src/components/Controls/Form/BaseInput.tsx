import clsx from 'clsx';
import Copy from './Components/Copy';
import Icon from './Components/Icon';
import Placeholder from './Components/Placeholder';
import { forwardRef } from 'react';

export interface IInputProps {
	hint?: React.ReactNode;
	icon?: React.ReactNode;
	errorCopy?: React.ReactNode;
	className?: string;
	placeholder?: string;
	required?: boolean;
	hidePlaceholder?: boolean;
}

export type TInput = IInputProps & React.InputHTMLAttributes<HTMLInputElement>;

type TInputProp = TInput & {
	children?: React.ReactNode;
	componentProps?: React.HTMLAttributes<HTMLDivElement>;
	wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
};

export default forwardRef<HTMLInputElement, TInputProp>(function BaseInput(
	{
		placeholder,
		required,
		icon,
		hint,
		className,
		errorCopy,
		hidePlaceholder,
		type,
		children,
		componentProps,
		wrapperProps,
		...props
	},
	ref,
) {
	return (
		<div
			{...componentProps}
			className={clsx('relative', componentProps?.className)}
		>
			<div
				{...wrapperProps}
				className={clsx('wrapper relative', wrapperProps?.className)}
			>
				<Icon icon={icon} />
				<input
					ref={ref}
					placeholder=' '
					className={clsx(
						'input',
						'peer block w-full py-4 px-3',
						'border rounded-lg border-gray-400 dark:border-gray-600',
						'focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40',
						'bg-white dark:bg-gray-900',
						'text-gray-700 dark:text-gray-300',
						!!errorCopy && '!border-red-500',
						!!icon ? 'pl-12' : 'pl-4',
						className,
					)}
					required={required}
					type={type || 'text'}
					{...props}
				/>
				<Placeholder
					icon={icon}
					hidePlaceholder={hidePlaceholder}
					placeholder={placeholder}
					required={required}
				/>
				{children}
			</div>
			<Copy hint={hint} errorCopy={errorCopy} />
		</div>
	);
});
