'use client';
import React from 'react';
import clsx from 'clsx';
import { useModalState } from '@/hooks/modal';

function Aside({
	className,
	position = 'left',
	children,
	name,
}: React.HtmlHTMLAttributes<HTMLDivElement> & {
	position?: 'left' | 'right';
	name: string;
}) {
	const state = useModalState(name);
	return (
		<div className='absolute'>
			<aside
				className={clsx(
					'fixed top-0 bottom-0 z-30 ',
					'transition-transform duration-300',
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

					
					className,
				)}
			>
				{children}
			</aside>
		</div>
	);
}

export default Aside;
