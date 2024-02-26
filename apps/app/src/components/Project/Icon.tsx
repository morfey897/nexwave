import Marker from '../ColorMarker';
import clsx from 'clsx';
import SVGIcon from '../SVGIcon';

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
				<span className='inline-block text-blue-500 dark:text-blue-400 align-middle'>
					{altFallback === 'project' && <SVGIcon type='project' size={size} />}
					{altFallback === 'branch' && <SVGIcon type='branch' size={size} />}
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
