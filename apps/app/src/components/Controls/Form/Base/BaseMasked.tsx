import clsx from 'clsx';
import { getPlaceholder, type InputProps } from './index';
import { useEffect, useRef } from 'react';

function BaseMasked({
	placeholder,
	required,
	icon,
	hint,
	className,
	errorCopy,
	hidePlaceholder,
	maskOptions,
	...props
}: InputProps &
	React.InputHTMLAttributes<HTMLInputElement> & {
		maskOptions: any;
	}) {
	const inputRef = useRef<HTMLInputElement>(null);
	const bgClassName = clsx('bg-white dark:bg-gray-900');
	const txtLabelClassName = clsx('text-gray-400 dark:text-gray-500');
	const txtInputClassName = clsx('text-gray-700 dark:text-gray-300');

	useEffect(() => {
		// if (!inputMaskInstance.current) {
		// 	inputMaskInstance.current = InputMask(maskOptions);
		// }
		// if (inputRef.current && inputMaskInstance.current) {
		// 	inputMaskInstance.current?.mask(inputRef.current);
		// }
		// console.log('maskOptions', maskOptions, window?.navigator);
		// if (inputRef.current) {
		// 	InputMask({mask: '99:99'}).mask(inputRef.current);
		// }

		async function load() {
			if (inputRef.current) {
				let { default: Inputmask } = await import('inputmask');
				console.log(Inputmask);
				let im = Inputmask(maskOptions);
				im.mask(inputRef.current);
			}
		}

		load();

		// eslint-disable-next-line react-hooks/exhaustive-deps
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

				<input
					ref={inputRef}
					placeholder=' '
					className={clsx(
						'input',
						'peer block w-full py-4 px-3',
						'border rounded-lg dark:border-gray-600',
						'focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40',
						bgClassName,
						txtInputClassName,
						!!errorCopy && '!border-red-500',
						!!icon ? 'pl-12' : 'pl-4',
					)}
					required={required}
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
			</div>
			{hint}
		</>
	);
}

export default BaseMasked;
