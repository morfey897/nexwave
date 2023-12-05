import clsx from 'clsx';

function Modal({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'w-full bg-gray-100 dark:bg-gray-900',
				className,
			)}
		>
			<div className='px-12 py-4 rounded-lg border shadow dark:border-gray-600'>
				{children}
			</div>
		</div>
	);
}

export default Modal;
