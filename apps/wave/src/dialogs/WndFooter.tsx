'use client';

import clsx from 'clsx';

function WndFooter({
	errorCopy,
	className,
	children,
	...rest
}: {
	errorCopy?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx('mt-6 flex flex-col gap-2 md:flex-row', className)}
			{...rest}
		>
			<div className='w-full'>{errorCopy}</div>
			<div className='flex justify-end gap-x-2'>{children}</div>
		</div>
	);
}

export default WndFooter;
