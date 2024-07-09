'use client';
import { useTranslations } from 'next-intl';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { COLORS } from '~/constants/enums';
import useNWStore from '~/lib/store';
import { ColorOptionSelect } from '~/types/select';

const ColorThemeBlock = () => {
	const t = useTranslations();
	const project = useNWStore((state) => state.project);

	const initialValue = project?.color;

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

	useEffect(() => {
		if (initialValue) {
			setSelectedColor({
				value: initialValue,
				label: t(`color.${initialValue}`),
				color: initialValue,
			});
		}
	}, [initialValue, t]);

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: 'var(--color-bg-secondary)',
			borderColor: state.isFocused
				? 'var(--blue-1)'
				: 'var(--color-border-gray-5)',
			boxShadow: state.isFocused
				? '0 0 0 1px var(--color-border-gray-5)'
				: null,
			'&:hover': {
				borderColor: 'var(--gray-5)',
			},
		}),
		option: (provided, state) => ({
			...provided,
			display: 'flex',
			alignItems: 'center',
			color: state.data.color,
			backgroundColor: state.isFocused
				? 'var(--color-option-bg-hover)'
				: 'var(--color-option-bg)',
			'&:hover': {
				backgroundColor: 'var(--gray-2)',
			},
		}),
		singleValue: (provided, state) => ({
			...provided,
			display: 'flex',
			alignItems: 'center',
			color: state.data.color,
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: 'var(--secondary)',
		}),
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
		<div className='mt-5 flex flex-col'>
			<div className='flex flex-col'>
				<span className='font-inter text-base font-medium leading-6'>
					Color Theme
				</span>
				<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
					You can change the color theme from the suggested colors. The new
					color theme will be applied to buttons and graphics.
				</span>
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
					styles={customStyles}
					formatOptionLabel={formatOptionLabel}
					className='mt-1'
					value={selectedColor}
					onChange={handleChange}
					isSearchable={false}
				/>
			</div>
		</div>
	);
};

export default ColorThemeBlock;
