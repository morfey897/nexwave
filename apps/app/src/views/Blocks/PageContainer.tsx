import React from 'react';
import clsx from 'clsx';

function PageContainer({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'container mx-auto sticky top-[80px] bg-gray-100 dark:bg-gray-900 z-10 pb-4',
				className,
			)}
			{...props}
		/>
	);
}

export default PageContainer;
