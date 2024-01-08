import React from 'react';
import clsx from 'clsx';
import { HiOutlinePuzzle } from 'react-icons/hi';
import Icon from './Icon';
import { IBranch } from '@/models/project';

function Branch({
	branch,
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLDivElement> & {
	branch?: IBranch;
}) {
	return (
		<div
			className={clsx('flex w-full justify-start px-4 py-2 gap-x-2', className)}
			{...props}
		>
			<Icon size={24} Fallback={HiOutlinePuzzle} image={branch?.image} />
			<span>{branch?.name}</span>
		</div>
	);
}

export default Branch;
