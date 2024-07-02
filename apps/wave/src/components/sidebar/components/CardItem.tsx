import Image from 'next/image';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import RightArrow from '~icons/RightArrow';
import SidebarMockIcon from '~icons/SidebarMockIcon';
import { Box, Flex } from '~components/layout';
import { Button } from '~components/buttons/Button';

function CardItem() {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className='outline-none'>
				<div className='mb-5 hidden cursor-pointer items-center outline-none md:flex md:px-2 lg:ps-2.5'>
					<Image
						src='/assets/test-avatar.png'
						alt='User profile'
						width={40}
						height={40}
						className='rounded-lg'
					/>
					<Flex justify='space-between' align='center' className='w-full'>
						<Box className='ml-3 text-left md:hidden lg:block'>
							<p className='text-sm font-medium'>Mariya Desoja</p>
							<p className='text-primary-text text-xs'>Manager</p>
						</Box>
						<RightArrow />
					</Flex>
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				side='left'
				className='animate-slideRightAndFade relative will-change-[opacity,transform]'
			>
				<div className='bg-secondary w-64 rounded-lg py-2.5 px-px shadow-xl'>
					<DropdownMenu.Item className='outline-none'>
						<Button variant='text'>My Profile</Button>
						{/* <Link href='#' className='mb-5 ml-3 mt-5 flex items-center'>
							<Box flexShrink='0'>
								<SidebarMockIcon />
							</Box>
							<span className='text-secondary-text self-center whitespace-nowrap px-3 text-xl font-semibold'>
								Ballet School
							</span>
						</Link> */}
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

export default CardItem;
