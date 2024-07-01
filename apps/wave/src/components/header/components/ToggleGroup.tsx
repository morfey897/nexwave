'use client';

import * as ToggleGroupRadix from '@radix-ui/react-toggle-group';
import { useState } from 'react';
import clsx from 'clsx';

const ToggleGroup = () => {
	const [value, setValue] = useState('week');

	const toggleGroupItemClasses = clsx(
		'w-auto h-8 md:px-2 lg:px-3 rounded-l border rounded-r flex items-center text-base',
		// 'border-gray-3 hover:bg-gray-200 color-bg-gray-300 data-[state=on]:bg-user-selected data-[state=on]:text-primary-text bg-white',
		'data-[state=on]:bg-user-selected data-[state=on]:text-white bg-secondary'
	);

	const onValueChange = (newValue: string) => {
		if (!newValue) return;
		setValue(newValue);
	};

	return (
		<ToggleGroupRadix.Root
			className='flex space-x-3'
			aria-label='Text alignment'
			type='single'
			value={value}
			onValueChange={onValueChange}
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
