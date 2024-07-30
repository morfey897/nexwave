import React from 'react';
import CheckboxFilter from './CheckboxFilter';
import clsx from 'clsx';

function CheckboxGroup({
	options,
	label,
	className,
}: React.HTMLAttributes<HTMLDivElement> & {
	label?: string;
	options: Array<Parameters<typeof CheckboxFilter>[0]>;
}) {
	return (
		<div className={clsx('p-3 px-5', className)}>
			{!!label && (
				<span className='text-primary-text-gray font-inter mb-4 block text-base font-medium leading-6'>
					{label}
				</span>
			)}
			<ul className='space-y-4'>
				{options.map((option) => (
					<li key={option.name} data-name={option.name}>
						<CheckboxFilter {...option} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default CheckboxGroup;
