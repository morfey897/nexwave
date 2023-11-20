import {
	BiSortAZ,
	BiSortZA,
	BiSortDown,
	BiSortUp,
	BiSolidSortAlt,
} from 'react-icons/bi';
import clsx from 'clsx';

export function SortButton({
	comparator,
	variant,
	className,
	children,
	...props
}: {
	comparator?: 1 | 0 | -1;
	variant: 'symbolic' | 'numeric';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	let Icon;
	let NextIcon;
	if (comparator === 1) {
		Icon = variant === 'symbolic' ? BiSortAZ : BiSortUp;
		NextIcon = variant === 'symbolic' ? BiSortZA : BiSortDown;
	} else if (comparator === -1) {
		Icon = variant === 'symbolic' ? BiSortZA : BiSortDown;
		NextIcon = BiSolidSortAlt;
	} else {
		NextIcon = variant === 'symbolic' ? BiSortAZ : BiSortUp;
		Icon = BiSolidSortAlt;
	}

	return (
		<button
			className={clsx(
				'flex items-center gap-x-2 hover:underline group',
				className,
			)}
			{...props}
		>
			<span>{children}</span>
			<span className='w-[20px] h-[20px] group-hover:hidden group-focus:inline-block'>
				{!!Icon && <Icon size={20} />}
			</span>
			<span className='w-[20px] h-[20px] hidden group-hover:inline-block group-focus:hidden opacity-60'>
				{!!NextIcon && <NextIcon size={20} />}
			</span>
		</button>
	);
}
