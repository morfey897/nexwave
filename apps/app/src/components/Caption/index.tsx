import { HiOutlinePlusCircle } from 'react-icons/hi';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import { Button, Group } from '@/components/Button';
import { CountBadge } from '@/components/Badge';
import clsx from 'clsx';

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
	isScrolled = false,
	...props
}: { isScrolled?: boolean } & TCaption & React.HTMLAttributes<HTMLDivElement>) {
	isScrolled = false;
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

					{!!add && (
						<Button
							size='xs'
							onClick={add.onClick}
							variant='primary'
							icon={<HiOutlinePlusCircle size={16} />}
							message={add.title}
							className='md:hidden text-sm my-1'
						/>
					)}
				</div>

				{!!subheadline && (
					<p
						className={clsx(
							'mt-1 text-sm text-gray-500 dark:text-gray-300',
							'transition-max-height duration-100 ease-linear overflow-hidden max-h-[100vh]',
							isScrolled && '!max-h-0',
						)}
					>
						{subheadline}
					</p>
				)}
			</div>

			<div className='hidden md:flex items-center mt-4 gap-x-3 gap-y-2'>
				<Group>
					{!!add && (
						<Button
							size='sm'
							onClick={add.onClick}
							variant='primary'
							icon={<HiOutlinePlusCircle size={20} />}
							message={add.title}
						/>
					)}
					{!!imprt && (
						<Button
							size='sm'
							onClick={imprt.onClick}
							icon={<HiOutlineCloudArrowUp size={20} />}
							message={imprt.title}
						/>
					)}
				</Group>
			</div>
		</div>
	);
}

export default Caption;
