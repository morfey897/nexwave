import CheckboxGroup from '~/components/controls/CheckboxGroup';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const Filters = ({ children }: { children?: React.ReactNode }) => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
		<DropdownMenu.Portal>
			<DropdownMenu.Content className='bg-secondary custom-scrollbar animate-slideUpAndFade relative mt-2 h-[301px] w-[250px] overflow-auto rounded-md shadow-md will-change-[opacity,transform]'>
				<div className='space-y-3 px-5'>
					<CheckboxGroup
						label='Badge'
						options={[
							{ label: 'Regular', name: 'regular' },
							{ label: 'Newbie', name: 'newbie' },
							{ label: 'VIP', name: 'vip' },
							{ label: 'Problem', name: 'problem' },
							{ label: 'Blocked', name: 'blocked' },
						]}
					/>
					<CheckboxGroup
						label='Season Ticket'
						options={[
							{ label: 'Active', name: 'active' },
							{ label: 'Paused', name: 'paused' },
							{ label: 'No', name: 'no' },
						]}
					/>
					<CheckboxGroup
						label='Start Date'
						options={[
							{ label: 'Last year', name: 'lastYear' },
							{ label: 'Last 6 month', name: 'last6Month' },
							{ label: 'Last 3 month', name: 'last3Month' },
							{ label: 'Last month', name: 'lastMonth' },
						]}
					/>
				</div>
			</DropdownMenu.Content>
		</DropdownMenu.Portal>
	</DropdownMenu.Root>
);

export default Filters;
