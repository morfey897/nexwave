import React from 'react';
import NextLink from 'next/link';
import { EnumProtectedRoutes } from '~/constants/enums';

const ButtonBlock = (chunks: React.ReactNode) => (
	<NextLink
		href={EnumProtectedRoutes.APP}
		title='Go to the start page'
		className='cursor-pointer text-blue-500 underline dark:text-blue-400'
	>
		{chunks}
	</NextLink>
);

export default ButtonBlock;
