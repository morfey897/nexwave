import React from 'react';

const ArchiveIcon = ({ width, height }: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={width || '24'}
		height={height || '24'}
		viewBox='0 0 24 22'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M18.9643 21.5C20.9684 21.5 22.5 19.7678 22.5 17.75V6.5H1.5V17.75C1.5 19.7678 3.03162 21.5 5.03571 21.5H18.9643ZM8.25 9.5H15.75C16.1642 9.5 16.5 9.83579 16.5 10.25C16.5 10.6642 16.1642 11 15.75 11H8.25C7.83579 11 7.5 10.6642 7.5 10.25C7.5 9.83579 7.83579 9.5 8.25 9.5Z'
			fill='#637381'
		/>
		<path
			d='M1.2 0.5C0.537258 0.5 0 1.03726 0 1.7V3.5C0 4.16274 0.537258 4.7 1.2 4.7H22.8C23.4627 4.7 24 4.16274 24 3.5V1.7C24 1.03726 23.4627 0.5 22.8 0.5H1.2Z'
			fill='#637381'
		/>
	</svg>
);

export default ArchiveIcon;
