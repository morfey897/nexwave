'use client';
import { useCallback, useState, useRef } from 'react';
import { type IInputProps } from './BaseInput';
import clsx from 'clsx';
import { HiX } from 'react-icons/hi';

function BaseFile({
	className,
	placeholder,
	required,
	icon,
	hint,
	onChange,
	errorCopy,
	disabled,
	...props
}: IInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
	const ref = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<string | null>(null);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (typeof onChange === 'function') {
				onChange(event);
			}
			const fileList = event.target.files || [];
			if (fileList.length > 0) {
				setFile(URL.createObjectURL(fileList[0]));
			} else {
				setFile(null);
			}
		},
		[onChange],
	);

	return (
		<div className={clsx('relative', className)}>
			<label
				className={clsx(
					'flex flex-col items-center text-center border-2 border-dashed',
					'bg-white dark:bg-gray-900',
					'rounded-lg py-4 px-3',
					!disabled &&
						'dark:hover:border-blue-300 hover:border-blue-300 cursor-pointer',
				)}
			>
				<span className='text-gray-300 dark:text-gray-500 mx-3 relative'>
					{!!file ? (
						<>
							<picture>
								<img
									src={file}
									alt=''
									className='max-h-16 rounded-md border border-slate-500 dark:border-slate-400 bg-slate-200 dark:bg-slate-900'
								/>
							</picture>
							<button
								onClick={(event) => {
									event.preventDefault();
									if (ref.current) {
										ref.current.value = '';
										setFile(null);
									}
								}}
								className='text-white absolute -top-0.5 -right-0.5 p-0.5 rounded-full bg-red-200 dark:bg-red-800'
							>
								<HiX size={16} />
							</button>
						</>
					) : (
						icon
					)}
				</span>

				<p className='mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200'>
					{required ? (
						<>
							{`${placeholder || 'Required'}`}
							<span className='text-base ml-1 mt-1 text-red-300'>*</span>
						</>
					) : (
						placeholder
					)}
				</p>

				<span className='mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400'>
					{hint}
				</span>

				<input
					ref={ref}
					onChange={handleChange}
					type='file'
					className='hidden'
					{...props}
				/>
			</label>
		</div>
	);
}

export default BaseFile;
