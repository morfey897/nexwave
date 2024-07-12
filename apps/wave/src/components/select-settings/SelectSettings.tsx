export const SelectSettings = {
	// @ts-expect-error: Temporary workaround for incompatible types
	control: (provided, state) => ({
		...provided,
		height: state.selectProps.isMulti ? 'auto' : '44px',
		paddingTop: state.selectProps.isMulti ? '10px' : '0px',
		backgroundColor: 'var(--color-bg-secondary)',
		borderColor: state.isFocused
			? 'var(--blue-1)'
			: 'var(--color-border-gray-5)',
		boxShadow: state.isFocused ? '0 0 0 1px var(--color-border-gray-5)' : null,
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
		zIndex: 20,
	}),
};
