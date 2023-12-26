'use client';
import { useTranslations } from 'next-intl';
import {
	HiUsers,
	HiCalendar,
	HiUserCircle,
	HiHome,
	HiCog,
	HiLightningBolt,
} from 'react-icons/hi';
import { HiMiniBuildingStorefront } from 'react-icons/hi2';
import React from 'react';
import * as routes from '@/routes';
import NavItem from '@/components/NavItem';
import LocaleSwitcher from '@/components/Locale';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { dynamicHref } from '@/utils';

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

function Aside({ params }: { params: Record<string, string> }) {
	const pathName = usePathname();
	const t = useTranslations('common');

	const activeClassName = '!bg-gray-200 dark:!bg-gray-700';

	return (
		<aside className='top-0 bottom-0 z-20 left-0 fixed flex flex-col w-10 sm:w-14 md:w-32 lg:w-64 lg:px-4 py-4 lg:py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-800 dark:border-gray-700'>
			<nav className='flex flex-col flex-1 space-y-2 md:space-y-6 pt-[80px]'>
				{LINKS.map((item) => {
					if (!item)
						return <hr key={'hr_none'} className='my-6 border-gray-200 dark:border-gray-600' />;

					const { href, label, Icon } = item;
					const link = dynamicHref(href, params);
					return (
						<NavItem
							key={link}
							href={link}
							label={t(label)}
							Icon={Icon}
							className={clsx(
								isActive(pathName, link) && activeClassName,
								'!rounded-lg',
							)}
						/>
					);
				})}
			</nav>

			<div className='flex flex-col md:flex-row justify-center'>
				<NavItem href={dynamicHref(routes.SETTINGS, params)} Icon={HiCog} />
				<div className='flex items-center flex-col lg:flex-row'>
					<LocaleSwitcher />
				</div>
			</div>
		</aside>
	);
}
export default Aside;
