import * as Checkbox from '@radix-ui/react-checkbox';
import CheckIcon from '~/icons/CheckIcon';

const CheckboxSettings = ({ id, label, checked }) => (
	<div className='flex items-center'>
		<Checkbox.Root
			className='border-stroke bg-secondary flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] border outline-none'
			defaultChecked={checked}
			id={id}
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

export default CheckboxSettings;
