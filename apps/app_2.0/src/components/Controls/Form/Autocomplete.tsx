'use client';
import BaseInput, { type TInput } from './BaseInput';
import React, {
	useRef,
	useEffect,
	useState,
	useCallback,
	useMemo,
} from 'react';
import clsx from 'clsx';
// import Spinner from '@/components/Spinner';
import MiniSearch, { type SearchResult, type Options } from 'minisearch';
import { throttle } from 'lodash';

interface IOption {
	id: number | string;
	label: string;
}
type TAutocomplete<T> = {
	options?: Array<T>;
	searchOptions: Options<T>;
	isDisabled?: (option: T) => boolean;
	// renderOption?: (option: T, queryTerms: string[]) => React.ReactElement | null;
	// isClickable?: (option: TOption) => boolean;
};

const Label = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
	<span className={clsx('text-gray-7', className)} {...props} />
);

function RenderSearch({
	option,
	queryTerms,
}: {
	option: IOption;
	queryTerms: string[] | undefined;
}) {
	const label = option.label;
	if (queryTerms && queryTerms.length > 0) {
		const labelParts = label.split(
			new RegExp(`(${queryTerms.join('|')})`, 'gi')
		);
		return (
			<>
				{labelParts.map((part, index) => {
					if (!part) return null;
					const isMatch = queryTerms.includes(part.toLowerCase());
					return (
						<span
							key={index}
							className={clsx(
								isMatch
									? 'text-gray-7 font-semibold'
									: 'text-gray-700/60 dark:text-gray-300/60'
							)}
						>
							{part}
						</span>
					);
				})}
			</>
		);
	}
	return <Label>{label}</Label>;
}

function RenderOption({
	className,
	children,
	disabled,
	selected,
	...props
}: React.HTMLProps<HTMLLIElement>) {
	return (
		<li
			{...props}
			className={clsx(
				'px-3 py-2',
				!disabled
					? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
					: 'cursor-not-allowed',
				className
			)}
			role='option'
			aria-selected={selected} // Add aria-selected attribute
		>
			{children}
		</li>
	);
}

