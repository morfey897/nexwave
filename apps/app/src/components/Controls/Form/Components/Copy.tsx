import clsx from 'clsx';
import { InputProps } from '../utils';

function Copy({
	className,
	hint,
	errorCopy,
}: InputProps & { className?: string }) {
	const isErrored = !!errorCopy;
	const isHinted = !!hint;
	return isErrored || isHinted ? (
		<div
			role='tooltip'
			className={clsx(
				'text-xs break-words hyphens-auto mt-px mx-1.5',
				isErrored && 'text-red-500 dark:text-red-400',
				className,
			)}
		>
			{isErrored ? errorCopy : hint}
		</div>
	) : null;
}

export default Copy;
