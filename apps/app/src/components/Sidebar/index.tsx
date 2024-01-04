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
import { CurrentBranch } from './Branch';
import { useOpenModal } from '@nw/modal';

const LINKS = [
	{ href: routes.ROOT, label: 'breadcrumbs.app', Icon: HiHome },
	{ href: routes.TIMETABLE, label: 'breadcrumbs.timetable', Icon: HiCalendar },
	{ href: routes.CLIENTS, label: 'breadcrumbs.clients', Icon: HiUsers },
	{
		href: routes.SERVICES,
		label: 'breadcrumbs.services',
		Icon: HiLightningBolt,
	},
	{
		href: routes.PRODUCTS,
		label: 'breadcrumbs.products',
		Icon: HiMiniBuildingStorefront,
	},
	null,
	{ href: routes.USERS, label: 'breadcrumbs.users', Icon: HiUserCircle },
];

const isActive = (pathName: string, route: string) =>
	pathName.replace(/\/+$/, '') === route.replace(/\/+$/, '');

function Sidebar({ params }: { params: Record<string, string> }) {
	const openModal = useOpenModal();

	const pathName = usePathname();
	const t = useTranslations('common');

	const onOpenProjects = useCallback(() => {
		openModal({ name: MODALS.PROJECTS });
	}, []);

	return (
		<aside className='overflow-y-auto top-0 bottom-0 z-20 left-0 fixed flex flex-col w-10 sm:w-14 md:w-32 lg:w-64 lg:px-4 py-4 lg:py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-800 dark:border-gray-700'>
			<nav className='flex flex-col flex-1 pt-[80px]'>
				<CurrentBranch
					message={'Meraki'}
					onClick={onOpenProjects}
					color='pink'
					image='https://source.unsplash.com/random?w=64&h=64'
				/>

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
