import { useEffect, useState } from 'react';
import PhotosBlockHalls from './PhotosBlockHalls';

const FirstHallBlock = () => {
	const [nameFirstHall, setNameFirstHall] = useState('');
	const [descriptionFirstHall, setDescriptionFirstHall] = useState('');

	useEffect(() => {
		setNameFirstHall('Hall 1');
		setDescriptionFirstHall(
			'Suitable for group classes. Equipment – rugs, mirrors.'
		);
	}, []);

	return (
		<div className='flex w-full flex-col gap-10 md:flex-row'>
			<div className='flex flex-col'>
				<div className='flex flex-col'>
					<span className='font-inter text-base font-medium leading-6'>
						Hall 1
					</span>
					<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
						Provide the name of your school and a short description.
					</span>
				</div>
				<div className='relative my-6'>
					<label
						htmlFor='nameFirstHall'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
					>
						Name <span className='text-red-600'>*</span>
					</label>
					<input
						id='nameFirstHall'
						name='nameFirstHall'
						type='text'
						autoComplete='nameFirstHall'
						required
						value={nameFirstHall}
						onChange={(e) => setNameFirstHall(e.target.value)}
						className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
					 />
				</div>
				<div className='relative my-6'>
					<label
						htmlFor='descriptionFirstHall'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
					>
						Description <span className='text-red-600'>*</span>
					</label>
					<textarea
						id='descriptionFirstHall'
						name='descriptionFirstHall'
						autoComplete='descriptionFirstHall'
						required
						value={descriptionFirstHall}
						onChange={(e) => setDescriptionFirstHall(e.target.value)}
						className='border-gray-3 bg-secondary mt-1 block h-[110px] w-full resize-none rounded-md border px-3 py-2 text-start shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
					 />
				</div>
			</div>
			<PhotosBlockHalls />
		</div>
	);
};

export default FirstHallBlock;
