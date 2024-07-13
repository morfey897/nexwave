import React, { use, useMemo } from 'react';
import {
	Control,
	Field,
	Label,
	Message,
	type FormMessageProps,
} from '@radix-ui/react-form';
import clsx from 'clsx';

function Input({
	required,
	label,
	className,
	messages,
	type,
	defaultValue,
	placeholder,
	...rest
}: React.ComponentProps<typeof Field> & {
	label: string;
	messages?: Array<FormMessageProps>;
	required?: React.InputHTMLAttributes<HTMLInputElement>['required'];
	type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
	placeholder?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
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
		<Field className='relative' {...rest}>
			<Label className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'>
				{label}
				{!!required && <span className='text-red-1 ml-1 mt-1'>*</span>}
			</Label>
			<Control asChild>
				<input
					type={type}
					defaultValue={defaultValue}
					required={required}
					placeholder={placeholder}
					className='data-[invalid]:border-red-1 border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</Control>
			{messComponent}
		</Field>
	);
}

export default Input;
