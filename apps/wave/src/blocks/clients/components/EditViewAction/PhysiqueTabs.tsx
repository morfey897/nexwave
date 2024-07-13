import { PlusIcon } from '~/icons';
import Image from 'next/image';
import { useState } from 'react';
import ButtonEditViewAction from './ButtonEditViewAction';

function PhysiqueTabs() {
	const [height, setHeight] = useState('');
	const [Weight, setWeight] = useState('');

	return (
		<div className='bg-secondary mt-5 flex flex-col space-y-4'>
			<div className='relative'>
				<label
					htmlFor='height'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Height
				</label>
				<input
					id='height'
					name='height'
					type='text'
					autoComplete='height'
					required
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
			<div className='relative'>
				<label
					htmlFor='Weight'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Weight
				</label>
				<input
					id='Weight'
					name='Weight'
					type='text'
					autoComplete='Weight'
					required
					value={Weight}
					onChange={(e) => setWeight(e.target.value)}
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
			<div className='relative'>
				<input
					id='contraindications'
					name='contraindications'
					type='text'
					placeholder='Contraindications'
					autoComplete='contraindications'
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
			<div className='relative'>
				<input
					id='injuries'
					name='injuries'
					type='text'
					placeholder='Injuries'
					autoComplete='injuries'
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
			<ButtonEditViewAction />
		</div>
	);
}

export default PhysiqueTabs;
