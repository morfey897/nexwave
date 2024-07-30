import React from 'react';
import { Label } from '@radix-ui/react-form';
import clsx from 'clsx';

const OverLabel = ({
	label,
	required,
	className,
}: {
	label?: string;
	required?: boolean;
	className?: string;
}) => (
	<Label className={clsx('text-primary-text text-sm font-medium', className)}>
		{label}
		{required && <span className='text-red-1 ml-1 mt-1'>*</span>}
	</Label>
);

export default OverLabel;
