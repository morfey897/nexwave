import { HiOutlinePuzzle } from 'react-icons/hi';
import { BsDiagram2 } from 'react-icons/bs';
import Marker from './Marker';
import clsx from 'clsx';

function Icon({
	image,
	size,
	marker,
	Fallback,
	altFallback,
	className,
	...props
}: {
	image?: string | null;
	size: number;
	marker?: Parameters<typeof Marker>[0];
	Fallback?: React.FC<{ size?: number }>;
	altFallback?: 'project' | 'branch';
} & React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<div className={clsx('relative inline-block', className)} {...props}>
			{image ? (
				<picture className='shrink-0'>
					<img
						src={image}
						width={size}
						height={size}
						alt=''
						className='w-8 h-8 object-cover rounded-lg'
					/>
				</picture>
			) : (
				<span className='inline-block text-blue-500 dark:text-blue-400'>
					{altFallback === 'project' && <BsDiagram2 size={size} />}
					{altFallback === 'branch' && <HiOutlinePuzzle size={size} />}
					{!!Fallback && !altFallback && <Fallback size={size} />}
				</span>
			)}
			{!!marker && (
				<Marker
					{...marker}
					className={clsx('absolute top-0 right-0', marker.className)}
				/>
			)}
		</div>
	);
}

export default Icon;
