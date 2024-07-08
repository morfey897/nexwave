import * as Checkbox from '@radix-ui/react-checkbox';
import { useId } from 'react';
import CheckIcon from '~/icons/CheckIcon';

const CheckboxSettings = ({
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
				className='border-stroke bg-secondary flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] border outline-none'
				defaultChecked={checked}
				id={id}
				name={name}
			>
				<Checkbox.Indicator>
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<label
				className='font-inter pl-[15px] text-[15px] text-base font-normal leading-6'
				htmlFor={id}
			>
				{label}
			</label>
		</div>
	);
};

export default CheckboxSettings;
