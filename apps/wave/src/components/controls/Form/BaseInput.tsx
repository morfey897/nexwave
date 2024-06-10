import clsx from 'clsx';
import Copy from './inner/Copy';
import Icon from './inner/Icon';
import Placeholder from './inner/Placeholder';
import { forwardRef } from 'react';

export interface IInputProps {
	hint?: React.ReactNode;
	icon?: React.ReactNode;
	errorCopy?: React.ReactNode;
	placeholder?: string;
	required?: boolean;
	hidePlaceholder?: boolean;
}

export type TInput = IInputProps & React.InputHTMLAttributes<HTMLInputElement>;

type TInputProp = TInput & {
	children?: React.ReactNode;
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
		...props
	},
	ref
) {
	return (
		<div className={clsx('relative', className)}>
			<div className={clsx('wrapper relative')}>
				<Icon icon={icon} />
				<input
					ref={ref}
					placeholder=' '
					className={clsx(
						'input',
						'peer block w-full px-3 py-4',
						'rounded-lg border border-gray-400 dark:border-gray-600',
						'focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300',
						'bg-white dark:bg-gray-900',
						'text-gray-700 dark:text-gray-300',
						!!errorCopy && '!border-red-500',
						!!icon ? 'pl-12' : 'pl-4'
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
