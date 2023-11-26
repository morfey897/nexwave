'use client';
import clsx from 'clsx';
import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { TWrapperProps } from '@/types/view';
import { useMemo, useEffect, useCallback, useRef, ChangeEvent } from 'react';
import { throttle } from 'lodash';

function Search({
	onChange,
	wait = 500,
	wrapperClassName,
	className,
	type,
	...props
}: { onChange?: (input: string) => void; wait?: number } & TWrapperProps &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
	const ref = useRef<HTMLInputElement>(null);
	const onClear = useCallback(() => {
		const input = ref.current;
		if (input) {
			input.value = '';
			if (typeof onChange === 'function') {
				onChange('');
			}
		}
	}, [onChange]);

	const onInternalChange = useMemo(
		() =>
			throttle(
				(event: React.ChangeEvent<HTMLInputElement>) => {
					const value = event.target.value;
					if (typeof onChange === 'function') {
						onChange(value);
					}
				},
				wait,
				{ leading: true },
			),
		[wait, onChange],
	);

	useEffect(() => {
		return () => {
			onInternalChange.cancel();
		};
	}, [onInternalChange]);

	return (
		<div className={clsx('relative text-base', wrapperClassName)}>
			<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
				<HiOutlineSearch size={16} />
			</span>

			<input
				ref={ref}
				onChange={onInternalChange}
				className={clsx(
					'peer/input w-full text-sm py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300',
					className,
				)}
				type={type || 'text'}
				{...props}
			/>

			<button
				className='absolute inset-y-0 right-0 flex items-center pr-3 peer-[&:placeholder-shown]/input:hidden'
				onClick={onClear}
			>
				<HiX size={16} />
			</button>
		</div>
	);
}

export default Search;
