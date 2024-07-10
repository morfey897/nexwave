'use client';
import { useEffect, useState } from 'react';
import CheckboxSettings from '../../GeneralSettings/CheckboxSettings';
import { CURRENCIES } from '~/constants/enums';
import Select from 'react-select';
import useNWStore from '~/lib/store';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { CurrencyOptionSelect } from '~/types/select';

const PaymentBlock = () => {
	const [selectedCurrency, setSelectedCurrency] =
		useState<CurrencyOptionSelect | null>(null);
	const t = useTranslations();
	const project = useNWStore((state) => state.project);

	const initialValue = project?.currency;

	const importIcon = (currencyCode: string) => {
		try {
			const Icon = dynamic(() =>
				import(`~/icons/${currencyCode}Icon`).then((mod) => mod.default)
			);
			return Icon;
		} catch (err) {
			console.error(`Icon for ${currencyCode} not found`);
			return null;
		}
	};

	const currencyOptions: CurrencyOptionSelect[] = CURRENCIES.map((currency) => {
		const IconComponent = importIcon(currency);
		return {
			value: currency,
			label: t(`currency.${currency}`),
			IconComponent,
		};
	});

	useEffect(() => {
		if (initialValue) {
			setSelectedCurrency({
				value: initialValue,
				label: t(`currency.${initialValue}`),
				IconComponent: importIcon(initialValue),
			});
		}
	}, [initialValue, t]);

	const customStyles = {
		// @ts-expect-error: Temporary workaround for incompatible types
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
		// @ts-expect-error: Temporary workaround for incompatible types
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
		// @ts-expect-error: Temporary workaround for incompatible types
		singleValue: (provided, state) => ({
			...provided,
			display: 'flex',
			alignItems: 'center',
			color: state.data.color,
		}),
		// @ts-expect-error: Temporary workaround for incompatible types
		menu: (provided) => ({
			...provided,
			backgroundColor: 'var(--secondary)',
		}),
	};

	const handleChange = (selectedOption: CurrencyOptionSelect) => {
		setSelectedCurrency(selectedOption as CurrencyOptionSelect);
	};

	const formatOptionLabel = ({
		label,
		IconComponent,
	}: {
		label: string;
		IconComponent?: React.ComponentType | null;
	}) => (
		<div className='flex items-center'>
			{IconComponent && (
				<span className='mr-2 h-4 w-4 rounded-full'>
					<IconComponent />
				</span>
			)}
			{label}
		</div>
	);

	return (
		<>
			<div className='mt-5 flex flex-col'>
				<span className='font-inter text-base font-medium leading-6'>
					Payment types
				</span>
				<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
					Provide payment types in your school.
				</span>
			</div>
			<div className='flex flex-row gap-10'>
				<div className='flex flex-col gap-2'>
					<CheckboxSettings id='cash' label='Cash' checked />
					<CheckboxSettings id='card' label='Card' checked />
					<CheckboxSettings id='bank-transfer' label='Bank Transfer' checked />
					<CheckboxSettings
						id='internet-banking'
						label='Internet Banking'
						checked
					/>
				</div>
			</div>
			<div className='relative my-6'>
				<label
					htmlFor='currency'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
				>
					Currency <span className='text-red-600'>*</span>
				</label>
				<Select
					id='currency'
					name='currency'
					styles={customStyles}
					options={currencyOptions}
					value={selectedCurrency}
					// @ts-expect-error: Temporary workaround for incompatible types
					onChange={handleChange}
					formatOptionLabel={formatOptionLabel}
					className='mt-1'
					isSearchable={false}
				/>
			</div>
		</>
	);
};

export default PaymentBlock;
