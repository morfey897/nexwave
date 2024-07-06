'use client';

import clsx from 'clsx';
import Link from 'next/link';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import LogoSidebar from '~/icons/LogoSidebar';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { Box } from '~/components/layout';
import { useDevice } from '~/hooks/device';
import { EnumDeviceType, EnumProtectedRoutes } from '~/constants/enums';
import ItemList from './components/ItemList';
import CardItem from './components/CardItem';
import Separator from './components/Separator';
import useNWStore from '~/lib/store';
import DropdownProjects from '~/components/general/DropdownProjects';
import { buildDynamicHref } from '~/utils';
import { usePathname } from 'next/navigation';
import { useMounted } from '~/hooks/mounted';

const Sidebar = () => {
	const device = useDevice();
	const isMounted = useMounted();
	const ui = useNWStore((state) => state.ui);
	const setUI = useNWStore((state) => state.setUI);
	const project = useNWStore((state) => state.project);
	const pathname = usePathname();

	useLayoutEffect(() => {}, [pathname]);

	useEffect(() => {
		if (ui.sidebar === true) {
			setUI({ sidebar: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, setUI]);

	const toggleSidebar = useCallback(() => {
		setUI({ sidebar: !ui.sidebar });
	}, [ui.sidebar, setUI]);

	const isOpen = useMemo(() => {
		if (device === EnumDeviceType.NONE) return false;

		return (
			device === EnumDeviceType.DESKTOP ||
			device === EnumDeviceType.TABLET ||
			ui.sidebar
		);
	}, [ui.sidebar, device]);

	return (
		<Box
			className={clsx('relative z-20 w-0 md:w-[54px] lg:w-[250px]')}
			flexShrink='0'
		>
			<Collapsible.Root className='fixed' open={isMounted && isOpen}>
				<Collapsible.Content className='animate-slideRightAndFade data-[state=closed]:animate-slideLeftAndFade shadow-md will-change-[opacity,transform]'>
					<aside className='h-screen' aria-label='Sidebar'>
						<div className='bg-secondary flex h-full flex-col rounded-r-sm px-3 py-4 md:px-0 lg:px-3'>
							<div className='mb-5 flex'>
								<Link
									href={
										project
											? buildDynamicHref(EnumProtectedRoutes.APP, project)
											: '#'
									}
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
							<div className='hidden md:block'>
								<DropdownProjects side='left' sideOffset={12} />
							</div>
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
