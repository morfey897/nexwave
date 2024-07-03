import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import FilterIcon from '~root/icons/FilterIcon';
import CheckboxFilterClientsHeader from './FilterClientsHeader/CheckboxFilterClientsHeader';

const HoverSettingsClientsHeader = () => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<FilterIcon width={24} height={24} />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content className='bg-secondary custom-scrollbar animate-slideUpAndFade relative mt-2 h-[301px] w-[250px] overflow-auto rounded-md shadow-md will-change-[opacity,transform]'>
			<div className='p-3 px-5'>
				<span className='text-primary-text-gray font-inter text-base font-medium leading-6'>
					Badge
				</span>
				<ul>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='regular' label='Regular' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='newbie' label='Newbie' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='vip' label='VIP' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='problem' label='Problem' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='blocked' label='Blocked' />
					</li>
				</ul>
			</div>
			<div className='p-3 px-5'>
				<span className='text-primary-text-gray font-inter text-base font-medium leading-6'>
					Season Ticket
				</span>

				<ul>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='active' label='Active' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='paused' label='Paused' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='no' label='No' />
					</li>
				</ul>
			</div>
			<div className='p-3 px-5'>
				<span className='text-primary-text-gray font-inter text-base font-medium leading-6'>
					Start Date
				</span>
				<ul>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='lastYear' label='Last year' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='last6Month' label='Last 6 month' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='last3Month' label='Last 3 month' />
					</li>
					<li className='mt-4'>
						<CheckboxFilterClientsHeader id='lastMonth' label='Last month' />
					</li>
				</ul>
			</div>
			<div className='p-3 px-5'>
				<span className='text-primary-text-gray font-inter text-base font-medium leading-6'>
					Last Visit
				</span>
			</div>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
);

export default HoverSettingsClientsHeader;
