import React, { useMemo } from 'react';
import { Field, Message, type FormMessageProps } from '@radix-ui/react-form';
import clsx from 'clsx';
import { InlineLabel, OverLabel } from '../labels';

function BaseField({
	required,
	label,
	className,
	messages,
	variant,
	children,
	...rest
}: React.ComponentProps<typeof Field> & {
	label?: string;
	messages?: Array<FormMessageProps>;
	required?: React.InputHTMLAttributes<HTMLInputElement>['required'];
	variant?: 'inline' | 'over' | 'default';
	children: React.ReactNode;
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
		<Field className={clsx('relative', className)} {...rest}>
			{variant === 'inline' && (
				<InlineLabel label={label} required={required} />
			)}
			{variant === 'over' && (
				<div className='flex items-end justify-between gap-2 [&_label]:shrink-0'>
					<OverLabel label={label} required={required} />
					{messComponent}
				</div>
			)}
			{children}
			{variant === 'inline' && messComponent}
		</Field>
	);
}

export default BaseField;
