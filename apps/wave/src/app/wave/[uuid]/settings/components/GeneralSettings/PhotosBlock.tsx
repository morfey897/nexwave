import PlusIcon from '~/icons/PlusIcon';

const PhotosBlock = () => (
	<div className='flex flex-col'>
		<div className='flex flex-col'>
			<span className='font-inter text-base font-medium leading-6'>Photos</span>
			<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
				Upload up to 5 photos that reflect your school.
			</span>
		</div>
		<div className='border-stroke mt-5 flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-6'>
			<PlusIcon />
			<span className='font-inter mt-2 text-base font-normal leading-6'>
				Upload
			</span>
		</div>
	</div>
);

export default PhotosBlock;
