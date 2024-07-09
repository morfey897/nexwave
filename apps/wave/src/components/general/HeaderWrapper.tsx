import React from 'react';
import clsx from 'clsx';

const HeaderWrapper = ({
	children,
	className,
}: React.HTMLAttributes<HTMLDivElement>) => (
	<header
		className={clsx(
			'bg-primary sticky top-0 z-20 mt-2.5 flex w-full items-center justify-between pb-5 pt-2.5',
			className
		)}
	>
		{children}
	</header>
);

export default HeaderWrapper;
