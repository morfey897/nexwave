'use client';
import clsx from 'clsx';
import { HiX } from 'react-icons/hi';
import Button from '@/components/Button';
import Headline from '@/components/Headline';

function WndHeader({
	className,
	onClose,
	headline,
	subheadline,
	...rest
}: {
	onClose?: () => void;
	headline: string;
	subheadline?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'sticky top-0 z-10 pt-6 pb-3 w-full rounded-lg bg-inherit',
				className,
			)}
			{...rest}
		>
			{typeof onClose === 'function' && (
				<Button
					variant='text'
					className='absolute top-2.5 right-1 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800'
					icon={<HiX size={28} />}
					onClick={onClose}
				/>
			)}

			<Headline
				headline={headline}
				subheadline={subheadline}
				className='text-lg md:text-xl font-semibold text-center'
				bodyClassName='text-center'
			/>
		</div>
	);
}

export default WndHeader;
