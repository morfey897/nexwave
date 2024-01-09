import clsx from 'clsx';

function Select({
	hint,
	icon,
	className,
	errorCopy,
	placeholder,
	required,
	children,
	...props
}: {
	icon?: React.ReactNode;
	hint?: React.ReactNode;
	errorCopy?: string | undefined | boolean;
} & React.InputHTMLAttributes<HTMLSelectElement>) {
	return (
		<div>
			<div className='relative flex items-center'>
				<span className='absolute text-gray-300 dark:text-gray-500 mx-3'>
					{icon}
				</span>

				<select
					id='small'
					className={clsx(
						'box-border block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40',
						'dark:border-gray-600',
						!!errorCopy && '!border-red-500',
						className,
					)}
					required={required}
          {...props}
				>
					{children}
				</select>
			</div>
			<div className='flex justify-end'>{hint}</div>
			<p className='text-xs text-gray-400 dark:text-gray-500 break-words hyphens-auto'>
				{errorCopy}
			</p>
		</div>
	);
}

export default Select;
