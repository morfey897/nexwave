import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import SearchIcon from '~/icons/SearchIcon';

const SearchInput = () => (
	<div className='relative h-[48px] w-[250px]'>
		<input
			type='text'
			placeholder='Search'
			className='border-stroke h-full w-full rounded-md pl-12'
		/>
		<div className='absolute left-4 top-1/2 -translate-y-1/2 transform'>
			<SearchIcon />
		</div>
	</div>
);

const HoverCardClientsHeader = () => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<SearchIcon width={24} height={24} />
		</DropdownMenu.Trigger>
		<DropdownMenu.Portal>
			<DropdownMenu.Content>
				<SearchInput />
			</DropdownMenu.Content>
		</DropdownMenu.Portal>
	</DropdownMenu.Root>
);

SearchInput.Hover = HoverCardClientsHeader;

export default SearchInput;
