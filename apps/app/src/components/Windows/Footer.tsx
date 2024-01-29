'use client';
import clsx from 'clsx';

function Footer({
	errorCopy,
	className,
	children,
	...rest
}: {
	errorCopy?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx('flex gap-2 mt-6 flex-col md:flex-row', className)}
			{...rest}
		>
			<div className='w-full'>{errorCopy}</div>
			<div className='flex justify-end gap-x-2'>{children}</div>
		</div>
	);
}

export default Footer;
