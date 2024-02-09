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

const isActive = (pathName: string, route: string) =>
	pathName.replace(/\/+$/, '') === route.replace(/\/+$/, '');

function Sidebar({
	params,
	pathname,
}: {
	params: Record<string, string>;
	pathname: string;
}) {
	const t = useTranslations();

	return (
		<aside className='overflow-y-auto overflow-x-hidden top-0 bottom-0 z-20 left-0 fixed flex flex-col w-10 sm:w-14 md:w-32 lg:w-64 lg:px-4 py-4 lg:py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-800 dark:border-gray-700'>
			<nav className='flex flex-col flex-1 pt-[80px]'>
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
						const link = dynamicHref(href, params);
						return (
							<NavButton
								key={link}
								href={link}
								message={t(label)}
								icon={<Icon size={32} />}
								active={isActive(pathname, link)}
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
