import * as Checkbox from '@radix-ui/react-checkbox';
import { useId } from 'react';
import CheckIcon from '~/icons/CheckIcon';

const CheckboxFilter = ({
	label,
	checked,
	id,
	...rest
}: React.ComponentProps<typeof Checkbox.Root> & { label?: string }) => {
	const customID = useId();
	return (
		<div className='flex items-center'>
			<Checkbox.Root
				className='border-stroke flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] border bg-white outline-none'
				defaultChecked={checked}
				id={id || customID}
				{...rest}
			>
				<Checkbox.Indicator>
					<CheckIcon userSelectedColor />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<label
				className='font-inter text-primary-text-gray cursor-pointer pl-[15px] text-[15px] text-base font-normal leading-6 text-black'
				htmlFor={id || customID}
			>
				{label}
			</label>
		</div>
	);
};

export default CheckboxFilter;
