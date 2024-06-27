const ArrowUp = ({ width, height, fill }: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={width || '10'}
		height={height || '10'}
		viewBox='0 0 10 10'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M5 10C5.34518 10 5.625 9.72018 5.625 9.375V2.13388L8.30806 4.81694C8.55214 5.06102 8.94786 5.06102 9.19194 4.81694C9.43602 4.57286 9.43602 4.17714 9.19194 3.93306L5.44194 0.183058C5.19787 -0.0610199 4.80214 -0.0610199 4.55806 0.183058L0.808058 3.93306C0.563981 4.17714 0.563981 4.57286 0.808058 4.81694C1.05214 5.06102 1.44787 5.06102 1.69194 4.81694L4.375 2.13388V9.375C4.375 9.72018 4.65482 10 5 10Z'
			fill={fill || '#1A8245'}
		/>
	</svg>
);

export default ArrowUp;
