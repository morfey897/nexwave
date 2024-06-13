const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={props.width || '24'}
		height={props.height || '24'}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M6 0.75C6 0.335786 5.66421 0 5.25 0C4.83579 0 4.5 0.335786 4.5 0.75V1.5H3C1.34315 1.5 0 2.84315 0 4.5V21C0 22.6569 1.34315 24 3 24H21C22.6569 24 24 22.6569 24 21V4.5C24 2.84315 22.6569 1.5 21 1.5H19.5V0.75C19.5 0.335786 19.1642 0 18.75 0C18.3358 0 18 0.335786 18 0.75V1.5H6V0.75ZM3.81818 4.5H20.1818C20.6337 4.5 21 4.83579 21 5.25V6.75C21 7.16421 20.6337 7.5 20.1818 7.5H3.81818C3.36631 7.5 3 7.16421 3 6.75V5.25C3 4.83579 3.36631 4.5 3.81818 4.5Z'
			fill='#637381'
		/>
	</svg>
);

export default CalendarIcon;
