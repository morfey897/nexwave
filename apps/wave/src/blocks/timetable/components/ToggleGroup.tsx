'use client';

import * as ToggleGroupRadix from '@radix-ui/react-toggle-group';
import { useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import useNWStore from '~/lib/store';

const ToggleGroup = () => {
	const t = useTranslations();
	// const [value, setValue] = useState('week');

	const value = useNWStore((state) => state.ui.timetable);
	const setValue = useNWStore((state) => state.setUI);

	const toggleGroupItemClasses = clsx(
		'w-auto h-8 md:px-2 lg:px-3 rounded-l border rounded-r flex items-center text-base',
		'text-nowrap',
		// 'border-gray-3 hover:bg-gray-200 color-bg-gray-300 data-[state=on]:bg-user-selected data-[state=on]:text-primary-text bg-white',
		'data-[state=on]:bg-user-selected data-[state=on]:text-white bg-secondary'
	);

	const onValueChange = (newValue: string) => {
		if (!newValue) return;
		setValue({ timetable: newValue as 'week' | 'day' | 'month' });
	};

	return (
		<ToggleGroupRadix.Root
			className='flex'
			aria-label='Text alignment'
			type='single'
			value={value}
			onValueChange={onValueChange}
		>
			<ToggleGroupRadix.Item className={toggleGroupItemClasses} value='day'>
				{t('filter.day')}
			</ToggleGroupRadix.Item>
			<ToggleGroupRadix.Item className={toggleGroupItemClasses} value='week'>
				{t('filter.week')}
			</ToggleGroupRadix.Item>
			<ToggleGroupRadix.Item className={toggleGroupItemClasses} value='month'>
				{t('filter.month')}
			</ToggleGroupRadix.Item>
		</ToggleGroupRadix.Root>
	);
};

export default ToggleGroup;
