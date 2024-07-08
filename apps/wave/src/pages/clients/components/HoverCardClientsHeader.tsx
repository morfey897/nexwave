import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import SearchInput from './SearchInput';
import SearchIcon from '~/icons/SearchIcon';

const HoverCardClientsHeader = () => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<SearchIcon width={24} height={24} />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<SearchInput />
		</DropdownMenu.Content>
	</DropdownMenu.Root>
);

export default HoverCardClientsHeader;
