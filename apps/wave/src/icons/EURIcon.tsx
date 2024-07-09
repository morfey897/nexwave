import React from 'react';

const EURIcon = ({ width, height, fill }: React.SVGProps<SVGSVGElement>) => (
	<svg
		id='EUR'
		data-name='EUR'
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 104.97 122.88'
		width={width || '10'}
		height={height || '14'}
	>
		<path
			d='M79.62,65.43,76.08,80.2H51.45c3.18,10.08,10.13,15.11,20.76,15.11Q89.73,95.31,105,84v30.23q-12.66,8.63-30.55,8.63-28.93,0-42.81-13.2T14.67,80.2H0L3.85,65.43h9a37.66,37.66,0,0,1-.16-4.29,46.82,46.82,0,0,1,.16-4.68H2L5.84,41.68h8.83Q25.21,0,72.59,0,88.09,0,104,8.3L96.67,37.69q-11-10.12-23-10.13-15.73,0-21.29,14.12H81.62L78.07,56.46H49.51c-.11,1.08-.16,2.63-.16,4.68v4.29Z'
			fill={fill || 'var(--primary-text-gray)'}
		/>
	</svg>
);

export default EURIcon;
