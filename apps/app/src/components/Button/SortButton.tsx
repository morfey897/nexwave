import {
	BiSortAZ,
	BiSortZA,
	BiSortDown,
	BiSortUp,
	BiSolidSortAlt,
} from 'react-icons/bi';
import Button from '.';
import { IButtonProps } from '@/components/Button';
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
			className={clsx('hover:underline group', className)}
			iconAfter={
				<>
					<span className='w-[20px] h-[20px] group-hover:hidden group-focus:inline-block'>
						{!!Icon && <Icon size={20} />}
					</span>
					<span className='w-[20px] h-[20px] hidden group-hover:inline-block group-focus:hidden opacity-60'>
						{!!NextIcon && <NextIcon size={20} />}
					</span>
				</>
			}
		/>
	);
}

export default SortButton;
