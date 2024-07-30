import React from 'react';
import { Label } from '@radix-ui/react-form';
import clsx from 'clsx';

const InlineLabel = ({
	label,
	required,
	className,
}: {
	label?: string;
	required?: boolean;
	className?: string;
}) => (
	<Label
		className={clsx(
			'text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm',
			className
		)}
	>
		{label}
		{!!required && <span className='text-red-1 ml-1 mt-1'>*</span>}
	</Label>
);

export default InlineLabel;
