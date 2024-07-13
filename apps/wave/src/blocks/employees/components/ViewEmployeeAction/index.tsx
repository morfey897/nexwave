'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import { LockIcon, PencilIcon, TrashIcon } from '~/icons';
import { useTranslations } from 'next-intl';
import * as Tabs from '@radix-ui/react-tabs';
import GeneralTabs from './GeneralTabs';
import ExperienceTabs from './ExperienceTabs';
import WorkTabs from './WorkTabs';
import useNWStore from '~/lib/store';
import { useCallback, useState } from 'react';
import Button from '~/components/buttons/Button';
import clsx from 'clsx';

const ViewEmployeeAction = () => {
	const t = useTranslations();
	const employee = useNWStore((state) => state.edit.employee);
	const setEdit = useNWStore((state) => state.setEdit);

	const [mode, setMode] = useState<'edit' | 'view'>('view');

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (!open) {
				setMode('view');
				setEdit({ employee: null });
			}
		},
		[setEdit]
	);

	return (
		<AlertDialog.Root open={!!employee} onOpenChange={handleOpenChange}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className='fixed inset-0 z-20 backdrop-blur' />
				<AlertDialog.Content className='data-[state=open]:animate-slideRightAndFade bg-secondary fixed right-0 top-0 z-30 h-full w-full translate-x-0 translate-y-0 rounded-r-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none md:w-auto'>
					<div className='flex justify-between'>
						<AlertDialog.Title className='font-inter text-xl font-semibold leading-7'>
							{t('page.view_employee.headline')}
						</AlertDialog.Title>
						<AlertDialog.Cancel asChild>
							<span className='hover:text-primary-text-gray cursor-pointer'>
								<SidebarBurgerIcon />
							</span>
						</AlertDialog.Cancel>
					</div>
					<div className='mb-5 mt-2 flex flex-row justify-between'>
						<AlertDialog.Description className='text-[15px] leading-normal'>
							{t('page.view_employee.subheadline')}
						</AlertDialog.Description>
						<div className='flex space-x-4'>
							<button type='button'>
								<LockIcon />
							</button>
							<button
								onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}
							>
								<PencilIcon
									className={clsx(mode === 'edit' && 'fill-blue-2')}
								/>
							</button>
							<button type='button'>
								<TrashIcon />
							</button>
						</div>
					</div>
					<Tabs.Root className='flex w-full flex-col' defaultValue='tab1'>
						<div className='bg-secondary z-10'>
							<Tabs.List
								className='flex w-full flex-col md:w-[621px] md:flex-row'
								aria-label='Manage your account'
							>
								<Tabs.Trigger
									className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
									value='tab1'
								>
									{t('page.view_employee.tab_general')}
								</Tabs.Trigger>
								<Tabs.Trigger
									className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
									value='tab2'
								>
									{t('page.view_employee.tab_work')}
								</Tabs.Trigger>
								<Tabs.Trigger
									className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
									value='tab3'
								>
									{t('page.view_employee.tab_experience')}
								</Tabs.Trigger>
							</Tabs.List>
						</div>
						<Tabs.Content
							className='mt-5 h-full rounded-b-md outline-none'
							value='tab1'
						>
							<GeneralTabs mode={mode} />
						</Tabs.Content>
						<Tabs.Content
							className='bg-secondary h-full rounded-b-md outline-none'
							value='tab2'
						>
							<WorkTabs />
						</Tabs.Content>
						<Tabs.Content
							className='bg-secondary h-full rounded-b-md outline-none'
							value='tab3'
						>
							<ExperienceTabs />
						</Tabs.Content>
					</Tabs.Root>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default ViewEmployeeAction;
