'use client';
import clsx from 'clsx';
import { HiX } from 'react-icons/hi';
import Button from '~components/buttons';
import Headline from '~components/headline';

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
				'sticky top-[86px] z-10 w-full bg-inherit pb-3 pt-3',
				className
			)}
			{...rest}
		>
			{typeof onClose === 'function' && (
				<Button
					variant='text'
					className='absolute -right-4 top-1 hover:bg-gray-200 hover:underline dark:hover:bg-gray-800'
					icon={<HiX size={28} />}
					onClick={onClose}
				/>
			)}

			{!!headline && (
				<Headline
					headline={headline}
					subheadline={subheadline}
					className='text-center text-lg font-semibold md:text-xl'
					bodyClassName='text-center'
				/>
			)}
			{children}
		</div>
	);
}

export default AsideHeader;
