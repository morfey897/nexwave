import { useTranslations } from 'next-intl';
import {
	HiUsers,
	HiCalendar,
	HiUserCircle,
	HiHome,
	HiLightningBolt,
	HiCog,
} from 'react-icons/hi';
import { HiMiniBuildingStorefront } from 'react-icons/hi2';
import React from 'react';
import * as routes from '@/routes';
import NavButton from '@/components/Button/NavButton';
import { dynamicHref } from '@/utils';
import ActiveProject from './ActiveProject.client';

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

function Sidebar({ params }: { params: Record<string, string> }) {
	const t = useTranslations();

	return (
		<aside className='fixed bottom-0 left-0 top-0 z-20 flex w-10 flex-col overflow-y-auto overflow-x-hidden border-r bg-white py-4 sm:w-14 md:w-32 lg:w-64  lg:px-4 lg:py-8 rtl:border-l rtl:border-r-0 dark:border-gray-700 dark:bg-gray-800'>
			<nav className='flex flex-1 flex-col pt-[80px]'>
				<ActiveProject />
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
						return (
							<NavButton
								key={href}
								href={dynamicHref(href, params)}
								message={t(label)}
								icon={<Icon size={32} />}
							/>
						);
					})}
				</div>
			</nav>
			<div className='flex flex-col'>
				<NavButton
					href={dynamicHref(routes.SETTINGS, params)}
					message={t('general.settings')}
					icon={<HiCog size={32} />}
				/>
			</div>
		</aside>
	);
}
export default Sidebar;
