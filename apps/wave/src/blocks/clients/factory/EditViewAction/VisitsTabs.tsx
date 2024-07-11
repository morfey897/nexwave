import { useState } from 'react';
import Select from 'react-select';
import { DropdownIndicator } from './DropdownIndicator';
import ButtonEditViewAction from './ButtonEditViewAction';
import { SelectSettings } from '~/components/select-settings/SelectSettings';
import { EditViewSelect } from '~/types/select';

function VisitsTabs() {
	const [startDate, setStartDate] = useState('2024-04-12');
	const [lastVisit, setLastVisit] = useState('2024-04-12');
	const [selectedOptionBadge, setSelectedOptionBadge] =
		useState<EditViewSelect | null>(null);
	const [selectedOptionTicket, setSelectedOptionTicket] =
		useState<EditViewSelect | null>(null);

	const optionsBadges: EditViewSelect[] = [
		{ label: 'Regular', value: 'regular' },
		{ label: 'Newbie', value: 'newbie' },
		{ label: 'VIP', value: 'vip' },
		{ label: 'Problem', value: 'problem' },
		{ label: 'Blocked', value: 'blocked' },
	];

	const optionsTicket: EditViewSelect[] = [
		{ label: 'Active', name: 'active' },
		{ label: 'Paused', name: 'paused' },
		{ label: 'No', name: 'no' },
	];

	const handleChangeBadges = (selectedOptionBadges: EditViewSelect) => {
		setSelectedOptionBadge(selectedOptionBadges as EditViewSelect);
	};
	const handleChangeTicket = (selectedOptionTickets: EditViewSelect) => {
		setSelectedOptionTicket(selectedOptionTickets as EditViewSelect);
	};

	return (
		<div className='bg-secondary flex flex-col space-y-4'>
			<div className='custom-scrollbar relative mt-5 w-full'>
				<label
					htmlFor='select-badges'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
				>
					Badges
				</label>
				<Select
					id='select-badges'
					name='select-badges'
					options={optionsBadges}
					styles={SelectSettings}
					value={selectedOptionBadge}
					// @ts-expect-error: Temporary workaround for incompatible types
					onChange={handleChangeBadges}
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
			<div className='relative'>
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
			</div>
			<div className='relative'>
				<label
					htmlFor='last-visit'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Last visit
				</label>
				<input
					type='date'
					placeholder='Last visit'
					value={lastVisit}
					onChange={(e) => setLastVisit(e.target.value)}
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				/>
			</div>
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
			<ButtonEditViewAction />
		</div>
	);
}

export default VisitsTabs;
