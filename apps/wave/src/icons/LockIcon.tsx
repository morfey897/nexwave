const Icon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={props.width || '20'}
		height={props.height || '20'}
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M10 1.25C11.3807 1.25 12.5 2.36929 12.5 3.75V8.75H7.5V3.75C7.5 2.36929 8.61929 1.25 10 1.25ZM13.75 8.75V3.75C13.75 1.67893 12.0711 0 10 0C7.92893 0 6.25 1.67893 6.25 3.75V8.75C4.86929 8.75 3.75 9.86929 3.75 11.25V17.5C3.75 18.8807 4.86929 20 6.25 20H13.75C15.1307 20 16.25 18.8807 16.25 17.5V11.25C16.25 9.86929 15.1307 8.75 13.75 8.75Z'
			fill='#637381'
		/>
	</svg>
);

export default Icon;
