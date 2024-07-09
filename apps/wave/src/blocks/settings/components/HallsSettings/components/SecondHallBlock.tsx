'use client';
import { useEffect, useState } from 'react';
import PhotosBlockHalls from './PhotosBlockHalls';

const SecondHallBlock = () => {
	const [nameSecondHall, setNameSecondHall] = useState('');
	const [descriptionSecondHall, setDescriptionSecondHall] = useState('');

	useEffect(() => {
		setNameSecondHall('Hall 2');
		setDescriptionSecondHall(
			'Suitable for group classes. Equipment – rugs, mirrors.'
		);
	}, []);

	return (
		<div className='flex w-full flex-col gap-10 md:flex-row'>
			<div className='flex flex-col'>
				<div className='flex flex-col'>
					<span className='font-inter text-base font-medium leading-6'>
						Hall 2
					</span>
					<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
						Provide the name of your school and a short description.
					</span>
				</div>
				<div className='relative my-6'>
					<label
						htmlFor='nameSecondHall'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
					>
						Name <span className='text-red-600'>*</span>
					</label>
					<input
						id='nameSecondHall'
						name='nameSecondHall'
						type='text'
						autoComplete='nameSecondHall'
						required
						value={nameSecondHall}
						onChange={(e) => setNameSecondHall(e.target.value)}
						className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
					></input>
				</div>
				<div className='relative my-6'>
					<label
						htmlFor='descriptionSecondHall'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
					>
						Description <span className='text-red-600'>*</span>
					</label>
					<textarea
						id='descriptionSecondHall'
						name='descriptionSecondHall'
						autoComplete='descriptionSecondHall'
						required
						value={descriptionSecondHall}
						onChange={(e) => setDescriptionSecondHall(e.target.value)}
						className='border-gray-3 bg-secondary mt-1 block h-[110px] w-full resize-none rounded-md border px-3 py-2 text-start shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
					></textarea>
				</div>
			</div>
			<PhotosBlockHalls />
		</div>
	);
};

export default SecondHallBlock;
