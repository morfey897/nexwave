const CheckIcon = ({
	width,
	height,
	fill,
	userSelectedColor,
}: React.SVGProps<SVGSVGElement> & { userSelectedColor?: boolean }) => (
	<svg
		width={width || '15'}
		height={height || '12'}
		viewBox='0 0 15 12'
		fill={userSelectedColor ? 'var(--user-selected)' : fill || '#637381'}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M12.9206 0.962087C13.2819 0.595971 13.8677 0.595971 14.229 0.962087C14.5859 1.32371 14.5903 1.90727 14.2422 2.27434L6.85031 11.0122C6.8432 11.0212 6.8356 11.0298 6.82756 11.0379C6.46625 11.404 5.88046 11.404 5.51915 11.0379L1.02098 6.47985C0.659673 6.11374 0.659673 5.52015 1.02098 5.15403C1.38229 4.78791 1.96808 4.78791 2.32939 5.15403L6.14548 9.02093L12.8961 0.990131C12.9037 0.980294 12.9119 0.970929 12.9206 0.962087Z'
			// fill='var(--user-selected)'
		/>
	</svg>
);

export default CheckIcon;
