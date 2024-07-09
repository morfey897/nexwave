'use client';
import { useEffect, useState } from 'react';
import Button from '~/components/buttons/Button';

const BankAccountBlock = () => {
	const [accountNumber, setAccountNumber] = useState('');

	useEffect(() => {
		setAccountNumber('2222 3444 2233 3333 7777');
	}, []);
	return (
		<div className='flex flex-col'>
			<div className='flex flex-col'>
				<span className='font-inter text-base font-medium leading-6'>
					Bank account
				</span>
				<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
					Provide a bank account of your company.
				</span>
			</div>
			<div className='relative mt-5 w-full'>
				<label
					htmlFor='accountNumber'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Account number <span className='text-red-600'>*</span>
				</label>
				<input
					id='accountNumber'
					name='accountNumber'
					type='text'
					autoComplete='accountNumber'
					required
					onChange={(e) => setAccountNumber(e.target.value)}
					value={accountNumber}
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
			<div className='mt-5 w-[110px]'>
				<Button
					message={'History'}
					className='text-user-selected border-user-selected'
				/>
			</div>
		</div>
	);
};

export default BankAccountBlock;
