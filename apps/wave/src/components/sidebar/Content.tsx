'use client';

import React, { useCallback, useMemo } from 'react';

import Link from 'next/link';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import LogoSidebar from '~/icons/LogoSidebar';
import { EnumProtectedRoutes } from '~/constants/enums';
import ItemList from './components/ItemList';
import CardItem from './components/CardItem';
import Separator from './components/Separator';
import useNWStore from '~/lib/store';
import DropdownProjects from './components/DropdownProjects';
import { buildDynamicHref } from '~/utils';
import clsx from 'clsx';

function Content({ className }: React.HTMLAttributes<HTMLDivElement>) {
	const ui = useNWStore((state) => state.ui);
	const setUI = useNWStore((state) => state.setUI);
	const project = useNWStore((state) => state.project);

	const toggleSidebar = useCallback(() => {
		setUI({ sidebar: !ui.sidebar });
	}, [ui.sidebar, setUI]);

	const projectHref = useMemo(
		() =>
			project
				? buildDynamicHref(EnumProtectedRoutes.ROOT, project)
				: EnumProtectedRoutes.APP,
		[project]
	);

	return (
		<aside className={clsx('h-screen', className)} aria-label='Sidebar'>
			<div className='bg-secondary flex h-full flex-col rounded-r-sm px-3 py-4 md:px-0 lg:px-3'>
				<div className='mb-5 flex'>
					<Link
						href={projectHref}
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
					<button
						aria-label='Toggle Sidebar'
						type='button'
						onClick={toggleSidebar}
						className='text-gray-5 hover:bg-gray-2 block cursor-pointer rounded-md md:hidden'
					>
						<SidebarBurgerIcon />
					</button>
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
	);
}

export default Content;
