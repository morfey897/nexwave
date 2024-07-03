const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={props.width || '16'}
		height={props.height || '14'}
		viewBox='0 0 16 14'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M0.5 0.5C0.5 0.223858 0.723858 0 1 0H13C13.2761 0 13.5 0.223858 13.5 0.5V2.5C13.5 2.62352 13.4543 2.74267 13.3716 2.83448L9 7.69187V12.5C9 12.7152 8.86228 12.9063 8.65811 12.9743L5.65811 13.9743C5.50564 14.0252 5.33803 13.9996 5.20764 13.9056C5.07726 13.8116 5 13.6607 5 13.5V7.69187L0.628353 2.83448C0.545722 2.74267 0.5 2.62352 0.5 2.5V0.5Z'
			fill='#637381'
		/>
	</svg>
);

export default FilterIcon;
