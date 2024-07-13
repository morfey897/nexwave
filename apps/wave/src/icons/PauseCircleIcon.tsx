import React from 'react';

const Icon = ({ width, height }: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={width || '20'}
		height={height || '20'}
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM7.8125 6.25C6.94956 6.25 6.25 6.94955 6.25 7.8125V12.1875C6.25 13.0504 6.94956 13.75 7.8125 13.75C8.67544 13.75 9.375 13.0504 9.375 12.1875V7.8125C9.375 6.94956 8.67544 6.25 7.8125 6.25ZM12.1875 6.25C11.3246 6.25 10.625 6.94955 10.625 7.8125V12.1875C10.625 13.0504 11.3246 13.75 12.1875 13.75C13.0504 13.75 13.75 13.0504 13.75 12.1875V7.8125C13.75 6.94956 13.0504 6.25 12.1875 6.25Z'
			fill='#637381'
		/>
	</svg>
);

export default Icon;