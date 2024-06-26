import React, { memo } from 'react';
import Heading from './Heading';
import type { HeadingType } from './Heading';
import clsx from 'clsx';

function Headline({
	headline,
	subheadline,
	children,
	className,
	bodyClassName,
	tag,
}: {
	tag?: HeadingType;
	headline: string;
	subheadline?: string;
	children?: React.ReactNode;
	className?: string;
	bodyClassName?: string;
}) {
	return (
		<>
			<Heading
				tag={tag || 'h2'}
				className={clsx('text-gray-800 dark:text-white', className)}
			>
				{headline}
			</Heading>
			{(!!subheadline || !!children) && (
				<div
					className={clsx(
						'mt-2 text-xs text-gray-500 md:text-base dark:text-gray-400',
						bodyClassName
					)}
				>
					{subheadline && <p>{subheadline}</p>}
					{children}
				</div>
			)}
		</>
	);
}

export default memo(Headline);
