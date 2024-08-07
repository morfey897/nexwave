import React from 'react';

const ProfileIcon = ({ width, height }: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={width || '20'}
		height={height || '20'}
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M13.75 7.5C13.75 9.57107 12.0711 11.25 10 11.25C7.92893 11.25 6.25 9.57107 6.25 7.5C6.25 5.42893 7.92893 3.75 10 3.75C12.0711 3.75 13.75 5.42893 13.75 7.5Z'
			fill='#637381'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 1.25C5.16751 1.25 1.25 5.16751 1.25 10C1.25 12.0668 1.96657 13.9662 3.16483 15.4634C4.05366 14.0316 6.0058 12.5 10 12.5C13.9942 12.5 15.9463 14.0316 16.8352 15.4634C18.0334 13.9662 18.75 12.0668 18.75 10C18.75 5.16751 14.8325 1.25 10 1.25Z'
			fill='#637381'
		/>
	</svg>
);

export default ProfileIcon;
