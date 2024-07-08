'use client';

import { useEffect, useState } from 'react';
import useNWStore from '~/lib/store';

const InfoBlock = () => {
	const project = useNWStore((state) => state.project);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [timezone, setTimeZone] = useState('');

	useEffect(() => {
		setName(project?.name || '');
		setDescription(project?.info || '');
		setTimeZone('GMT+3 (Kyiv, Kyiv city, Ukraine');
	}, [project]);
	return (
		<div className='flex flex-col'>
			<div className='flex flex-col'>
				<span className='font-inter text-base font-medium leading-6'>Info</span>
				<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
					Provide general information about your school.
				</span>
			</div>
			<div className='relative my-6'>
				<label
					htmlFor='name'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Name <span className='text-red-600'>*</span>
				</label>
				<input
					id='name'
					name='name'
					type='text'
					autoComplete='name'
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				/>
			</div>
			<div className='relative my-6'>
				<label
					htmlFor='description'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Description <span className='text-red-600'>*</span>
				</label>
				<textarea
					id='description'
					name='description'
					autoComplete='description'
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='border-gray-3 bg-secondary mt-1 block h-[110px] w-full resize-none rounded-md border px-3 py-2 text-start shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				/>
			</div>
			<div className='relative my-6'>
				<label
					htmlFor='time-zone'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Time Zone <span className='text-red-600'>*</span>
				</label>
				<select
					id='time-zone'
					name='time-zone'
					autoComplete='time-zone'
					required
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				>
					<option value=''>{timezone}</option>
					<option value='option1'>Option 1</option>
					<option value='option2'>Option 2</option>
					<option value='option3'>Option 3</option>
				</select>
			</div>
			<div className='flex flex-col'>
				<div className='flex flex-row gap-2'>
					<div className='relative my-6 w-full'>
						<label
							htmlFor='city'
							className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
						>
							City <span className='text-red-600'>*</span>
						</label>
						<select
							id='city'
							name='city'
							autoComplete='city'
							required
							className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
						>
							<option value=''>Kiev</option>
							<option value='option1'>Option 1</option>
							<option value='option2'>Option 2</option>
							<option value='option3'>Option 3</option>
						</select>
					</div>
					<div className='relative my-6 w-full'>
						<label
							htmlFor='postcode'
							className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
						>
							Post code <span className='text-red-600'>*</span>
						</label>
						<input
							id='postcode'
							name='postcode'
							type='text'
							autoComplete='postcode'
							required
							value='01033'
							className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
						/>
					</div>
				</div>
				<div className='flex flex-row gap-2'>
					<div className='relative w-full'>
						<label
							htmlFor='street'
							className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
						>
							Street <span className='text-red-600'>*</span>
						</label>
						<select
							id='street'
							name='street'
							autoComplete='street'
							required
							className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
						>
							<option value=''>Prosta</option>
							<option value='option1'>Option 1</option>
							<option value='option2'>Option 2</option>
							<option value='option3'>Option 3</option>
						</select>
					</div>
					<div className='relative w-full'>
						<label
							htmlFor='building'
							className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
						>
							Building <span className='text-red-600'>*</span>
						</label>
						<input
							id='building'
							name='building'
							type='text'
							autoComplete='building'
							required
							value='20'
							className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoBlock;
