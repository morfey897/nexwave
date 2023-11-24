import React from 'react';
import clsx from 'clsx';

function Block({
	children,
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={'w-full pl-10 sm:pl-14 md:pl-32 lg:pl-64'}>
			<div
				className={clsx('py-2 px-4 md:px-6 mx-auto', className)}
				{...rest}
			>
				{children}
			</div>
		</div>
	);
}

export default Block;
