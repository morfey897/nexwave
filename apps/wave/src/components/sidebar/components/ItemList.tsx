'use client';

import Link from 'next/link';
import Separator from './Separator';
import { useTranslations } from 'next-intl';
import CalendarIcon from '~/icons/CalendarIcon';
import ClientsIcon from '~/icons/ClientsIcon';
import DashboardIcon from '~/icons/DashboardIcon';
import EmployeeIcon from '~/icons/EmployeesIcon';
import ProductsIcon from '~/icons/ProductIscon';
import ServicesIcon from '~/icons/ServicesIcon';
import SettingsIcon from '~/icons/SettingsIcon';
import { useMemo } from 'react';
import { EnumProtectedRoutes } from '~/constants/enums';
import { buildDynamicHref } from '~/utils';
import useNWStore from '~/lib/store';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const isActive = (pathName: string, route: string) =>
	pathName.replace(/\/+$/, '') === route.replace(/\/+$/, '');

const LINKS = [
	{
		name: 'general.dashboard',
		Icon: DashboardIcon,
		href: EnumProtectedRoutes.ROOT,
	},
	{
		name: 'general.calendar',
		Icon: CalendarIcon,
		href: EnumProtectedRoutes.TIMETABLE,
	},
	{
		name: 'general.clients',
		Icon: ClientsIcon,
		href: EnumProtectedRoutes.CLIENTS,
	},
	{
		name: 'general.services',
		Icon: ServicesIcon,
		href: EnumProtectedRoutes.SERVICES,
	},
	{
		name: 'general.products',
		Icon: ProductsIcon,
		href: EnumProtectedRoutes.PRODUCTS,
	},
	{ type: 'divider', key: 'divider_1' },
	{
		name: 'general.employees',
		Icon: EmployeeIcon,
		href: EnumProtectedRoutes.USERS,
	},
	{
		name: 'general.settings',
		Icon: SettingsIcon,
		href: EnumProtectedRoutes.SETTINGS,
	},
];

const ItemList = () => {
	const t = useTranslations();
	const project = useNWStore((state) => state.project);
	const pathname = usePathname();

	const links = useMemo(
		() =>
			LINKS.map((item) => {
				if (item.type === 'divider') {
					return (
						<li key={item.key}>
							<Separator />
						</li>
					);
				}

				if (item.href) {
					const href = project ? buildDynamicHref(item.href, project) : '#';
					return (
						<li key={item.href}>
							<Link
								href={href}
								className={clsx(
									'focus:outline-user-selected hover:border-user-selected hover:bg-gray-2 text-secondary-text flex items-center rounded-t-lg border-b-2 border-transparent p-2 focus:rounded-lg focus:border-b-0 dark:hover:bg-gray-700',
									isActive(pathname, href) && 'bg-gray-2 dark:bg-gray-700'
								)}
							>
								<span>{item.Icon && <item.Icon />}</span>
								<span className='ms-3 md:hidden lg:block'>
									{item.name && t(item.name)}
								</span>
							</Link>
						</li>
					);
				}
				return null;
			}),
		[t, project, pathname]
	);

	return (
		<div className='hide-scroll overflow-y-auto py-1'>
			<ul className='space-y-2 font-medium md:px-2 lg:px-3'>{links}</ul>
		</div>
	);
};

export default ItemList;
