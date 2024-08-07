import React from 'react';

const PlusIcon = ({ width, height, fill }: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={width || '12'}
		height={height || '12'}
		viewBox='0 0 12 12'
		fill={fill || '#637381'}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M6 0C6.41421 0 6.75 0.335786 6.75 0.75V5.25H11.25C11.6642 5.25 12 5.58579 12 6C12 6.41421 11.6642 6.75 11.25 6.75H6.75V11.25C6.75 11.6642 6.41421 12 6 12C5.58579 12 5.25 11.6642 5.25 11.25V6.75H0.75C0.335786 6.75 0 6.41421 0 6C0 5.58579 0.335786 5.25 0.75 5.25H5.25V0.75C5.25 0.335786 5.58579 0 6 0Z' />
	</svg>
);

export default PlusIcon;
