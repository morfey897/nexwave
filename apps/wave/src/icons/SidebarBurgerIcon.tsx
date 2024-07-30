const SidebarBurgerIcon = ({
	width,
	height,
	fill,
}: React.SVGProps<SVGSVGElement>) => (
	<svg
		height={height || '24'}
		width={width || '24'}
		fill='none'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth='2'
		viewBox='0 0 24 24'
		stroke={fill || '#637381'}
	>
		<path d='M6 18L18 6M6 6l12 12' />
	</svg>
);

export default SidebarBurgerIcon;
