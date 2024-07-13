'use client';

import * as Form from '@radix-ui/react-form';

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { DropdownIndicator } from './DropdownIndicator';
import ButtonEditViewAction from './ButtonEditViewAction';
import { SelectSettings } from '~/components/select-settings/SelectSettings';
import { EditViewSelect } from '~/types/select';

import { EnumClientBadge, EnumResponseStatus } from '~/constants/enums';
import { useTranslations } from 'next-intl';
import { useAction } from '~/hooks/action';
import { actionUpdateClient } from '~/actions/client-action';
import useNWStore from '~/lib/store';
import { useRouter } from 'next/navigation';
import Input from '~/components/form/InputNew';

const getBudges = (badges: string | undefined) =>
	(badges || '')
		.split(',')
		.filter((badge) => !!badge)
		.map((title) => ({
			label: title,
			value: title,
		}));

function VisitsTabs() {
	const t = useTranslations();
	const client = useNWStore((state) => state.edit.client);
	const route = useRouter();

	// const [startDate, setStartDate] = useState('2024-04-12');
	// const [lastVisit, setLastVisit] = useState('2024-04-12');
	// const [selectedOptionBadge, setSelectedOptionBadge] =
	// 	useState<EditViewSelect | null>(null);
	const [selectedOptionTicket, setSelectedOptionTicket] =
		useState<EditViewSelect | null>(null);

	const { result, pending, action, reset, submit } =
		useAction(actionUpdateClient);

	useEffect(() => {
		if (result?.status === EnumResponseStatus.SUCCESS) {
			route.refresh();
		}
	}, [result, route]);

	const optionsTicket: EditViewSelect[] = [
		{ label: 'Active', name: 'active' },
		{ label: 'Paused', name: 'paused' },
		{ label: 'No', name: 'no' },
	];

	// const handleChangeBadges = (selectedOptionBadges: EditViewSelect) => {
	// 	setSelectedOptionBadge(selectedOptionBadges as EditViewSelect);
	// };

	const handleChangeTicket = (selectedOptionTickets: EditViewSelect) => {
		setSelectedOptionTicket(selectedOptionTickets as EditViewSelect);
	};

	return (
		<Form.Root action={action} onChange={reset} onSubmit={submit}>
			<div className='bg-secondary flex flex-col space-y-4'>
				<div className='custom-scrollbar relative mt-5 w-full'>
					<input type='hidden' name='uuid' value={client?.uuid || ''} />
					<label
						htmlFor='badges'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
					>
						{t('page.clients.badges')}
					</label>
					<Select
						name='badges'
						options={Object.values(EnumClientBadge).map((badge) => ({
							label: badge,
							value: badge,
						}))}
						styles={SelectSettings}
						defaultValue={getBudges(client?.meta.badges)}
						isMulti
						isSearchable={false}
					/>
				</div>
				<div className='custom-scrollbar relative mt-5 w-full'>
					<label
						htmlFor='select-ticket'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
					>
						Season ticket
					</label>
					<div className='relative'>
						<Select
							id='select-ticket'
							name='select-ticket'
							// @ts-expect-error: Temporary workaround for incompatible types
							options={optionsTicket}
							styles={SelectSettings}
							// @ts-expect-error: Temporary workaround for incompatible types
							value={selectedOptionTicket}
							// @ts-expect-error: Temporary workaround for incompatible types
							onChange={handleChangeTicket}
							isSearchable={false}
							components={{ DropdownIndicator }}
						/>
					</div>
				</div>
				{/* <div className='relative'>
					<label
						htmlFor='start-date'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
					>
						Start date
					</label>
					<input
						type='date'
						placeholder='Date of birth'
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
					/>
				</div> */}
				<Input
					label={t('form.last_visit')}
					name='lastVisitAt'
					type='date'
					defaultValue={
						client?.lastVisitAt
							? client.lastVisitAt.toISOString().split('T')[0]
							: ''
					}
				/>
				<div className='relative'>
					<label
						htmlFor='visited-classes'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
					>
						Visited classes
					</label>
					<input
						id='visited-classes'
						name='visited-classes'
						type='text'
						autoComplete='visited-classes'
						className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
					></input>
				</div>
				<ButtonEditViewAction pending={pending} />
			</div>
		</Form.Root>
	);
}

export default VisitsTabs;
