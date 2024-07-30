'use client';

import clsx from 'clsx';
import { HiX } from 'react-icons/hi';
import Button from '~/components/controls/Button';
import Headline from '~/components/headline';

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
				'sticky top-0 z-10 w-full rounded-lg bg-inherit pb-3 pt-6',
				className
			)}
			{...rest}
		>
			{typeof onClose === 'function' && (
				<Button
					isFullWidth
					variant='text'
					className='absolute right-1 top-2.5 hover:bg-gray-200 hover:underline dark:hover:bg-gray-800'
					icon={<HiX size={28} />}
					onClick={onClose}
				/>
			)}

			<Headline
				headline={headline}
				subheadline={subheadline}
				className='text-center text-lg font-semibold md:text-xl'
				bodyClassName='text-center'
			/>
		</div>
	);
}

export default WndHeader;
