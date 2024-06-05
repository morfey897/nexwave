import clsx from 'clsx';
import React, { memo } from 'react';

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4';

function Heading({
	className,
	children,
	tag,
}: { tag: HeadingType } & React.HTMLAttributes<HTMLHeadingElement>) {
	const extendClassName = clsx(className);
	switch (tag) {
		case 'h1':
			return <h1 className={extendClassName}>{children}</h1>;
		case 'h2':
			return <h2 className={extendClassName}>{children}</h2>;
		case 'h3':
			return <h3 className={extendClassName}>{children}</h3>;
		case 'h4':
			return <h4 className={extendClassName}>{children}</h4>;
		default:
			return <h2 className={extendClassName}>{children}</h2>;
	}
}

export default memo(Heading);
