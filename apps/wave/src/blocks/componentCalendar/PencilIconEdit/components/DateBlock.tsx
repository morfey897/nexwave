import { useState } from 'react';

function DateBlock() {
	const [selectedDate, setSelectedDate] = useState('');

	return (
		<div className='bg-secondary mt-5 flex flex-col space-y-4'>
			<h2 className='font-inter text-base font-medium leading-6'>Date</h2>
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
				<label
					htmlFor='from'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					From<span className='text-red-600'>*</span>
				</label>
				<input
					id='from'
					name='from'
					type='text'
					required
					autoComplete='from'
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
			<div className='relative'>
				<label
					htmlFor='to'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					To<span className='text-red-600'>*</span>
				</label>
				<input
					id='to'
					name='to'
					type='text'
					required
					autoComplete='to'
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
		</div>
	);
}

export default DateBlock;
