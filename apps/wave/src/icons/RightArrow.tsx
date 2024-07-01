const RightArrow = ({ width, height }: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={width || '10'}
		height={height || '18'}
		viewBox='0 0 10 18'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M0.808058 1.05806C1.05214 0.813981 1.44786 0.813981 1.69194 1.05806L9.19194 8.55806C9.43602 8.80214 9.43602 9.19786 9.19194 9.44194L1.69194 16.9419C1.44786 17.186 1.05214 17.186 0.808058 16.9419C0.563981 16.6979 0.563981 16.3021 0.808058 16.0581L7.86612 9L0.808058 1.94194C0.563981 1.69786 0.563981 1.30214 0.808058 1.05806Z'
			fill='#4B5563'
		/>
	</svg>
);

export default RightArrow;
