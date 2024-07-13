import * as Checkbox from '@radix-ui/react-checkbox';
import { useId } from 'react';
import CheckIcon from '~/icons/CheckIcon';

const CheckboxFilter = ({
	label,
	name,
	checked,
}: {
	name: string;
	label: string;
	checked?: boolean;
}) => {
	const id = useId();
	return (
		<div className='flex items-center'>
			<Checkbox.Root
				className='border-stroke flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] border bg-white outline-none'
				defaultChecked={checked}
				name={name}
				id={id}
			>
				<Checkbox.Indicator className='text-violet11'>
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<label
				className='font-inter text-primary-text-gray pl-[15px] text-[15px] text-base font-normal leading-6 text-black'
				htmlFor={id}
			>
				{label}
			</label>
		</div>
	);
};

export default CheckboxFilter;