import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Select from 'react-select';
import { SelectSettings } from '~/components/select-settings/SelectSettings';
import { COLORS } from '~/constants/enums';
import {
	ColorOptionSelect,
	EditViewCallendarSelect,
	EditViewSelect,
} from '~/types/select';

function SettingsBlock() {
	const t = useTranslations();

	const [selectedOptionHall, setSelectedOptionHall] =
		useState<EditViewCallendarSelect | null>(null);
	const [selectedOptionAccess, setSelectedOptionAccess] =
		useState<EditViewCallendarSelect | null>(null);

	const [selectedOptionSize, setSelectedOptionSize] =
		useState<EditViewCallendarSelect | null>(null);

	const optionsHall: EditViewCallendarSelect[] = [
		{ label: 'Hall 1', value: 'hall-1' },
		{ label: 'Hall 2', value: 'hall-2' },
	];

	const optionsAccess: EditViewCallendarSelect[] = [
		{ label: 'Open', value: 'open' },
		{ label: 'Close', value: 'close' },
	];

	const optionsSize: EditViewCallendarSelect[] = [
		{ label: 'Group', value: 'group' },
		{ label: 'Individual', value: 'individual' },
	];

	const handleChangeHall = (selectedOptionHalls: EditViewSelect) => {
		setSelectedOptionHall(selectedOptionHalls as EditViewSelect);
	};
	const handleChangeAccess = (selectedOptionHalls: EditViewSelect) => {
		setSelectedOptionAccess(selectedOptionHalls as EditViewSelect);
	};
	const handleChangeSize = (selectedOptionSizes: EditViewSelect) => {
		setSelectedOptionSize(selectedOptionSizes as EditViewSelect);
	};

	const colorOptions: ColorOptionSelect[] = COLORS.map((clr) => ({
		value: clr,
		label: t(`color.${clr}`),
		color: clr,
	}));

	const [selectedColor, setSelectedColor] = useState<ColorOptionSelect | null>({
		value: '',
		label: '',
		color: '',
	});

	const handleChange = (selectedOption: ColorOptionSelect) => {
		setSelectedColor(selectedOption as ColorOptionSelect);
	};

	const formatOptionLabel = ({ label, color }: ColorOptionSelect) => (
		<div className='flex items-center'>
			<span
				className='mr-2 inline-block h-4 w-4 rounded-full'
				style={{ backgroundColor: color }}
			></span>
			{label}
		</div>
	);

	return (
		<div className='bg-secondary mt-5 flex flex-col space-y-4'>
			<h2 className='font-inter text-base font-medium leading-6'>Settings</h2>
			<div className='relative mt-5 w-full'>
				<label
					htmlFor='hall'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
				>
					Hall<span className='text-red-600'>*</span>
				</label>
				<Select
					id='hall'
					name='hall'
					options={optionsHall}
					styles={SelectSettings}
					value={selectedOptionHall}
					required
					// @ts-expect-error: Temporary workaround for incompatible types
					onChange={handleChangeHall}
					isSearchable={false}
				/>
			</div>
			<div className='relative mt-5 w-full'>
				<label
					htmlFor='select-access'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
				>
					Access<span className='text-red-600'>*</span>
				</label>
				<div className='relative'>
					<Select
						id='select-access'
						name='select-access'
						options={optionsAccess}
						styles={SelectSettings}
						value={selectedOptionAccess}
						// @ts-expect-error: Temporary workaround for incompatible types
						onChange={handleChangeAccess}
						isSearchable={false}
						required
					/>
				</div>
			</div>
			<div className='relative mt-5 w-full'>
				<label
					htmlFor='size'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
				>
					Size<span className='text-red-600'>*</span>
				</label>
				<Select
					id='size'
					name='size'
					options={optionsSize}
					styles={SelectSettings}
					value={selectedOptionSize}
					required
					// @ts-expect-error: Temporary workaround for incompatible types
					onChange={handleChangeSize}
					isSearchable={false}
				/>
			</div>
			<div className='custom-scrollbar relative mt-5 w-full'>
				<label
					htmlFor='color'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
				>
					Color <span className='text-red-600'>*</span>
				</label>
				<Select
					id='color'
					name='color'
					options={colorOptions}
					styles={SelectSettings}
					formatOptionLabel={formatOptionLabel}
					className='mt-1'
					value={selectedColor}
					// @ts-expect-error: Temporary workaround for incompatible types
					onChange={handleChange}
					isSearchable={false}
				/>
			</div>
		</div>
	);
}

export default SettingsBlock;
