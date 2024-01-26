import { type IButtonProps, Button } from '@/components/Button';
import { PiImage } from 'react-icons/pi';
import { HiOutlineCheck } from 'react-icons/hi';
import clsx from 'clsx';
import NavItem from './NavItem';
import Marker from '@/components/Project/Marker';

function BranchIcon({ image }: { image?: string | null }) {
	return image ? (
		<picture className='shrink-0'>
			<img
				src={image}
				width={32}
				height={32}
				alt=''
				className='w-8 h-8 object-cover rounded-lg'
			/>
		</picture>
	) : (
		<PiImage size={32} />
	);
}

export function CurrentBranch({
	color,
	image,
	...props
}: Parameters<typeof NavItem>[0] & Parameters<typeof Branch>[0]) {
	return (
		<NavItem
			className='!bg-slate-200 dark:!bg-slate-900 border border-slate-500 dark:border-slate-400'
			icon={
				<span className='relative'>
					<BranchIcon image={image} />
					<Marker
						color={color}
						size={24}
						className='absolute -top-1 -right-1'
					/>
				</span>
			}
			{...props}
		/>
	);
}

function Branch({
	image,
	active = false,
	size = 'sm',
	variant = 'default',
	className,
	color,
	...props
}: {
	image?: string | null;
	active?: boolean;
	color: string | null;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> &
	Omit<IButtonProps, 'color'>) {
	return (
		<Button
			className={clsx('w-full !justify-start', className)}
			icon={<BranchIcon image={image} />}
			iconAfter={active && <HiOutlineCheck size={24} />}
			variant={variant}
			size={size}
			{...props}
		/>
	);
}

export default Branch;
