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
	...rest
}: React.ComponentProps<typeof Field> & {
	label: string;
	messages?: Array<FormMessageProps>;
	required?: React.InputHTMLAttributes<HTMLInputElement>['required'];
	type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
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
		<Field className={clsx('mb-[10px] grid', className)} {...rest}>
			<div className='flex items-baseline justify-between'>
				<Label className='text-primary-text text-sm font-medium'>
					{label}
					{required && <span className='text-red-1 ml-1 mt-1'>*</span>}
				</Label>
				{messComponent}
			</div>
			<Control asChild>
				<input
					type={type}
					className='bg-secondary border-stroke data-[invalid]:border-red-1 inline-flex rounded-md border py-3 pl-5 pr-4 text-base'
					required={required}
				/>
			</Control>
		</Field>
	);
}

export default Input;
