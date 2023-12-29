'use client';
import clsx from 'clsx';
import { TModalState } from './index';

function Modal({
	className,
	children,
	state,
}: React.HTMLAttributes<HTMLDivElement> & TModalState) {
	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-full pointer-events-none'>
			<div
				className={clsx(
					'w-full bg-gray-100 dark:bg-gray-900 px-12 py-4 rounded-lg border shadow dark:border-gray-600',
					'transition-opacity duration-300',
					state === 'mounted' && 'opacity-20',
					state === 'open' && 'opacity-100',
					state === 'closing' && 'opacity-10',
					// state === 'close' && 'hidden',
					className,
				)}
			>
				{children}
			</div>
		</div>
	);
}

export default Modal;
