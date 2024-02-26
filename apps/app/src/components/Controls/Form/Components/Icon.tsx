import clsx from 'clsx';
import { InputProps } from '../utils';
function Icon({ className, icon }: InputProps & { className?: string }) {
	return icon ? (
		<span
			className={clsx(
				'icon',
				'absolute inset-y-0 start-0 top-0 flex items-center ps-1 pointer-events-none mx-3',
				'text-gray-400 dark:text-gray-500',
				className,
			)}
		>
			{icon}
		</span>
	) : null;
}

export default Icon;
