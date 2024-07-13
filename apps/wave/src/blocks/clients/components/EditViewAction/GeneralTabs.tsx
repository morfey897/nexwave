'use client';

import * as Form from '@radix-ui/react-form';
import Image from 'next/image';
import { useState } from 'react';
import ButtonEditViewAction from './ButtonEditViewAction';
import { useTranslations } from 'next-intl';
import Input from '~/components/form/InputNew';

function GeneralTabs() {
	const t = useTranslations();
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [selectedDate, setSelectedDate] = useState('');

	return (
		<Form.Root>
			<div className='bg-secondary flex flex-col space-y-4'>
				<div className='border-stroke flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-start rounded-md border-2 p-3'>
					<Image
						src='/assets/test-women-photo.png'
						alt='Photos block'
						width={120}
						height={120}
					/>
				</div>
				<Input
					label={t('form.name')}
					name='name'
					defaultValue={'Anna'}
					required
				/>
				<Input
					label={t('form.phone')}
					placeholder='+380'
					name='phone'
					// defaultValue={'1234567890'}
					// required
				/>
				<Input
					label={t('form.email')}
					name='email'
					type='email'
					// defaultValue={'1234567890'}
					// required
				/>

				<Input label={t('form.birthday')} name='birthday' type='date' />

				{/* <div className='relative'>
					<input
						id='social-media'
						name='social-media'
						type='text'
						placeholder='Social media'
						autoComplete='social-media'
						className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
					></input>
				</div> */}
				<ButtonEditViewAction />
			</div>
		</Form.Root>
	);
}

export default GeneralTabs;
