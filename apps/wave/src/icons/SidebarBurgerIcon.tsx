const SidebarBurgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		height={props.height || '24'}
		width={props.width || '24'}
		fill='none'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth='2'
		viewBox='0 0 24 24'
		stroke='currentColor'
	>
		<path d='M6 18L18 6M6 6l12 12' />
	</svg>
);

export default SidebarBurgerIcon;
