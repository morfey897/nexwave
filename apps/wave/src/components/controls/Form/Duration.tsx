'use client';
import clsx from 'clsx';
import { type IInputProps } from './BaseInput';
import { useCallback, useRef } from 'react';
import Copy from './inner/Copy';
import Placeholder from './inner/Placeholder';
import Icon from './inner/Icon';

function BaseDuration({
	placeholder,
	required,
	icon,
	hint,
	className,
	errorCopy,
	hidePlaceholder,
	...props
}: IInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
	const selectRef = useRef<HTMLSelectElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const bgClassName = clsx('bg-white dark:bg-gray-900');
	const txtLabelClassName = clsx('text-gray-400 dark:text-gray-500');
	const txtInputClassName = clsx('text-gray-700 dark:text-gray-300');

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const convertTo = event.target.value;
			const numberValue = Number.parseFloat(inputRef.current?.value || '');
			if (!Number.isNaN(numberValue)) {
				if (convertTo === 'mm') {
					inputRef.current!.value = (numberValue * 60)
						.toString()
						.replace(/\,/, '.');
				} else if (convertTo === 'hh') {
					inputRef.current!.value = (numberValue / 60)
						.toString()
						.replace(/\,/, '.');
				}
			}
		},
		[]
	);

	return (
		<div className='relative'>
			<div className={clsx('relative', className)}>
				<Icon icon={icon} />
				<div className='grid w-full grid-cols-6'>
					<input
						ref={inputRef}
						placeholder=' '
						className={clsx(
							'input peer col-span-4',
							'px-3 py-4',
							'rounded-s-lg border dark:border-gray-600',
							'focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300',
							bgClassName,
							txtInputClassName,
							!!errorCopy && '!border-red-500',
							!!icon ? 'pl-12' : 'pl-4'
						)}
						required={required}
						type='number'
						min={0}
						{...(props as React.InputHTMLAttributes<HTMLInputElement>)}
					/>
					<Placeholder
						icon={icon}
						hidePlaceholder={hidePlaceholder}
						placeholder={placeholder}
						required={required}
					/>
					<select
						ref={selectRef}
						onChange={handleChange}
						className={clsx(
							'col-span-2 px-3 py-4',
							'rounded-e-lg border dark:border-gray-600',
							'focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300',
							bgClassName,
							txtInputClassName,
							!!errorCopy && '!border-red-500'
						)}
					>
						<option value='hh'>Hour</option>
						<option value='mm'>Minute</option>
					</select>
				</div>
			</div>
			<Copy hint={hint} errorCopy={errorCopy} />
		</div>
	);
}

export default BaseDuration;
