import Link from 'next/link';
import Separator from './Separator';
import { useTranslations } from 'next-intl';
import CalendarIcon from '~icons/CalendarIcon';
import ClientsIcon from '~icons/ClientsIcon';
import DashboardIcon from '~icons/DashboardIcon';
import EmployeeIcon from '~icons/EmployeesIcon';
import ProductsIcon from '~icons/ProductIscon';
import ServicesIcon from '~icons/ServicesIcon';
import SettingsIcon from '~icons/SettingsIcon';
import { useMemo } from 'react';
import { EnumProtectedRoutes } from '~constants/enums';
import { dynamicHref } from '~utils';

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
	{ type: 'divider' },
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

	const links = useMemo(
		() =>
			LINKS.map((item, index) => ({
				...item,
				name: !!item.name && t(item.name),
				key: item.href || `${item.type}/${index}`,
				href: item.href ? dynamicHref(item.href, { uuid: 'me' }) : undefined,
			})),
		[t]
	);

	return (
		<div className='hide-scroll overflow-y-auto py-1'>
			<ul className='space-y-2 font-medium md:px-2 lg:px-3'>
				{links.map((item) =>
					!item.href ? (
						<li key={item.key}>
							<Separator />
						</li>
					) : (
						<li key={item.key}>
							<Link
								href={item.href}
								className='focus:outline-user-selected hover:border-user-selected hover:bg-gray-2 text-secondary-text flex items-center rounded-t-lg border-b-2 border-transparent p-2 focus:rounded-lg focus:border-b-0 dark:hover:bg-gray-700'
							>
								<span>{item.Icon && <item.Icon />}</span>
								<span className='ms-3 md:hidden lg:block'>{item.name}</span>
							</Link>
						</li>
					)
				)}
			</ul>
		</div>
	);
};

export default ItemList;
