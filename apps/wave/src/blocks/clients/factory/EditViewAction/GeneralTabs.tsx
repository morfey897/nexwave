import Image from 'next/image';
import { useState } from 'react';
import ButtonEditViewAction from './ButtonEditViewAction';

function GeneralTabs() {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [selectedDate, setSelectedDate] = useState('');

	return (
		<div className='bg-secondary flex flex-col space-y-4'>
			<div className='border-stroke flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-start rounded-md border-2 p-3'>
				<Image
					src='/assets/test-women-photo.png'
					alt='Photos block'
					width={120}
					height={120}
				/>
			</div>
			<div className='relative'>
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
				></input>
			</div>
			<div className='relative'>
				<label
					htmlFor='phone'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Phone number <span className='text-red-600'>*</span>
				</label>
				<input
					id='phone'
					name='phone'
					type='text'
					autoComplete='phone'
					required
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
			<div className='relative'>
				<input
					type='date'
					placeholder='Date of birth'
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				/>
			</div>
			<div className='relative'>
				<input
					id='social-media'
					name='social-media'
					type='text'
					placeholder='Social media'
					autoComplete='social-media'
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
			<ButtonEditViewAction />
		</div>
	);
}

export default GeneralTabs;
