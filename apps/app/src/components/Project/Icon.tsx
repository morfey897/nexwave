import { BiFileBlank } from 'react-icons/bi';

function Icon({
	image,
	size,
	Fallback,
}: {
	image?: string | null;
	size: number;
	Fallback: React.FC<{ size?: number }>;
}) {
	return image ? (
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
			{!!Fallback ? <Fallback size={size} /> : <BiFileBlank size={size} />}
		</span>
	);
}

export default Icon;
