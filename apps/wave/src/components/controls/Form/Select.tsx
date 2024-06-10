import clsx from 'clsx';
import { type IInputProps } from './BaseInput';
import Icon from './inner/Icon';
import Copy from './inner/Copy';
import Placeholder from './inner/Placeholder';

function Select({
	className,
	placeholder,
	required,
	icon,
	hint,
	children,
	hidePlaceholder,
	errorCopy,
	...props
}: IInputProps & React.InputHTMLAttributes<HTMLSelectElement>) {
	return (
		<div>
			<div className={clsx('relative', className)}>
				<Icon icon={icon} />
				<select
					className={clsx(
						'input cursor-pointer',
						'peer block w-full px-3 py-4',
						'rounded-lg border border-gray-400 dark:border-gray-600',
						'focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300',
						'bg-white dark:bg-gray-900',
						'text-gray-700 dark:text-gray-300',
						!!errorCopy && '!border-red-500',
						!!icon ? 'pl-12' : 'pl-4'
					)}
					required={required}
					{...props}
				>
					{children}
				</select>

				<Placeholder
					required={required}
					placeholder={placeholder}
					hidePlaceholder={hidePlaceholder}
					icon={icon}
					className={clsx(
						!!icon ? `w-[calc(100%-4.6rem)]` : `w-[calc(100%-2.6rem)]`
					)}
				/>
			</div>
			<Copy hint={hint} errorCopy={errorCopy} />
		</div>
	);
}

export default Select;
