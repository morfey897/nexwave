import FilterIcon from '~/icons/FilterIcon';
import CheckboxFilterClientsHeader from '~/components/controls/CheckboxFilter';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const FilterClientsHeader = () => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<div className='relative h-[48px] w-[250px]'>
				<select className='border-stroke text-primary-text-gray font-inter h-full w-full cursor-pointer rounded-md pl-12 text-base font-normal leading-6'>
					<option value=''>Filter</option>
				</select>
				<div className='absolute left-6 top-1/2 -translate-y-1/2 transform'>
					<FilterIcon />
				</div>
			</div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content className='bg-secondary custom-scrollbar animate-slideUpAndFade relative mt-2 h-[301px] w-[250px] overflow-auto rounded-md shadow-md will-change-[opacity,transform]'>
			<div className='p-3 px-5'>
				<span className='text-primary-text-gray font-inter text-base font-medium leading-6'>
					Badge
				</span>
				<ul className='gap-y-2'>
					<li>
						<CheckboxFilterClientsHeader label='Regular' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Newbie' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='VIP' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Problem' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Blocked' />
					</li>
				</ul>
			</div>
			<div className='p-3 px-5'>
				<span className='text-primary-text-gray font-inter text-base font-medium leading-6'>
					Season Ticket
				</span>

				<ul className='gap-y-2'>
					<li>
						<CheckboxFilterClientsHeader label='Active' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Paused' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='No' />
					</li>
				</ul>
			</div>
			<div className='p-3 px-5'>
				<span className='text-primary-text-gray font-inter text-base font-medium leading-6'>
					Start Date
				</span>
				<ul className='gap-y-2'>
					<li>
						<CheckboxFilterClientsHeader label='Last year' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Last 6 month' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Last 3 month' />
					</li>
					<li>
						<CheckboxFilterClientsHeader label='Last month' />
					</li>
				</ul>
			</div>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
);

export default FilterClientsHeader;
