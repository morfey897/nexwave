import React from 'react';
import clsx from 'clsx';
import Icon from './Icon';
import { IBranch } from '@/models/project';

function Branch({
	branch,
	className,
	size = 24,
	...props
}: React.ButtonHTMLAttributes<HTMLDivElement> & {
	branch?: IBranch;
	size?: number;
}) {
	return (
		<div
			className={clsx(
				'flex w-full items-center justify-start gap-x-2 px-4 py-2',
				className
			)}
			{...props}
		>
			<Icon size={size} altFallback={'branch'} image={branch?.image} />
			<p>{branch?.name}</p>
		</div>
	);
}

export default Branch;
