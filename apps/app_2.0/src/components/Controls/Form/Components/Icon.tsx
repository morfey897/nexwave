import clsx from 'clsx';
import { type IInputProps } from '../BaseInput';
function Icon({ className, icon }: IInputProps & { className?: string }) {
	return icon ? (
		<span
			className={clsx(
				'icon',
				'pointer-events-none absolute inset-y-0 start-0 top-0 mx-3 flex items-center ps-1',
				'text-gray-400 dark:text-gray-500',
				className
			)}
		>
			{icon}
		</span>
	) : null;
}

export default Icon;
