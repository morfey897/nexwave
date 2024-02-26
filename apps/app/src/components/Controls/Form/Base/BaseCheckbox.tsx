import clsx from 'clsx';
import { getPlaceholder, type InputProps } from './index';

function BaseCheckbox({
	placeholder,
	required,
	icon,
	hint,
	className,
	errorCopy,
	hidePlaceholder,
	disabled,
	...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
	const txtLabelClassName = clsx('text-gray-400 dark:text-gray-500');
	return (
		<>
			<div className={clsx('relative', className)}>
				<label
					className={clsx(
						'flex w-fit items-center gap-x-3',
						txtLabelClassName,
						disabled ? 'cursor-not-allowed' : 'cursor-pointer',
					)}
				>
					<input
						type='checkbox'
						className={clsx(
							'w-8 h-8 rounded-lg cursor-pointer disabled:cursor-not-allowed group',
							!!errorCopy && '!border-2 !border-red-500',
							'!border-2 !border-gray-300 !dark:border-gray-600',
							'focus:!ring-0 focus:!outline-0 focus:!shadow-none',
							'!ring-0 !outline-0 !outline-transparent !ring-transparent',
							'text-blue-500 hover:text-blue-600 dark:hover:text-blue-500 dark:text-blue-600 disabled:text-blue-400 disabled:hover:text-blue-400 disabled:dark:text-blue-700 disabled:dark:hover:text-blue-700',
						)}
						disabled={disabled}
						{...props}
					/>

					<span>
						{placeholder}
						{!!icon && (
							<span
								className={clsx(
									'icon',
									'inline-block pointer-events-none mx-0.5 align-super',
									txtLabelClassName,
								)}
							>
								{icon}
							</span>
						)}
					</span>
				</label>
			</div>
			{hint}
		</>
	);
}

export default BaseCheckbox;
