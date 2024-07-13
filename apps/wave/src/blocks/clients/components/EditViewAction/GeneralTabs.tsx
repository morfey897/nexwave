'use client';

import * as Form from '@radix-ui/react-form';
import PersonPic from '~/components/picture/PersonPic';
import { useEffect, useState } from 'react';
import ButtonEditViewAction from './ButtonEditViewAction';
import { useTranslations } from 'next-intl';
import Input from '~/components/form/InputNew';
import useNWStore from '~/lib/store';
import { useAction } from '~/hooks/action';
import { actionUpdateClient } from '~/actions/client-action';
import { EnumResponseStatus } from '~/constants/enums';
import { useRouter } from 'next/navigation';

function GeneralTabs() {
	const t = useTranslations();
	const client = useNWStore((state) => state.edit.client);
	const route = useRouter();

	const { result, pending, action, reset, submit } =
		useAction(actionUpdateClient);

	useEffect(() => {
		if (result?.status === EnumResponseStatus.SUCCESS) {
			route.refresh();
		}
	}, [result, route]);

	return (
		<Form.Root action={action} onChange={reset} onSubmit={submit}>
			<div className='bg-secondary flex flex-col space-y-4'>
				<div className='border-stroke flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-start rounded-md border-2'>
					<PersonPic photo={client?.avatar} size={120} />
				</div>
				<input type='hidden' name='uuid' value={client?.uuid || ''} />
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

				<ButtonEditViewAction pending={pending} />
			</div>
		</Form.Root>
	);
}

export default GeneralTabs;
