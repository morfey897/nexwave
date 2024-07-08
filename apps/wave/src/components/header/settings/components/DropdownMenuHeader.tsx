import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import SidebarMockIcon from '~/icons/SidebarMockIcon';
import { Box } from '~/components/layout';

const DropdownMenuHeader = () => (
	<DropdownMenu.Root>
		<DropdownMenu.Trigger className='outline-none'>
			<div className='cursor-pointer items-center outline-none md:flex md:px-2 lg:ps-2.5'>
				<SidebarMockIcon />
			</div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content
			side='bottom'
			className='animate-slideRightAndFade bg-secondary relative will-change-[opacity,transform]'
		>
			<div className='w-64 rounded-lg p-1 shadow-xl'>
				<DropdownMenu.Item className='outline-none'>
					<Link href='#' className='mb-5 ml-3 mt-5 flex items-center'>
						<Box flexShrink='0'>
							<SidebarMockIcon />
						</Box>
						<span className='self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white'>
							Ballet School
						</span>
					</Link>
				</DropdownMenu.Item>
				<DropdownMenu.Item className='outline-none'>
					<Link href='#' className='mb-5 ml-3 mt-5 flex items-center'>
						<Box flexShrink='0'>
							<SidebarMockIcon />
						</Box>
						<span className='self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white'>
							Pole Dance
						</span>
					</Link>
				</DropdownMenu.Item>
			</div>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
);

export default DropdownMenuHeader;
