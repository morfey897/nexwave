'use client';

import { useTranslations } from 'next-intl';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { COLORS } from '~/constants/enums';
import useNWStore from '~/lib/store';
import { ColorOptionSelect } from '~/types/select';
import { SelectSettings } from '~/components/select-settings/SelectSettings';
import Picture from '~/components/picture/Picture';
import { abbrev } from '~/utils';

const ColorThemeBlock = () => {
	const t = useTranslations();
	const project = useNWStore((state) => state.project);

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
		if (project?.color) {
			setSelectedColor({
				value: project.color,
				label: t(`color.${project.color}`),
				color: project.color,
			});
		}
	}, [project, t]);

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
		<>
			<div className='mt-5 flex flex-col'>
				<div className='flex flex-col'>
					<span className='font-inter text-base font-medium leading-6'>
						Logo
					</span>
					<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
						By default, your logo is shown as an abbreviation of the school
						name. You can upload your logo (PNG, JPG, GIF file up to 5 MB).
					</span>
				</div>
				<div className='border-stroke mt-5 flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-md border-2 p-6'>
					<Picture
						name={project?.name}
						photo={project?.image}
						abbrev={abbrev(project?.name.split(' '))}
						color={selectedColor?.color}
						size={64}
					/>
				</div>
			</div>
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
		</>
	);
};

export default ColorThemeBlock;
