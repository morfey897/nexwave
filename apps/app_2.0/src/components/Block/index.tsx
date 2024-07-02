import React from 'react';
import clsx from 'clsx';

function Block({
	children,
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={'w-full pl-10 sm:pl-14 md:pl-32 lg:pl-64'}>
			<div className={clsx('mx-auto px-4 py-2 md:px-6', className)} {...rest}>
				{children}
			</div>
		</div>
	);
}

export default Block;
