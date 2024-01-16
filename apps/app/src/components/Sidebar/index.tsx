'use client';
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
import React, { useCallback } from 'react';
import * as routes from '@/routes';
import { MODALS } from '@/routes';
import NavItem from '@/components/Sidebar/NavItem';
import { usePathname } from 'next/navigation';
import { dynamicHref } from '@/utils';
import { useOpenModal } from '@nw/modal';
import { useNWStore } from '@/hooks/store';
import { Button, ButtonSkeleton } from '@/components/Button';
import BranchIcon from '@/components/Project/Icon';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import clsx from 'clsx';
import { EnumState } from '@/enums';

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
	const activeProject = useNWStore((state) => state.project);
	const openModal = useOpenModal();

	const pathName = usePathname();
	const t = useTranslations();

	const onOpenProjects = useCallback(() => {
		openModal({ name: MODALS.PROJECTS });
	}, [openModal]);

	return (
		<aside className='overflow-y-auto overflow-x-hidden top-0 bottom-0 z-20 left-0 fixed flex flex-col w-10 sm:w-14 md:w-32 lg:w-64 lg:px-4 py-4 lg:py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-800 dark:border-gray-700'>
			<nav className='flex flex-col flex-1 pt-[80px]'>
				{activeProject ? (
					<Button
						variant='light'
						onClick={onOpenProjects}
						message={activeProject.name}
						className={clsx(
							'flex-col lg:flex-row [&>.message]:hidden md:[&>.message]:inline-block !px-0',
							{
								'!border-blue-400 dark:!border-blue-600':
									activeProject?.state === EnumState.DRAFT ||
									!activeProject?.state,
								'!border-green-400 dark:!border-green-800':
									activeProject?.state === EnumState.ACTIVE,
								'!border-orange-400 dark:!border-orange-600':
									activeProject?.state === EnumState.INACTIVE,
							},
						)}
						icon={
							<span className='relative mt-1.5'>
								<BranchIcon
									image={activeProject.image}
									size={24}
									marker={{
										color: activeProject.color,
										size: 10,
									}}
									altFallback='project'
								/>
							</span>
						}
						// iconAfter={
						// 	<span className='text-blue-500'>
						// 		<HiMiniPencilSquare size={24} />
						// 	</span>
						// }
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
			<div className='flex flex-col'>
				<NavItem
					href={dynamicHref(routes.SETTINGS, params)}
					message={t('general.settings')}
					icon={<HiCog size={32} />}
				/>
			</div>
		</aside>
	);
}
export default Sidebar;
