'use client';
import clsx from 'clsx';
import { HiX } from 'react-icons/hi';
import Button from '@/components/Button';
import Headline from '@/components/Headline';

function AsideHeader({
	className,
	onClose,
	headline,
	subheadline,
	children,
	...rest
}: {
	onClose?: () => void;
	headline?: string;
	subheadline?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'sticky top-[86px] z-10 pt-3 pb-3 w-full bg-inherit',
				className,
			)}
			{...rest}
		>
			{typeof onClose === 'function' && (
				<Button
					variant='text'
					className='absolute top-1 -right-4 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800'
					icon={<HiX size={28} />}
					onClick={onClose}
				/>
			)}

			{!!headline && (
				<Headline
					headline={headline}
					subheadline={subheadline}
					className='text-lg md:text-xl font-semibold text-center'
					bodyClassName='text-center'
				/>
			)}
			{children}
		</div>
	);
}

export default AsideHeader;
