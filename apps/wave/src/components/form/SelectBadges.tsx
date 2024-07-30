import React from 'react';
import { Field, type FormMessageProps } from '@radix-ui/react-form';
import clsx from 'clsx';
import Select, { OptionsOrGroups, GroupBase, PropsValue } from 'react-select';
import { EnumLevel } from '~/constants/enums';
import BaseField from './field';
import { BadgeProps } from '~/components/badges/Badge';

function SelectBadge({
	required,
	label,
	className,
	type,
	defaultValue,
	noOptionsMessage,
	placeholder,
	size = 'md',
	variant = 'inline',
	isMulti = true,
	isSearchable = false,
	options,
	name,
	...rest
}: Omit<React.ComponentProps<typeof Field>, 'defaultValue'> & {
	label?: string;
	messages?: Array<FormMessageProps>;
	required?: React.InputHTMLAttributes<HTMLInputElement>['required'];
	type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
	noOptionsMessage?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
	placeholder?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
	size?: 'md' | 'lg';
	variant?: 'inline' | 'over' | 'default';
	isMulti?: boolean;
	isSearchable?: boolean;
	options?: OptionsOrGroups<BadgeProps, GroupBase<BadgeProps>>;
	defaultValue?: PropsValue<BadgeProps>;
}) {
	return (
		<BaseField
			label={label}
			required={required}
			variant={variant}
			name={`${name}-shadow`}
			{...rest}
		>
			<Select
				name={name}
				noOptionsMessage={() => noOptionsMessage || 'No options'}
				defaultValue={defaultValue}
				placeholder={placeholder}
				options={options}
				classNames={{
					menu: (state) => '!mt-1 !bg-secondary',
					control: (state) =>
						clsx(
							'!bg-secondary !rounded-md !border !shadow-sm',
							state.isFocused ? '!border-indigo-500' : '!border-stroke',
							size === 'md' && 'px-3 py-1',
							size === 'lg' && 'py-1.5 pl-5 pr-4'
						),
					valueContainer: (state) => '!p-0 !bg-transparent',
					placeholder: (state) => '!text-secondary-text !m-0',
					multiValue: (state) =>
						'!rounded-full !bg-transparent border-2 !border-primary',
					multiValueLabel: (state) =>
						clsx('!rounded-s-full !text-xs !py-1 !px-2.5 dark:!bg-dark-3', {
							'!text-green-2 !bg-green-8 dark:!text-green-1':
								state.data.level === EnumLevel.SUCCESS,
							'!text-yellow-2 !bg-yellow-7 dark:!text-yellow-1':
								state.data.level === EnumLevel.WARN,
							'!text-cyan-2 !bg-cyan-5 dark:!text-cyan-1':
								state.data.level === EnumLevel.INFO,
							'!text-red-2 !bg-red-8 dark:!text-red-1':
								state.data.level === EnumLevel.CRIT,
						}),
					multiValueRemove: (state) =>
						clsx('!rounded-e-full dark:hover:!text-white dark:!bg-dark-3', {
							'!text-green-2 !bg-green-8 dark:!text-green-1 hover:!bg-green-5':
								state.data.level === EnumLevel.SUCCESS,
							'!text-yellow-2 !bg-yellow-7 dark:!text-yellow-1 hover:!bg-yellow-5':
								state.data.level === EnumLevel.WARN,
							'!text-cyan-2 !bg-cyan-5 dark:!text-cyan-1 hover:!bg-cyan-4':
								state.data.level === EnumLevel.INFO,
							'!text-red-2 !bg-red-8 dark:!text-red-1 hover:!bg-red-5':
								state.data.level === EnumLevel.CRIT,
						}),
					option: (state) =>
						'!flex !items-center !bg-secondary hover:!bg-primary !cursor-pointer',
				}}
				isMulti={isMulti}
				isSearchable={isSearchable}
			/>
		</BaseField>
	);
}

export default SelectBadge;
