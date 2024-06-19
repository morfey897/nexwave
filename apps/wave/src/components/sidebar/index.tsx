'use client';
import clsx from 'clsx';
import Link from 'next/link';
import SidebarBurgerIcon from '~icons/SidebarBurgerIcon';
import LogoSidebar from '~icons/LogoSidebar';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import HamburgerIcon from '~icons/HamburgerIcon';
import { useLayoutEffect, useState } from 'react';
import { Box } from '~root/components/layout';
import { useDevice } from '~root/hooks/device';
import { EnumDeviceType } from '~constants/enums';
import SidebarMockIcon from '~root/icons/SidebarMockIcon';
import RightArrow from '~root/icons/RightArrow';
import ItemList from './components/ItemList';
import CardItem from './components/CardItem';
import Separator from './components/Separator';

const Sidebar = () => {
	const device = useDevice();
	const [mounted, setMounted] = useState(false);

	useLayoutEffect(() => {
		if (device === EnumDeviceType.DESKTOP || device === EnumDeviceType.TABLET) {
			setMounted(true);
		} else {
			setMounted(false);
		}
	}, [device]);

	return (
		<Box
			className={clsx('relative w-0 md:w-[54px] lg:w-[250px]')}
			flexShrink='0'
		>
			<Collapsible.Root className='fixed' open={mounted}>
				{/* This trigger should be a part of header */}
				<Collapsible.Trigger
					asChild
					className='fixed'
					onClick={() => setMounted(true)}
				>
					<button>
						<HamburgerIcon />
					</button>
				</Collapsible.Trigger>
				<Collapsible.Content className='animate-slideRightAndFade data-[state=closed]:animate-slideLeftAndFade will-change-[opacity,transform]'>
					<aside className='h-screen' aria-label='Sidebar'>
						<div className='flex h-full flex-col rounded-r-sm bg-gray-50 px-3 py-4 md:px-0 lg:px-3 dark:bg-gray-800'>
							<div className='mb-5 flex'>
								<Link href='#' className='flex items-center md:px-2 lg:ps-2.5'>
									<LogoSidebar />
									<span className='self-center whitespace-nowrap px-3 text-xl font-semibold md:hidden lg:block dark:text-white'>
										<span className='bg-gradient-to-r from-cyan-300 to-blue-700 bg-clip-text text-transparent'>
											NEX
										</span>
										WAVE
									</span>
								</Link>
								<Collapsible.Trigger asChild className='block md:hidden'>
									<button
										onClick={() => setMounted(false)}
										className='cursor-pointer rounded-md text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
									>
										<SidebarBurgerIcon />
									</button>
								</Collapsible.Trigger>
							</div>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger className='outline-none'>
									<div className='mb-5 hidden cursor-pointer items-center outline-none md:flex md:px-2 lg:ps-2.5'>
										<SidebarMockIcon />
										<span className='items-center gap-5 self-center whitespace-nowrap px-3 text-xl font-semibold md:hidden lg:flex dark:text-white'>
											Ballet School
											<RightArrow />
										</span>
									</div>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content
									side='left'
									className='animate-slideRightAndFade relative will-change-[opacity,transform]'
								>
									<div className='w-64 rounded-lg bg-gray-50 p-1 shadow-xl'>
										<DropdownMenu.Item className='outline-none'>
											<Link
												href='#'
												className='mb-5 ml-3 mt-5 flex items-center'
											>
												<Box flexShrink='0'>
													<SidebarMockIcon />
												</Box>
												<span className='self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white'>
													Ballet School
												</span>
											</Link>
										</DropdownMenu.Item>
										<DropdownMenu.Item className='outline-none'>
											<Link
												href='#'
												className='mb-5 ml-3 mt-5 flex items-center'
											>
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
							<Separator />
							<ItemList />
							<CardItem />
						</div>
					</aside>
				</Collapsible.Content>
			</Collapsible.Root>
		</Box>
	);
};

export default Sidebar;
