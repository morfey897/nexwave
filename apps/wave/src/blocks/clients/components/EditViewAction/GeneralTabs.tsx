'use client';

import * as Form from '@radix-ui/react-form';
import PersonPic from '~/components/picture/PersonPic';
import { useState } from 'react';
import ButtonEditViewAction from './ButtonEditViewAction';
import { useTranslations } from 'next-intl';
import Input from '~/components/form/InputNew';
import useNWStore from '~/lib/store';

function GeneralTabs() {
	const t = useTranslations();
	const client = useNWStore((state) => state.edit.client);

	return (
		<Form.Root>
			<div className='bg-secondary flex flex-col space-y-4'>
				<div className='border-stroke flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-start rounded-md border-2'>
					<PersonPic photo={client?.avatar} size={120} />
				</div>
				<Input
					label={t('form.first_name')}
					name='name'
					defaultValue={client?.name || ''}
					required
				/>
				<Input
					label={t('form.last_name')}
					name='surname'
					defaultValue={client?.surname || ''}
					required
				/>
				<Input
					label={t('form.phone')}
					placeholder='+380'
					name='phone'
					defaultValue={client?.contacts['phone'] || ''}
				/>
				<Input
					label={t('form.email')}
					name='email'
					type='email'
					defaultValue={client?.contacts['email'] || ''}
					// required
				/>

				<Input
					label={t('form.birthday')}
					name='birthday'
					type='date'
					defaultValue={client?.birthday || ''}
				/>

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
