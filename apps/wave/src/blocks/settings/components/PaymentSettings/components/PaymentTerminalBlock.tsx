'use client';
import { useEffect, useState } from 'react';

const PaymentTerminalBlock = () => {
	const [serialNumber, setSerialNumber] = useState('');

	useEffect(() => {
		setSerialNumber('VZ 7878787');
	}, []);

	return (
		<div className='mt-5 flex flex-col'>
			<div className='flex flex-col'>
				<span className='font-inter text-base font-medium leading-6'>
					Payment terminal
				</span>
				<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
					Provide a payment terminal on your company.
				</span>
			</div>
			<div className='relative mt-5 w-full'>
				<label
					htmlFor='serialNumber'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Serial number <span className='text-red-600'>*</span>
				</label>
				<input
					id='serialNumber'
					name='serialNumber'
					type='text'
					autoComplete='serialNumber'
					required
					onChange={(e) => setSerialNumber(e.target.value)}
					value={serialNumber}
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
		</div>
	);
};

export default PaymentTerminalBlock;
