import ColumnsIcon from '~root/icons/ColumnsIcon';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import CheckboxFilterClientsHeader from './FilterClientsHeader/CheckboxFilterClientsHeader';

const TableSettings = () => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<ColumnsIcon />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content className='bg-secondary custom-scrollbar animate-slideUpAndFade relative mt-2 h-[356px] w-[250px] overflow-auto rounded-md shadow-md will-change-[opacity,transform]'>
			<div className='p-3 px-5'>
				<ul>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader
							id='name-phone'
							label='Name / Phone number'
							checked={true}
						/>
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader
							id='date-of-birth'
							label='Date of birth'
						/>
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader
							id='social-media'
							label='Social media'
						/>
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader
							id='badges'
							label='Badges'
							checked={true}
						/>
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader
							id='season-ticket'
							label='Season ticket'
							checked={true}
						/>
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='start-date' label='Start Date' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader
							id='last-visit'
							label='Last visit'
							checked={true}
						/>
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader
							id='actions'
							label='Actions'
							checked={true}
						/>
					</li>
				</ul>
			</div>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
);

export default TableSettings;
