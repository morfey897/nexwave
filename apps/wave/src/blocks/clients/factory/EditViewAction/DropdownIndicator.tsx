import { components, DropdownIndicatorProps } from 'react-select';
import { RoundedPlus } from '~/icons';

export const DropdownIndicator = (
	props: DropdownIndicatorProps<string, true>
) => (
	<components.DropdownIndicator {...props}>
		<RoundedPlus
			fill={
				props.isFocused ? 'var(--user-selected)' : 'var(--primary-text-gray)'
			}
		/>
	</components.DropdownIndicator>
);
