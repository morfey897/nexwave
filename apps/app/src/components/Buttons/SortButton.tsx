import {
	BiSortAZ,
	BiSortZA,
	BiSortDown,
	BiSortUp,
	BiSolidSortAlt,
} from 'react-icons/bi';
import Button from '.';
import { IButtonProps } from '@/types/view';

function SortButton({
	comparator,
	as,
	...props
}: {
	comparator?: 1 | 0 | -1;
	as: 'symbolic' | 'numeric';
} & IButtonProps &
	React.ButtonHTMLAttributes<HTMLButtonElement>) {
	let Icon;
	let NextIcon;
	if (comparator === 1) {
		Icon = as === 'symbolic' ? BiSortAZ : BiSortUp;
		NextIcon = as === 'symbolic' ? BiSortZA : BiSortDown;
	} else if (comparator === -1) {
		Icon = as === 'symbolic' ? BiSortZA : BiSortDown;
		NextIcon = BiSolidSortAlt;
	} else {
		NextIcon = as === 'symbolic' ? BiSortAZ : BiSortUp;
		Icon = BiSolidSortAlt;
	}
	return (
		<Button
			{...props}
			className='hover:underline group'
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
