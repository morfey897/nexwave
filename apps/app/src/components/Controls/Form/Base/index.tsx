import React from 'react';
import File from './BaseFile';
import Input from './BaseInput';
import Select from './BaseSelect';
import Textarea from './BaseTextarea';
import Checkbox from './BaseCheckbox';

type UnionComponent = 'input' | 'select' | 'textarea' | 'file' | 'checkbox';

export type InputProps<T> = {
	hint?: React.ReactNode;
	icon?: React.ReactNode;
	errorCopy?: string | undefined | boolean;
	className?: string;
	placeholder?: string;
	required?: boolean;
	hidePlaceholder?: boolean;
} & React.InputHTMLAttributes<T>;

export const getPlaceholder = (
	placeholder: string | undefined,
	required?: boolean,
) => {
	if (!!required) return `${placeholder || 'Required'} *`;
	return placeholder;
};

function Base<
	T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
>({
	component = 'input',
	errorCopy,
	...props
}: InputProps<T> & { component?: UnionComponent }) {
	return (
		<div>
			<div className='relative'>
				{/* Render input */}
				{component === 'input' && (
					<Input
						errorCopy={errorCopy}
						{...(props as React.InputHTMLAttributes<HTMLInputElement>)}
					/>
				)}
				{/* Render select */}
				{component === 'select' && (
					<Select
						errorCopy={errorCopy}
						{...(props as React.InputHTMLAttributes<HTMLSelectElement>)}
					/>
				)}
				{/* Render text area */}
				{component === 'textarea' && (
					<Textarea
						errorCopy={errorCopy}
						{...(props as React.InputHTMLAttributes<HTMLTextAreaElement>)}
					/>
				)}
				{/* Render file upload */}
				{component === 'file' && (
					<File
						errorCopy={errorCopy}
						{...(props as React.InputHTMLAttributes<HTMLInputElement>)}
					/>
				)}
				{/* Render checkbox */}
				{component === 'checkbox' && (
					<Checkbox
						errorCopy={errorCopy}
						{...(props as React.InputHTMLAttributes<HTMLInputElement>)}
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
