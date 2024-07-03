'use client';

import clsx from 'clsx';
import Link from 'next/link';
import SidebarBurgerIcon from '~icons/SidebarBurgerIcon';
import LogoSidebar from '~icons/LogoSidebar';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Box } from '~root/components/layout';
import { useDevice } from '~root/hooks/device';
import { EnumDeviceType, EnumProtectedRoutes } from '~constants/enums';
import ItemList from './components/ItemList';
import CardItem from './components/CardItem';
import Separator from './components/Separator';
import useNWStore from '~lib/store';
import DropdownMenuSidebar from './components/DropdownMenuSidebar';

const Sidebar = () => {
	const device = useDevice();
	const [mounted, setMounted] = useState(false);
	const ui = useNWStore((state) => state.ui);
	const setUI = useNWStore((state) => state.setUI);

	useLayoutEffect(() => {
		if (device === EnumDeviceType.DESKTOP || device === EnumDeviceType.TABLET) {
			setMounted(true);
		} else {
			setMounted(ui.sidebar);
		}
	}, [device, ui.sidebar]);

	const toggleSidebar = useCallback(() => {
		setUI({ sidebar: !ui.sidebar });
	}, [ui.sidebar, setUI]);

	return (
		<Box
			className={clsx('relative z-20 w-0 md:w-[54px] lg:w-[250px]')}
			flexShrink='0'
		>
			{/*  */}
			<Collapsible.Root className='fixed' open={mounted}>
				<Collapsible.Content className='animate-slideRightAndFade data-[state=closed]:animate-slideLeftAndFade shadow-md will-change-[opacity,transform]'>
					<aside className='h-screen' aria-label='Sidebar'>
						<div className='bg-secondary flex h-full flex-col rounded-r-sm px-3 py-4 md:px-0 lg:px-3'>
							<div className='mb-5 flex'>
								<Link
									href={EnumProtectedRoutes.APP}
									className='flex items-center md:px-2 lg:ps-2.5'
								>
									<LogoSidebar />
									<span className='self-center whitespace-nowrap px-3 text-xl font-semibold md:hidden lg:block dark:text-white'>
										<span className='from-cyan-1 to-blue-1 bg-gradient-to-r bg-clip-text text-transparent'>
											NEX
										</span>
										WAVE
									</span>
								</Link>
								<Collapsible.Trigger asChild className='block md:hidden'>
									<button
										aria-label='Toggle Sidebar'
										type='button'
										onClick={toggleSidebar}
										className='text-gray-5 hover:bg-gray-2 cursor-pointer rounded-md'
									>
										<SidebarBurgerIcon />
									</button>
								</Collapsible.Trigger>
							</div>
							<DropdownMenuSidebar />
							<Separator />
							<ItemList />
							<div className='mt-auto'>
								<Separator />
							</div>
							<CardItem />
						</div>
					</aside>
				</Collapsible.Content>
			</Collapsible.Root>
		</Box>
	);
};

export default Sidebar;
