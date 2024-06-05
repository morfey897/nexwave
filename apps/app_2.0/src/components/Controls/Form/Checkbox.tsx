import clsx from 'clsx';
import { type IInputProps } from './BaseInput';
import Copy from './Components/Copy';

function Checkbox({
	placeholder,
	required,
	icon,
	hint,
	className,
	errorCopy,
	hidePlaceholder,
	disabled,
	...props
}: IInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
	const txtLabelClassName = clsx('text-gray-4 dark:text-gray-500');
	return (
		<div className={clsx('relative', className)}>
			<div className='relative'>
				<label
					className={clsx(
						'label',
						'flex w-fit items-center gap-x-3',
						txtLabelClassName,
						disabled ? 'cursor-not-allowed' : 'cursor-pointer'
					)}
				>
					<input
						type='checkbox'
						className={clsx(
							'input',
							'group h-8 w-8 cursor-pointer rounded-lg disabled:cursor-not-allowed',
							!!errorCopy && '!border-2 !border-red-500',
							'!dark:border-gray-600 !border-2 !border-gray-300',
							'focus:!shadow-none focus:!outline-0 focus:!ring-0',
							'!outline-0 !outline-transparent !ring-0 !ring-transparent',
							'text-blue-500 hover:text-blue-600 disabled:text-blue-400 disabled:hover:text-blue-400 dark:text-blue-600 dark:hover:text-blue-500 disabled:dark:text-blue-700 disabled:dark:hover:text-blue-700'
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
									'pointer-events-none mx-0.5 inline-block align-super',
									txtLabelClassName
								)}
							>
								{icon}
							</span>
						)}
					</span>
				</label>
			</div>
			<Copy hint={hint} errorCopy={errorCopy} />
		</div>
	);
}

export default Checkbox;
