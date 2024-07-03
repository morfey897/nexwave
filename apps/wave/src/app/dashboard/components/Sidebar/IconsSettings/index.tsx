import { useTranslations } from 'next-intl';
import CalendarIcon from '~/icons/CalendarIcon';
import ClientsIcon from '~/icons/ClientsIcon';
import DashboardIcon from '~/icons/DashboardIcon';
import EmployeeIcon from '~/icons/EmployeesIcon';
import ProductsIcon from '~/icons/ProductIscon';
import ServicesIcon from '~/icons/ServicesIcon';
import SettingsIcon from '~/icons/SettingsIcon';
import { SidebarItem } from '~/types';

export default function SidebarIconsSettings(): SidebarItem[] {
	const t = useTranslations();
	return [
		{
			name: t('general.dashboard'),
			icon: <DashboardIcon />,
			href: '/dashboard',
		},
		{ name: t('general.calendar'), icon: <CalendarIcon />, href: '/calendar' },
		{ name: t('general.clients'), icon: <ClientsIcon />, href: '/clients' },
		{ name: t('general.services'), icon: <ServicesIcon />, href: '/services' },
		{ name: t('general.products'), icon: <ProductsIcon />, href: '/products' },
		{ type: 'divider' },
		{
			name: t('general.employees'),
			icon: <EmployeeIcon />,
			href: '/employees',
		},
		{ name: t('general.settings'), icon: <SettingsIcon />, href: '/settings' },
	];
}
