import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import RightArrow from '~/icons/RightArrow';
import SidebarMockIcon from '~/icons/SidebarMockIcon';
import { Box } from '~/components/layout';
import useNWStore from '~/lib/store';

function DropdownMenuSidebar() {
	const project = useNWStore((state) => state.project);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className='outline-none'>
				<div className='mb-5 hidden cursor-pointer items-center outline-none md:flex md:px-2 lg:ps-2.5'>
					<SidebarMockIcon />
					<span
						className='text-primary-text w-60 items-center gap-5 self-center overflow-hidden whitespace-normal px-3 text-xl font-semibold md:hidden lg:flex'
						style={{ width: '13ch', overflowWrap: 'break-word' }}
					>
						{project ? project.name : 'Select Project'}
						<RightArrow />
					</span>
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				side='left'
				className='animate-slideRightAndFade relative will-change-[opacity,transform]'
			>
				<div className='bg-secondary w-64 rounded-lg p-1 shadow-xl'>
					<DropdownMenu.Item className='outline-none'>
						<Link href='#' className='mb-5 ml-3 mt-5 flex items-center'>
							<Box flexShrink='0'>
								<SidebarMockIcon />
							</Box>
							<span className='text-secondary-text self-center whitespace-nowrap px-3 text-xl font-semibold'>
								Ballet School
							</span>
						</Link>
					</DropdownMenu.Item>
					<DropdownMenu.Item className='outline-none'>
						<Link href='#' className='mb-5 ml-3 mt-5 flex items-center'>
							<Box flexShrink='0'>
								<SidebarMockIcon />
							</Box>
							<span className='text-secondary-text self-center whitespace-nowrap px-3 text-xl font-semibold'>
								Pole Dance
							</span>
						</Link>
					</DropdownMenu.Item>
				</div>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

export default DropdownMenuSidebar;
