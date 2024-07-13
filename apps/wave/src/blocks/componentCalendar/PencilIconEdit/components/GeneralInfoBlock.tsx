import { useState } from 'react';
import Select from 'react-select';
import { SelectSettings } from '~/components/select-settings/SelectSettings';
import { EditViewCallendarSelect, EditViewSelect } from '~/types/select';

function GeneralInfoBlock() {
	const [selectedOptionService, setSelectedOptionService] =
		useState<EditViewCallendarSelect | null>(null);
	const [selectedOptionTrainer, setSelectedOptionTrainer] =
		useState<EditViewCallendarSelect | null>(null);

	const optionsService: EditViewCallendarSelect[] = [
		{ label: 'Stretching', value: 'stretching' },
		{ label: 'Boxing', value: 'boxing' },
		{ label: 'MMA', value: 'mma' },
	];

	const optionsTrainer: EditViewCallendarSelect[] = [
		{ label: 'Victoria', value: 'victoria' },
		{ label: 'Olviya', value: 'olviya' },
	];

	const handleChangeServices = (selectedOptionServices: EditViewSelect) => {
		setSelectedOptionService(selectedOptionServices as EditViewSelect);
	};
	const handleChangeTrainers = (selectedOptionTrainers: EditViewSelect) => {
		setSelectedOptionTrainer(selectedOptionTrainers as EditViewSelect);
	};

	return (
		<div className='bg-secondary flex flex-col space-y-4'>
			<h2 className='font-inter text-base font-medium leading-6'>
				General info
			</h2>
			<div className='relative'>
				<label
					htmlFor='name'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Name<span className='text-red-600'>*</span>
				</label>
				<input
					id='name'
					name='name'
					type='text'
					required
					autoComplete='name'
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
			<div className='custom-scrollbar relative mt-5 w-full'>
				<label
					htmlFor='select-service'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
				>
					Service<span className='text-red-600'>*</span>
				</label>
				<Select
					id='select-service'
					name='select-service'
					options={optionsService}
					styles={SelectSettings}
					value={selectedOptionService}
					// @ts-expect-error: Temporary workaround for incompatible types
					onChange={handleChangeServices}
					isSearchable={false}
					required
				/>
			</div>
			<div className='custom-scrollbar relative mt-5 w-full'>
				<label
					htmlFor='select-trainer'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
				>
					Trainer<span className='text-red-600'>*</span>
				</label>
				<div className='relative'>
					<Select
						id='select-trainer'
						name='select-trainer'
						options={optionsTrainer}
						styles={SelectSettings}
						value={selectedOptionTrainer}
						// @ts-expect-error: Temporary workaround for incompatible types
						onChange={handleChangeTrainers}
						isSearchable={false}
						required
					/>
				</div>
			</div>
			<div className='relative'>
				<label
					htmlFor='price'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					Price<span className='text-red-600'>*</span>
				</label>
				<input
					id='price'
					name='price'
					type='text'
					required
					autoComplete='price'
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
		</div>
	);
}

export default GeneralInfoBlock;
