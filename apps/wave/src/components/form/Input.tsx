import React, { useMemo } from 'react';
import {
	Control,
	Field,
	Message,
	type FormMessageProps,
} from '@radix-ui/react-form';
import clsx from 'clsx';
import BaseField from './field';

function Input({
	required,
	label,
	className,
	messages,
	type,
	defaultValue,
	placeholder,
	size = 'md',
	variant = 'inline',
	...rest
}: React.ComponentProps<typeof Field> & {
	label?: string;
	messages?: Array<FormMessageProps>;
	required?: React.InputHTMLAttributes<HTMLInputElement>['required'];
	type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
	placeholder?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
	size?: 'md' | 'lg';
	variant?: 'inline' | 'over' | 'default';
}) {
	const messComponent = useMemo(
		() =>
			messages?.map(
				({ name: messageName, className: innerClassName, ...restMessage }) => (
					<Message
						key={messageName}
						className={clsx('text-secondary-text text-sm', innerClassName)}
						{...restMessage}
					/>
				)
			),
		[messages]
	);

	return (
		<BaseField label={label} required={required} variant={variant} {...rest}>
			<Control asChild>
				<input
					type={type}
					defaultValue={defaultValue}
					required={required}
					placeholder={placeholder}
					className={clsx(
						'mt-1 block w-full rounded-md border',
						'data-[invalid]:border-red-1 border-stroke bg-secondary shadow-sm focus:border-indigo-500 focus:outline-none',
						size === 'md' && 'px-3 py-2',
						size === 'lg' && 'py-3 pl-5 pr-4'
					)}
				/>
			</Control>
		</BaseField>
	);
}

export default Input;
