'use client';

import Picture from '~/components/picture/Picture';
import useNWStore from '~/lib/store';
import { abbrev } from '~/utils';

const LogoBlock = () => {
	const project = useNWStore((state) => state.project);

	return (
		<div className='mt-5 flex flex-col'>
			<div className='flex flex-col'>
				<span className='font-inter text-base font-medium leading-6'>Logo</span>
				<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
					By default, your logo is shown as an abbreviation of the school name.
					You can upload your logo (PNG, JPG, GIF file up to 5 MB).
				</span>
			</div>
			<div className='border-stroke mt-5 flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-md border-2 p-6'>
				<Picture
					name={project?.name}
					photo={project?.image}
					abbrev={abbrev(project?.name.split(' '))}
					color={project?.color}
					size={64}
				/>
			</div>
		</div>
	);
};

export default LogoBlock;
