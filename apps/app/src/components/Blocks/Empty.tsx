import clsx from 'clsx';
import { PiNoteBlankLight } from 'react-icons/pi';

function Empty({
	messages,
	className,
	children,
	...props
}: {
	messages?: Record<string, string | number | undefined>;
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'flex items-center text-center border rounded-lg h-96 dark:border-gray-700',
				className,
			)}
			{...props}
		>
			<div className='flex flex-col w-full max-w-sm px-4 mx-auto'>
				<div className='p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800'>
					<PiNoteBlankLight size={32} />
				</div>
				<h2 className='mt-3 text-lg text-gray-800 dark:text-white'>
					{messages?.headline}
				</h2>
				<p className='mt-2 text-gray-500 dark:text-gray-400'>
					{messages?.subheadline}
				</p>
				<div className='flex items-center mt-4 sm:mx-auto gap-x-3'>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Empty;
