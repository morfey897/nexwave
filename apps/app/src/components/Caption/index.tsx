'use client';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import { Button, Group } from '@/components/Button';
import { CountBadge } from '@/components/Badge';
import clsx from 'clsx';
import { useScrollDetect } from '@/hooks/scrollDetect';

type TCaption = {
	headline?: string;
	subheadline?: string;
	amount?: number;
	add?: {
		title: string;
		onClick?: () => void;
	};
	imprt?: {
		title: string;
		onClick?: () => void;
	};
};

function Caption({
	headline,
	subheadline,
	amount,
	add,
	imprt,
	className,
	hideAddOnScroll,
	...props
}: { hideAddOnScroll?: boolean } & TCaption &
	React.HTMLAttributes<HTMLDivElement>) {
	const isScrolled = useScrollDetect('86px');

	return (
		<div
			className={clsx('flex items-center justify-between gap-x-3', className)}
			{...props}
		>
			<div className='w-full'>
				<div className='flex items-center gap-x-3 justify-between'>
					<CountBadge count={amount}>
						<h2 className='text-lg font-medium text-gray-800 dark:text-white'>
							{headline}
						</h2>
					</CountBadge>

					{!!add && !hideAddOnScroll && (
						<Button
							onClick={add.onClick}
							variant='primary'
							icon={<HiOutlinePlusCircle size={32} />}
							className={clsx(
								'fixed top-[120px] right-0 z-30 !p-2 !rounded-e-none translate-x-6 transition-transform duration-300 ease-in-out',
								isScrolled ? 'block hover:translate-x-0' : 'hidden',
							)}
						/>
					)}

					<Group>
						{!!add && (
							<Button
								size='xs'
								onClick={add.onClick}
								variant='primary'
								icon={<HiOutlinePlusCircle size={20} />}
								message={add.title}
							/>
						)}
						{!!imprt && (
							<Button
								size='xs'
								onClick={imprt.onClick}
								icon={<HiOutlineCloudArrowUp size={20} />}
								message={imprt.title}
							/>
						)}
					</Group>
				</div>

				{!!subheadline && (
					<p className={clsx('mt-1 text-sm text-gray-500 dark:text-gray-300')}>
						{subheadline}
					</p>
				)}
			</div>
		</div>
	);
}

export default Caption;
