import clsx from 'clsx';
function Modal({
	children,
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'max-w-[375px] w-full bg-gray-100 dark:bg-gray-900',
				className,
			)}
			{...rest}
		>
			<div className='px-12 py-4 rounded-lg border shadow dark:border-gray-600'>
				{children}
			</div>
		</div>
	);
}

export default Modal;
