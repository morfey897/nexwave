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
import * as routes from '@/constants/routes';
import NavItem from '@/components/NavItem';
import LocaleSwitcher from '@/components/Locale';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const isActive = (pathName: string, route: string) =>
	pathName.replace(/\/+$/, '') === route.replace(/\/+$/, '');

function Aside() {
	const pathName = usePathname();
	const t = useTranslations('header');

	const activeClassName = '!bg-gray-200 dark:!bg-gray-700';

	return (
		<div className='flex-shrink-0 h-screen w-14 md:w-32 lg:w-64'>
			<aside className='top-0 bottom-0 z-10 left-0 fixed flex flex-col w-14 md:w-32 lg:w-64 lg:px-4 py-4 lg:py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-800 dark:border-gray-700'>
				<nav className='flex flex-col flex-1 space-y-2 md:space-y-6 pt-[80px]'>
					<NavItem
						href={routes.ROOT}
						label={t('breadcrumbs.app')}
						Icon={HiHome}
						className={clsx(isActive(pathName, routes.ROOT) && activeClassName)}
					/>
					<NavItem
						href={routes.TIMETABLE}
						label={t('breadcrumbs.timetable')}
						Icon={HiCalendar}
						className={clsx(
							isActive(pathName, routes.TIMETABLE) && activeClassName,
						)}
					/>
					<NavItem
						href={routes.CLIENTS}
						label={t('breadcrumbs.clients')}
						Icon={HiUsers}
						className={clsx(
							isActive(pathName, routes.CLIENTS) && activeClassName,
						)}
					/>
					<NavItem
						href={routes.SERVICES}
						label={t('breadcrumbs.services')}
						Icon={HiLightningBolt}
						className={clsx(
							isActive(pathName, routes.SERVICES) && activeClassName,
						)}
					/>
					<NavItem
						href={routes.PRODUCTS}
						label={t('breadcrumbs.products')}
						Icon={HiMiniBuildingStorefront}
						className={clsx(
							isActive(pathName, routes.PRODUCTS) && activeClassName,
						)}
					/>
					<hr className='my-6 border-gray-200 dark:border-gray-600' />
					<NavItem
						href={routes.USERS}
						label={t('breadcrumbs.users')}
						Icon={HiUserCircle}
						className={clsx(
							isActive(pathName, routes.USERS) && activeClassName,
						)}
					/>
				</nav>

				<div className='flex flex-col md:flex-row justify-center'>
					<NavItem href={routes.SETTINGS} Icon={HiCog} />
					<LocaleSwitcher />
				</div>
			</aside>
		</div>
	);
}
export default Aside;
