'use client';
import { useTranslations } from 'next-intl';
import {
	HiUsers,
	HiCalendar,
	HiUserCircle,
	HiHome,
	HiLightningBolt,
} from 'react-icons/hi';
import { HiMiniBuildingStorefront } from 'react-icons/hi2';
import React, { useCallback } from 'react';
import * as routes from '@/routes';
import { MODALS } from '@/routes';
import NavItem from '@/components/Sidebar/NavItem';
import { usePathname } from 'next/navigation';
import { dynamicHref } from '@/utils';
import { useOpenModal } from '@nw/modal';
import { useNWStore } from '@/hooks/store';
import { Button, ButtonSkeleton } from '@/components/Button';
import clsx from 'clsx';
import BranchIcon from '@/components/Project/BranchIcon';
import Marker from '@/components/Project/Marker';

const LINKS = [
	{ href: routes.ROOT, label: 'general.app', Icon: HiHome },
	{ href: routes.TIMETABLE, label: 'general.timetable', Icon: HiCalendar },
	{ href: routes.CLIENTS, label: 'general.clients', Icon: HiUsers },
	{
		href: routes.SERVICES,
		label: 'general.services',
		Icon: HiLightningBolt,
	},
	{
		href: routes.PRODUCTS,
		label: 'general.products',
		Icon: HiMiniBuildingStorefront,
	},
	null,
	{ href: routes.USERS, label: 'general.users', Icon: HiUserCircle },
];

const isActive = (pathName: string, route: string) =>
	pathName.replace(/\/+$/, '') === route.replace(/\/+$/, '');

function Sidebar({ params }: { params: Record<string, string> }) {
	const activeProject = useNWStore((state) => state.activeProject);
	const openModal = useOpenModal();

	const pathName = usePathname();
	const t = useTranslations();

	const onOpenProjects = useCallback(() => {
		openModal({ name: MODALS.PROJECTS });
	}, [openModal]);

	return (
		<aside className='overflow-y-auto top-0 bottom-0 z-20 left-0 fixed flex flex-col w-10 sm:w-14 md:w-32 lg:w-64 lg:px-4 py-4 lg:py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-800 dark:border-gray-700'>
			<nav className='flex flex-col flex-1 pt-[80px]'>
				{activeProject ? (
					<Button
						onClick={onOpenProjects}
						message={activeProject.name}
						className={
							'flex-col lg:flex-row [&>.message]:hidden md:[&>.message]:inline-block'
						}
						icon={
							<span className='relative'>
								<BranchIcon image={activeProject.image} size={24} />
								<span className='absolute -top-2 -right-2'>
									<Marker
										size={24}
										color={activeProject.color}
										className='animate-pulse'
									/>
								</span>
							</span>
						}
					/>
				) : (
					<ButtonSkeleton />
				)}
				<hr className='my-4 border-gray-200 dark:border-gray-600' />

				<div className='space-y-2 md:space-y-6'>
					{LINKS.map((item) => {
						if (!item)
							return (
								<hr
									key={'hr_none'}
									className='my-2 border-gray-200 dark:border-gray-600'
								/>
							);

						const { href, label, Icon } = item;
						const link = dynamicHref(href, params);
						return (
							<NavItem
								key={link}
								href={link}
								message={t(label)}
								icon={<Icon size={32} />}
								active={isActive(pathName, link)}
							/>
						);
					})}
				</div>
			</nav>
		</aside>
	);
}
export default Sidebar;
