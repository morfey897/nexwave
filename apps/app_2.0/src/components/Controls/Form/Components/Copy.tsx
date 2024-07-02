import clsx from 'clsx';
import { type IInputProps } from '../BaseInput';

function Copy({
	className,
	hint,
	errorCopy,
}: IInputProps & { className?: string }) {
	const isErrored = !!errorCopy;
	const isHinted = !!hint;
	return isErrored || isHinted ? (
		<div
			role='tooltip'
			className={clsx(
				'mx-1.5 mt-px hyphens-auto break-words text-xs',
				isErrored && 'text-red-500 dark:text-red-400',
				className
			)}
		>
			{isErrored ? errorCopy : hint}
		</div>
	) : null;
}

export default Copy;
