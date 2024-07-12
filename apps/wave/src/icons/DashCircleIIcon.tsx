import React from 'react';

const DashCircleIIcon = ({ width, height }: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={width || '24'}
		height={height || '24'}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM6.75 11.25C6.33579 11.25 6 11.5858 6 12C6 12.4142 6.33579 12.75 6.75 12.75H17.25C17.6642 12.75 18 12.4142 18 12C18 11.5858 17.6642 11.25 17.25 11.25H6.75Z'
			fill='#637381'
		/>
	</svg>
);

export default DashCircleIIcon;
