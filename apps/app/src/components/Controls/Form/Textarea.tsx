import clsx from 'clsx';
import { type IInputProps } from './BaseInput';
import Copy from './Components/Copy';
import Icon from './Components/Icon';
import Placeholder from './Components/Placeholder';

function Textarea({
	placeholder,
	required,
	icon,
	hint,
	className,
	errorCopy,
	hidePlaceholder,
	...props
}: IInputProps & React.InputHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<div className='relative'>
			<div className={clsx('relative', className)}>
				<Icon icon={icon} />
				<textarea
					placeholder=' '
					className={clsx(
						'input',
						'peer block w-full py-4 px-3',
						'border rounded-lg border-gray-400 dark:border-gray-600',
						'focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40',
						'bg-white dark:bg-gray-900',
						'text-gray-700 dark:text-gray-300',
						!!errorCopy && '!border-red-500',
						!!icon ? 'pl-12' : 'pl-4',
					)}
					required={required}
					{...props}
				/>
				<Placeholder
					icon={icon}
					hidePlaceholder={hidePlaceholder}
					placeholder={placeholder}
					required={required}
				/>
			</div>
			<Copy hint={hint} errorCopy={errorCopy} />
		</div>
	);
}

export default Textarea;
