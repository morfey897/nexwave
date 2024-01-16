import clsx from 'clsx';
import { type InputProps, getPlaceholder } from './index';
import { useCallback, useEffect, useRef } from 'react';

function BaseSelect({
	className,
	placeholder,
	required,
	icon,
	hint,
	children,
	hidePlaceholder,
	errorCopy,
	onChange,
	...props
}: InputProps<HTMLSelectElement>) {
	const ref = useRef<HTMLSelectElement>(null);
	const bgClassName = clsx('bg-white dark:bg-gray-900');
	const txtLabelClassName = clsx('text-gray-400 dark:text-gray-500');
	const txtInputClassName = clsx('text-gray-700 dark:text-gray-300');

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			if (typeof onChange === 'function') {
				onChange(event);
			}
			const target = event.target;
			target.dataset.empty = String(target.value === '');
		},
		[onChange],
	);

	useEffect(() => {
		if (ref.current) {
			ref.current.dataset.empty = String(ref.current.value === '');
		}
	}, []);

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

				<select
					ref={ref}
					onChange={handleChange}
					className={clsx(
						'input cursor-pointer',
						'peer block w-full py-4 px-3',
						'border rounded-lg dark:border-gray-600',
						'focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40',
						bgClassName,
						txtInputClassName,
						!!errorCopy && '!border-red-500',
						!!icon ? 'pl-12' : 'pl-4',
					)}
					required={required}
					{...(props as React.InputHTMLAttributes<HTMLSelectElement>)}
				>
					{children}
				</select>

				<label
					className={clsx(
						'label',
						'absolute top-4 px-1 pointer-events-none',
						!!icon ? 'ml-12' : 'ml-4',
						!!icon ? `w-[calc(100%-4.6rem)]` : `w-[calc(100%-2.6rem)]`,
						txtLabelClassName,
						bgClassName,
						'transform transition-all',
						hidePlaceholder
							? 'peer-focus:!opacity-0'
							: 'peer-focus:!-top-2 peer-focus:!text-xs peer-focus:!ml-4 peer-focus:!w-fit',
						hidePlaceholder
							? 'peer-[&:not(:invalid)]:!opacity-0'
							: 'peer-[&[data-empty="false"]]:!-top-2 peer-[&[data-empty="false"]]:!text-xs peer-[&[data-empty="false"]]:!ml-4 peer-[&[data-empty="false"]]:!w-fit',
					)}
				>
					{getPlaceholder(placeholder, !!required)}
				</label>
			</div>
			{hint}
		</>
	);
}

export default BaseSelect;
