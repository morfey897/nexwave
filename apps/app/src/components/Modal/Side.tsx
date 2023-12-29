'use client';
import React from 'react';
import clsx from 'clsx';
import { TModalState } from './index';

function Aside({
	className,
	position = 'left',
	children,
	state,
}: React.HtmlHTMLAttributes<HTMLDivElement> &
	TModalState & {
		position?: 'left' | 'right';
	}) {
	return (
		<div className='absolute'>
			<aside
				className={clsx(
					'fixed top-0 bottom-0 z-30 mt-[86px]',
					'overflow-y-auto transition-transform duration-300',
					{
						'right-0 border-l': position === 'right',
						'left-0 border-r': position === 'left',
					},
					// state === 'mounted' && 'block',
					state === 'mounted' && position === 'right' && 'translate-x-full',
					state === 'mounted' && position === 'left' && '-translate-x-full',
					state === 'open' && 'translate-x-0',
					state === 'closing' && position === 'right' && 'translate-x-full',
					state === 'closing' && position === 'left' && '-translate-x-full',
					// state === 'close' && 'hidden',

					'max-w-[90%] px-4 py-8 w-[256px]',
					'bg-white dark:bg-gray-800 dark:border-gray-700',
					className,
				)}
			>
				{children}
			</aside>
		</div>
	);
}

export default Aside;
