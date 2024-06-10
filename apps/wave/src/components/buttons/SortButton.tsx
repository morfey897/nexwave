import {
	BiSortAZ,
	BiSortZA,
	BiSortDown,
	BiSortUp,
	BiSolidSortAlt,
} from 'react-icons/bi';
import Button from '.';
import { IButtonProps } from './Button';
import clsx from 'clsx';

function SortButton({
	comparator,
	as,
	className,
	...props
}: {
	comparator?: number;
	as: 'symbolic' | 'numeric';
} & IButtonProps &
	React.ButtonHTMLAttributes<HTMLButtonElement>) {
	let Icon;
	let NextIcon;
	if (typeof comparator === 'number' && comparator > 0) {
		Icon = as === 'symbolic' ? BiSortAZ : BiSortUp;
		NextIcon = as === 'symbolic' ? BiSortZA : BiSortDown;
	} else if (typeof comparator === 'number' && comparator < 0) {
		Icon = as === 'symbolic' ? BiSortZA : BiSortDown;
		NextIcon = BiSolidSortAlt;
	} else {
		NextIcon = as === 'symbolic' ? BiSortAZ : BiSortUp;
		Icon = BiSolidSortAlt;
	}
	return (
		<Button
			{...props}
			className={clsx('group hover:underline', className)}
			iconAfter={
				<>
					<span className='h-[20px] w-[20px] group-hover:hidden group-focus:inline-block'>
						{!!Icon && <Icon size={20} />}
					</span>
					<span className='hidden h-[20px] w-[20px] opacity-60 group-hover:inline-block group-focus:hidden'>
						{!!NextIcon && <NextIcon size={20} />}
					</span>
				</>
			}
		/>
	);
}

export default SortButton;
