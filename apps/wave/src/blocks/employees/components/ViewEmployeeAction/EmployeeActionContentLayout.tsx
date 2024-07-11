import React from 'react';
import { EmployeeActionContentLayoutProps } from '~/types';

const EmployeeActionContentLayout: React.FC<
	EmployeeActionContentLayoutProps
> = ({ name, picture, value }) => (
	<div className='flex items-center'>
		<span className='w-1/2'>{name}</span>
		{value ? <span className='w-1/2'>{value}</span> : ''}
		<span>{picture}</span>
	</div>
);

export default EmployeeActionContentLayout;
