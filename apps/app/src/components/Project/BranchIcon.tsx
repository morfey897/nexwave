import { HiOutlinePuzzle } from 'react-icons/hi';

function BranchIcon({ image, size }: { image?: string | null; size: number }) {
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
			<HiOutlinePuzzle size={size} />
		</span>
	);
}

export default ProjectIcon;
