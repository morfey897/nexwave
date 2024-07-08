import ColumnsIcon from '~/icons/ColumnsIcon';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import CheckboxGroup from '~/components/controls/CheckboxGroup';

const TableSettings = () => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<ColumnsIcon />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content className='bg-secondary custom-scrollbar animate-slideUpAndFade relative mt-2 h-[356px] w-[250px] overflow-auto rounded-md shadow-md will-change-[opacity,transform]'>
			<CheckboxGroup
				options={[
					{ name: 'name-phone', label: 'Name / Phone number', checked: true },
					{ name: 'date-of-birth', label: 'Date of birth' },
					{ name: 'social-media', label: 'Social media' },
					{ name: 'badges', label: 'Badges', checked: true },
					{ name: 'season-ticket', label: 'Season ticket', checked: true },
					{ name: 'start-date', label: 'Start Date' },
					{ name: 'last-visit', label: 'Last visit', checked: true },
					{ name: 'actions', label: 'Actions', checked: true },
				]}
			/>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
);

export default TableSettings;
