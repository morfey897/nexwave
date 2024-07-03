'use client';

import * as ToggleGroupRadix from '@radix-ui/react-toggle-group';
import { useState } from 'react';
import clsx from 'clsx';
import CheckIcon from '~/icons/CheckIcon';

const ToggleGroupMobile = () => {
	const [value, setValue] = useState('week');

	const toggleGroupItemClasses = clsx(
		'w-auto h-full gap-3 flex items-center text-base',
		'data-[state=on]:text-user-selected bg-secondary'
	);

	const onValueChange = (newValue: string) => {
		if (!newValue) return;
		setValue(newValue);
	};

	const periods = ['week', 'month', '3-month', '6-month', 'year'];

	return (
		<ToggleGroupRadix.Root
			className='flex h-full flex-col'
			aria-label='Text alignment'
			type='single'
			value={value}
			onValueChange={onValueChange}
		>
			{periods.map((period) => (
				<ToggleGroupRadix.Item
					className={toggleGroupItemClasses}
					value={period}
					key={period}
				>
					<div className='flex w-full items-center gap-3'>
						<div
							className={clsx(
								value === period ? 'visible' : 'invisible',
								'pl-5'
							)}
						>
							<CheckIcon />
						</div>
						<span>{period.charAt(0).toUpperCase() + period.slice(1)}</span>
					</div>
				</ToggleGroupRadix.Item>
			))}
		</ToggleGroupRadix.Root>
	);
};

export default ToggleGroupMobile;
