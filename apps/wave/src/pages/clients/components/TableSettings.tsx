import ColumnsIcon from '~/icons/ColumnsIcon';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import CheckboxFilterClientsHeader from '../../../components/controls/CheckboxFilter';

const TableSettings = () => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<ColumnsIcon />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content className='bg-secondary custom-scrollbar animate-slideUpAndFade relative z-30 mt-2 h-[356px] w-[250px] overflow-auto rounded-md shadow-md will-change-[opacity,transform]'>
			<div className='p-3 px-5 '>
				<ul className='space-y-4'>
					<li>
						<CheckboxFilterClientsHeader label='Name / Phone number' checked />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Date of birth' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Social media' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Badges' checked />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Season ticket' checked />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Start Date' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Last visit' checked />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Actions' checked />
					</li>
				</ul>
			</div>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
);

export default TableSettings;
