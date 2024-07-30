const ExportIcon = ({
	width,
	height,
	fill,
	userSelectedColor,
}: React.SVGProps<SVGSVGElement> & { userSelectedColor?: boolean }) => (
	<svg
		width={width || '20'}
		height={height || '18'}
		viewBox='0 0 20 18'
		fill={userSelectedColor ? 'var(--user-selected)' : fill || '#637381'}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M0.625 11.375C0.970178 11.375 1.25 11.6549 1.25 12V15.125C1.25 15.8154 1.80964 16.375 2.5 16.375H17.5C18.1904 16.375 18.75 15.8154 18.75 15.125V12C18.75 11.6549 19.0298 11.375 19.375 11.375C19.7202 11.375 20 11.6549 20 12V15.125C20 16.5057 18.8807 17.625 17.5 17.625H2.5C1.11929 17.625 0 16.5057 0 15.125V12C0 11.6549 0.279822 11.375 0.625 11.375Z' />
		<path d='M9.55806 13.8169C9.80214 14.061 10.1979 14.061 10.4419 13.8169L14.1919 10.0669C14.436 9.82286 14.436 9.42714 14.1919 9.18306C13.9479 8.93898 13.5521 8.93898 13.3081 9.18306L10.625 11.8661V0.875C10.625 0.529822 10.3452 0.25 10 0.25C9.65482 0.25 9.375 0.529822 9.375 0.875V11.8661L6.69194 9.18306C6.44786 8.93898 6.05214 8.93898 5.80806 9.18306C5.56398 9.42714 5.56398 9.82286 5.80806 10.0669L9.55806 13.8169Z' />
	</svg>
);

export default ExportIcon;
