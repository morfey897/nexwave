import clsx from 'clsx';
import { getPlaceholder, type InputProps } from './index';
import { useCallback, useRef } from 'react';

function BaseDuration({
	placeholder,
	required,
	icon,
	hint,
	className,
	errorCopy,
	hidePlaceholder,
	...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
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
			// console.log('target', target.value, numberValue);
			// // target.dataset.empty = String(target.value === '');
		},
		[],
	);

	return (
		<>
			<div className={clsx('relative', className)}>
				{!!icon && (
					<span
						className={clsx(
							'icon',
							'absolute inset-y-0 start-0 top-0 flex items-center ps-1 pointer-events-none mx-3',
							txtLabelClassName,
						)}
					>
						{icon}
					</span>
				)}

				{/*  py-4 px-3 */}
				<div className='grid grid-cols-6 w-full'>
					<input
						ref={inputRef}
						placeholder=' '
						className={clsx(
							'peer input col-span-4',
							'py-4 px-3',
							'border rounded-s-lg dark:border-gray-600',
							'focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40',
							bgClassName,
							txtInputClassName,
							!!errorCopy && '!border-red-500',
							!!icon ? 'pl-12' : 'pl-4',
						)}
						required={required}
						// type='text'
						// onChange={onInput}
						// onBlur={onBlur}
						type='number'
						min={0}
						{...(props as React.InputHTMLAttributes<HTMLInputElement>)}
					/>
					<label
						className={clsx(
							'label',
							'absolute top-4 px-1 pointer-events-none',
							!!icon ? 'ml-12' : 'ml-4',
							txtLabelClassName,
							bgClassName,
							'transform transition-all',
							hidePlaceholder
								? 'peer-focus:!opacity-0'
								: 'peer-focus:!-top-2 peer-focus:!text-xs peer-focus:!ml-4',
							hidePlaceholder
								? 'peer-[&:not(:placeholder-shown)]:!opacity-0'
								: 'peer-[&:not(:placeholder-shown)]:!-top-2 peer-[&:not(:placeholder-shown)]:!text-xs peer-[&:not(:placeholder-shown)]:!ml-4',
						)}
					>
						{getPlaceholder(placeholder, !!required)}
					</label>
					<select
						ref={selectRef}
						onChange={handleChange}
						className={clsx(
							'py-4 px-3 col-span-2',
							'border rounded-e-lg dark:border-gray-600',
							'focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40',
							bgClassName,
							txtInputClassName,
							!!errorCopy && '!border-red-500',
						)}
					>
						<option value='hh'>Hour</option>
						<option value='mm'>Minute</option>
					</select>
				</div>
			</div>
			{hint}
		</>
	);
}

export default BaseDuration;
