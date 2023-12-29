import { IButtonProps } from '@/types/view';
import Button from '../Button';
import { PiImage } from 'react-icons/pi';
import { HiOutlineCheck } from 'react-icons/hi';
import clsx from 'clsx';
import NavItem from './NavItem';

export function Marker({
	size = 'sm',
	color,
	className,
}: {
	size?: 'sm' | 'md' | 'lg';
	color?: string;
	className?: string;
}) {
	return (
		<span
			className={clsx(
				'rounded-full shrink-0',
				{
					'bg-pink-500': color === 'pink',
					'bg-green-500': color === 'green',
					'bg-yellow-500': color === 'yellow',
					'bg-indigo-500': color === 'indigo',
					'bg-blue-500': color === 'blue',
					'bg-slate-500': color === 'gray',
					'bg-red-500': color === 'red',
					'bg-orange-500': color === 'orange',
					'bg-sky-500': color === 'skyblue',
					'bg-purple-500': color === 'purple',
				},
				{
					'w-1.5 h-1.5': size === 'sm',
					'w-2.5 h-2.5': size === 'md',
					'w-3 h-3': size === 'lg',
				},
				className,
			)}
		></span>
	);
}

function BranchIcon({ image }: { image?: string }) {
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
						size='md'
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
}: IButtonProps &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		image?: string;
		active?: boolean;
		color?: string;
	}) {
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
