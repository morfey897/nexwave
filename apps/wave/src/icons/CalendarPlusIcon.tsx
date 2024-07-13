const CalendarIcon = ({
	width,
	height,
}: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={width || '20'}
		height={height || '20'}
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M4.375 0C4.72018 0 5 0.279822 5 0.625V1.25H15V0.625C15 0.279822 15.2798 0 15.625 0C15.9702 0 16.25 0.279822 16.25 0.625V1.25H17.5C18.8807 1.25 20 2.36929 20 3.75V17.5C20 18.8807 18.8807 20 17.5 20H2.5C1.11929 20 0 18.8807 0 17.5V3.75C0 2.36929 1.11929 1.25 2.5 1.25H3.75V0.625C3.75 0.279822 4.02982 0 4.375 0ZM2.5 4.375V5.625C2.5 5.97018 2.80526 6.25 3.18182 6.25H16.8182C17.1947 6.25 17.5 5.97018 17.5 5.625V4.375C17.5 4.02982 17.1947 3.75 16.8182 3.75H3.18182C2.80526 3.75 2.5 4.02982 2.5 4.375ZM10.625 10.625C10.625 10.2798 10.3452 10 10 10C9.65482 10 9.375 10.2798 9.375 10.625V12.5H7.5C7.15482 12.5 6.875 12.7798 6.875 13.125C6.875 13.4702 7.15482 13.75 7.5 13.75H9.375V15.625C9.375 15.9702 9.65482 16.25 10 16.25C10.3452 16.25 10.625 15.9702 10.625 15.625V13.75H12.5C12.8452 13.75 13.125 13.4702 13.125 13.125C13.125 12.7798 12.8452 12.5 12.5 12.5H10.625V10.625Z'
			fill='#637381'
		/>
	</svg>
);

export default CalendarIcon;