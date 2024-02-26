import React from 'react';
import File from './BaseFile';
import Input from './BaseInput';
import Select from './BaseSelect';
import Textarea from './BaseTextarea';
import Checkbox from './BaseCheckbox';
import Duration from './BaseDuration';
import Masked from './BaseMasked';

type UnionComponent =
	| 'input'
	| 'select'
	| 'textarea'
	| 'file'
	| 'checkbox'
	| 'duration'
	| 'masked';

export type InputProps = {
	hint?: React.ReactNode;
	icon?: React.ReactNode;
	errorCopy?: string | undefined | boolean;
	className?: string;
	placeholder?: string;
	required?: boolean;
	hidePlaceholder?: boolean;
};

export const getPlaceholder = (
	placeholder: string | undefined,
	required?: boolean,
) => {
	if (!!required) return `${placeholder || 'Required'} *`;
	return placeholder;
};

function Base<
	T extends
		| Parameters<typeof Input>[0]
		| Parameters<typeof File>[0]
		| Parameters<typeof Select>[0]
		| Parameters<typeof Textarea>[0]
		| Parameters<typeof Checkbox>[0]
		| Parameters<typeof Masked>[0],
>({
	component = 'input',
	errorCopy,
	...props
}: T & InputProps & { component?: UnionComponent }) {
	return (
		<div>
			<div className='relative'>
				{/* Render input */}
				{component === 'input' && (
					<Input
						errorCopy={errorCopy}
						{...(props as unknown as Parameters<typeof Input>[0])}
					/>
				)}
				{/* Render select */}
				{component === 'select' && (
					<Select
						errorCopy={errorCopy}
						{...(props as unknown as Parameters<typeof Select>[0])}
					/>
				)}
				{/* Render text area */}
				{component === 'textarea' && (
					<Textarea
						errorCopy={errorCopy}
						{...(props as unknown as Parameters<typeof Textarea>[0])}
					/>
				)}
				{/* Render file upload */}
				{component === 'file' && (
					<File
						errorCopy={errorCopy}
						{...(props as unknown as Parameters<typeof File>[0])}
					/>
				)}
				{/* Render checkbox */}
				{component === 'checkbox' && (
					<Checkbox
						errorCopy={errorCopy}
						{...(props as unknown as Parameters<typeof Checkbox>[0])}
					/>
				)}
				{/* Render duration */}
				{component === 'duration' && (
					<Duration
						errorCopy={errorCopy}
						{...(props as unknown as Parameters<typeof Duration>[0])}
					/>
				)}
				{/* Render masked */}
				{component === 'masked' && (
					<Masked
						errorCopy={errorCopy}
						{...(props as unknown as Parameters<typeof Masked>[0])}
					/>
				)}
			</div>
			<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto'>
				{errorCopy}
			</p>
		</div>
	);
}

export default Base;