function Autocomplete<T extends IOption = IOption>({
	options,
	searchOptions,
	isDisabled,
	// renderOption,
	// isClickable,
	onChange,
	onFocus,
	onBlur,
	value: _value,
	defaultValue: _defaultValue,
	name,
	...props
}: TInput & TAutocomplete<T>) {
	const ulRef = useRef<HTMLUListElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const selectRef = useRef<HTMLInputElement | null>(null);
	const miniSearch = useRef<MiniSearch<T> | null>(null);
	const [isOpen, setOpen] = useState(false);
	const [filteredOptions, setFilteredOptions] = useState<
		Array<SearchResult> | undefined
	>(undefined);

	const onClose = useMemo(
		() =>
			throttle(() => {
				setOpen(false);
			}, 200),
		[]
	);

	useEffect(() => {
		if (!miniSearch.current) {
			miniSearch.current = new MiniSearch<T>(searchOptions);
		}
		if (options) {
			miniSearch.current.removeAll();
			miniSearch.current.addAll(options);
		}

		if (_defaultValue) {
			let option = options?.find((option) => option.id == _defaultValue);
			if (!option && _defaultValue.toString().length > 1) {
				const result = miniSearch.current
					?.search(_defaultValue.toString(), searchOptions.searchOptions)
					.sort((a, b) => b.score - a.score);
				if (result && result.length > 0) {
					option = result[0] as unknown as T;
				}
			}
			if (option) {
				if (inputRef.current) {
					inputRef.current.value = option.label || '';
				}
				if (selectRef.current) {
					selectRef.current.value = option.id.toString();
				}
			}
		}
	}, [options, searchOptions, _defaultValue]);

	const onInputFocus = useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			if (typeof onFocus === 'function') onFocus(event);
			const value = inputRef.current?.value || '';

			const result =
				value.length > 1
					? miniSearch.current?.search(value, searchOptions.searchOptions)
					: undefined;
			setFilteredOptions(result);
			onClose.cancel();
			setOpen(true);
		},
		[onFocus, searchOptions, onClose]
	);

	const onInputBlur = useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			if (typeof onBlur === 'function') onBlur(event);
			onClose();
		},
		[onBlur, onClose]
	);

	const onULFocus = useCallback(
		(event: React.FocusEvent<HTMLUListElement>) => {
			onClose.cancel();
			setOpen(true);
		},
		[onClose]
	);

	const onULBlur = useCallback(
		(event: React.FocusEvent<HTMLUListElement>) => {
			onClose();
		},
		[onClose]
	);

	const onInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (typeof onChange === 'function') onChange(event);
			const value = event.target.value;

			const result =
				value.length > 1
					? miniSearch.current?.search(value, searchOptions.searchOptions)
					: undefined;
			setFilteredOptions(result);
			if (selectRef.current) {
				selectRef.current.value = '';
			}
		},
		[onChange, searchOptions]
	);

	const onSelectedOption = useCallback(
		(option: T) => {
			if (selectRef.current) {
				selectRef.current.value = option.id.toString();
			}
			if (inputRef.current) {
				inputRef.current.value = option.label || '';
			}
			onClose.cancel();
			setOpen(false);
		},
		[onClose]
	);

	const drawList = useMemo(() => {
		if (filteredOptions)
			return filteredOptions.map((search, index) => {
				const option = search as unknown as T;
				const disabled = typeof isDisabled === 'function' && isDisabled(option);
				return (
					<RenderOption
						tabIndex={index + 1}
						key={option.id}
						onClick={disabled ? undefined : () => onSelectedOption(option)}
						disabled={disabled}
						selected={selectRef.current?.value === option.id.toString()}
					>
						<RenderSearch option={option} queryTerms={search.queryTerms} />
					</RenderOption>
				);
			});

		return options?.map((option, index) => {
			const disabled = typeof isDisabled === 'function' && isDisabled(option);
			return (
				<RenderOption
					tabIndex={index + 1}
					key={option.id}
					onClick={disabled ? undefined : () => onSelectedOption(option)}
					disabled={disabled}
					selected={selectRef.current?.value === option.id.toString()}
				>
					<Label>{option.label}</Label>
				</RenderOption>
			);
		});
	}, [filteredOptions, options, onSelectedOption, isDisabled]);

	useEffect(() => {
		let index = -1;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!isOpen) return;
			if (event.key === 'Escape') {
				setOpen(false);
				inputRef.current?.blur();
			}

			if (event.key === 'Enter') {
				let li = ulRef.current?.getElementsByTagName('li')[index];
				li?.click();
			}

			if (event.key === 'ArrowDown') {
				const list = ulRef.current?.getElementsByTagName('li');
				if (list && index < list.length - 1) {
					let li = list[++index];
					li?.focus();
				} else {
					index = -1;
					inputRef.current?.focus();
				}
			}
			if (event.key === 'ArrowUp') {
				const list = ulRef.current?.getElementsByTagName('li');
				if (list && index > 0) {
					let li = list[--index];
					li?.focus();
				} else {
					index = -1;
					inputRef.current?.focus();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<BaseInput
			{...props}
			name={`${name}-input`}
			ref={inputRef}
			onChange={onInputChange}
			onBlur={onInputBlur}
			onFocus={onInputFocus}
			autoComplete='off'
		>
			{/* <select name={name} className='hidden'>
				<option value=''>Select...</option>
				{options?.map((option) => (
					<option key={option.id} value={option.id}>
						{option.label}
					</option>
				))}
			</select> */}
			<input type='hidden' ref={selectRef} name={name} />
			<ul
				onFocus={onULFocus}
				onBlur={onULBlur}
				ref={ulRef}
				className={clsx(
					'absolute w-full bg-white dark:bg-gray-900',
					'overflow-y-auto',
					'divide-y divide-gray-200 dark:divide-gray-700',
					'rounded-ee-lg rounded-es-lg',
					'max-h-0 transition-all ease-out',
					isOpen ? 'max-h-40' : 'max-h-0'
				)}
			>
				{drawList}
			</ul>
		</BaseInput>
	);
}

export default Autocomplete;
