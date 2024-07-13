import { useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import Select from 'react-select';
import { SelectSettings } from '~/components/select-settings/SelectSettings';
import { EditViewCallendarSelect, EditViewSelect } from '~/types/select';

function RepeatBlock() {
	const [isRepeatChecked, setIsRepeatChecked] = useState(true);

	const handleChange = (isRepeat: boolean) => {
		setIsRepeatChecked(isRepeat);
	};

	const [selectedOptionRepeat, setSelectedOptionRepeat] =
		useState<EditViewCallendarSelect | null>(null);
	const [selectedOptionEndRepeat, setSelectedOptionEndRepeat] =
		useState<EditViewCallendarSelect | null>(null);
	const [selectedOptionRepeatOn, setSelectedOptionRepeatOn] =
		useState<EditViewCallendarSelect | null>(null);

	const optionsRepeat: EditViewCallendarSelect[] = [
		{ label: 'Weekly', value: 'weekly' },
		{ label: 'Daily', value: 'daily' },
	];

	const optionsEndRepeat: EditViewCallendarSelect[] = [
		{ label: 'Never', value: 'never' },
	];

	const optionsRepeatOn = [
		{ label: 'Sunday', value: 'sunday' },
		{ label: 'Monday', value: 'monday' },
		{ label: 'Tuesday', value: 'tuesday' },
		{ label: 'Wednesday', value: 'wednesday' },
		{ label: 'Thursday', value: 'thursday' },
		{ label: 'Friday', value: 'friday' },
		{ label: 'Saturday', value: 'saturday' },
	];

	const handleChangeRepeat = (selectedOptionRepeats: EditViewSelect) => {
		setSelectedOptionRepeat(selectedOptionRepeats as EditViewSelect);
	};
	const handleChangeEndRepeat = (selectedOptionEndRepeats: EditViewSelect) => {
		setSelectedOptionEndRepeat(selectedOptionEndRepeats as EditViewSelect);
	};

	const handleChangeRepeatOn = (selectedOptionRepeatOn: EditViewSelect) => {
		setSelectedOptionRepeatOn(selectedOptionRepeatOn as EditViewSelect);
	};

	return (
		<div className='bg-secondary mt-5 flex flex-col space-y-4'>
			<h2 className='font-inter text-base font-medium leading-6'>Repeat</h2>
			<div className='flex items-center'>
				<Checkbox.Root
					className='bg-secondary border-blue-1 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full border'
					checked={isRepeatChecked}
					onCheckedChange={() => handleChange(true)}
					id='c1'
				>
					<Checkbox.Indicator>
						<div className='bg-blue-1 h-3 w-3 rounded-full' />
					</Checkbox.Indicator>
				</Checkbox.Root>
				<label className='pl-[15px] text-[15px] leading-none' htmlFor='c1'>
					Repeat
				</label>
			</div>
			<div className='flex items-center'>
				<Checkbox.Root
					className='bg-secondary border-blue-1 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full border'
					checked={!isRepeatChecked}
					onCheckedChange={() => handleChange(false)}
					id='c2'
				>
					<Checkbox.Indicator>
						<div className='bg-blue-1 h-3 w-3 rounded-full' />
					</Checkbox.Indicator>
				</Checkbox.Root>
				<label className='pl-[15px] text-[15px] leading-none' htmlFor='c2'>
					No Repeat
				</label>
			</div>
			<div className='flex flex-row space-x-8'>
				<div className='relative mt-5 w-full'>
					<label
						htmlFor='select-repeat'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
					>
						Repeat<span className='text-red-600'>*</span>
					</label>
					<Select
						id='select-repeat'
						name='select-repeat'
						options={optionsRepeat}
						styles={SelectSettings}
						value={selectedOptionRepeat}
						// @ts-expect-error: Temporary workaround for incompatible types
						onChange={handleChangeRepeat}
						isSearchable={false}
						required
					/>
				</div>
				<div className='relative mt-5 w-full'>
					<label
						htmlFor='select-end-repeat'
						className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
					>
						End repeat<span className='text-red-600'>*</span>
					</label>
					<Select
						id='select-end-repeat'
						name='select-end-repeat'
						options={optionsEndRepeat}
						styles={SelectSettings}
						value={selectedOptionEndRepeat}
						// @ts-expect-error: Temporary workaround for incompatible types
						onChange={handleChangeEndRepeat}
						isSearchable={false}
						required
					/>
				</div>
			</div>
			<div className='relative mt-5 w-full'>
				<label
					htmlFor='select-repeat-on'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
				>
					Repeat on<span className='text-red-600'>*</span>
				</label>
				<Select
					id='select-repeat-on'
					name='select-repeat-on'
					options={optionsRepeatOn}
					styles={SelectSettings}
					value={selectedOptionRepeatOn}
					// @ts-expect-error: Temporary workaround for incompatible types
					onChange={handleChangeRepeatOn}
					isSearchable={false}
					required
					isMulti
				/>
			</div>
		</div>
	);
}

export default RepeatBlock;
