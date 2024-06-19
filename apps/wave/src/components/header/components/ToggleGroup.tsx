'use client';
import * as ToggleGroupRadix from '@radix-ui/react-toggle-group';
import { useState } from 'react';

const ToggleGroup = () => {
	const [value, setValue] = useState('week');

	const toggleGroupItemClasses =
		'w-auto h-8 px-3 rounded-l border-t border-b border-l border-transparent border border-blue hover:bg-gray-200 color-bg-gray-300 data-[state=on]:bg-blue-500 data-[state=on]:text-gray-50 flex items-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:shadow-[0_0_0_2px] focus:shadow-black';

	return (
		<ToggleGroupRadix.Root
			className='flex space-x-3'
			aria-label='Text alignment'
			type='single'
			value={value}
			onValueChange={(value) => {
				if (value) setValue(value);
			}}
		>
			<ToggleGroupRadix.Item className={toggleGroupItemClasses} value='week'>
				Week
			</ToggleGroupRadix.Item>
			<ToggleGroupRadix.Item className={toggleGroupItemClasses} value='month'>
				Month
			</ToggleGroupRadix.Item>
			<ToggleGroupRadix.Item className={toggleGroupItemClasses} value='3-month'>
				3 Month
			</ToggleGroupRadix.Item>
			<ToggleGroupRadix.Item className={toggleGroupItemClasses} value='6-month'>
				6 Month
			</ToggleGroupRadix.Item>
			<ToggleGroupRadix.Item className={toggleGroupItemClasses} value='year'>
				Year
			</ToggleGroupRadix.Item>
		</ToggleGroupRadix.Root>
	);
};

export default ToggleGroup;
