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
				'flex h-96 items-center rounded-lg border text-center dark:border-gray-700',
				className
			)}
			{...props}
		>
			<div className='mx-auto flex w-full max-w-sm flex-col px-4'>
				<div className='mx-auto rounded-full bg-blue-100 p-3 text-blue-500 dark:bg-gray-800'>
					<PiNoteBlankLight size={32} />
				</div>
				<h2 className='text-gray-8 mt-3 text-lg'>{messages?.headline}</h2>
				<p className='text-gray-5 mt-2'>{messages?.subheadline}</p>
				<div className='mt-4 flex items-center gap-x-3 sm:mx-auto'>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Empty;
