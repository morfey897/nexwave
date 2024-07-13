'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import { Button } from '~/components/buttons/Button';
import { LockIcon, PencilIcon, TrashIcon } from '~/icons';
import { useTranslations } from 'next-intl';
import * as Tabs from '@radix-ui/react-tabs';
import GeneralTabs from './EnrolledTabs';
import ExperienceTabs from './ExperienceTabs';
import WorkTabs from './WorkTabs';
import ArchiveIcon from '~/icons/ArchiveIcon';
import { DescriptionContent } from './ViewEmployeeContent';
import EmployeeActionContentLayout from './CalendaryViewActionContentLayout';
import Separator from '~/components/sidebar/components/Separator';
import EnrolledTabs from './EnrolledTabs';
import CalendarActionContentLayout from './CalendarActionContentLayout';
import RejectedTabs from './RejectedTabs';
import QueueTabs from './QueueTabs';
import PencilIconEdit from '../PencilIconEdit';
import useNWStore from '~/lib/store';
import { useCallback } from 'react';

const ViewCalendarAction = () => {
	const t = useTranslations();

	const editCalendar = useNWStore((state) => state.edit.calendar);
	const setEdit = useNWStore((state) => state.setEdit);

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (!open) {
				setEdit({ calendar: false });
			}
		},
		[setEdit]
	);

	return (
		<AlertDialog.Root open={editCalendar} onOpenChange={handleOpenChange}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className='fixed inset-0 z-40 backdrop-blur' />
				<AlertDialog.Content className='data-[state=open]:animate-slideRightAndFade bg-secondary fixed right-0 top-0 z-50 h-full w-full translate-x-0 translate-y-0 rounded-r-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none md:w-auto'>
					<div className='flex justify-between'>
						<AlertDialog.Title className='font-inter text-xl font-semibold leading-7'>
							View event
						</AlertDialog.Title>
						<AlertDialog.Cancel asChild>
							<span className='hover:text-primary-text-gray cursor-pointer'>
								<SidebarBurgerIcon />
							</span>
						</AlertDialog.Cancel>
					</div>
					<AlertDialog.Description className='mb-5 mt-2 text-[15px] leading-normal'>
						<div className='flex flex-row justify-between'>
							<span>Event</span>
							<div className='flex space-x-4'>
								<ArchiveIcon />
								<PencilIconEdit />
							</div>
						</div>
						<div>
							<div className='bg-secondary mt-5 flex flex-col'>
								<div className='flex w-auto flex-col space-y-4 md:w-[30rem]'>
									{DescriptionContent.map((item, index) => (
										<CalendarActionContentLayout
											key={index}
											name={item.name}
											value={item.value}
											picture={item.picture}
										/>
									))}
								</div>
							</div>
						</div>
					</AlertDialog.Description>
					<Separator />
					<div className='mt-5 flex flex-row justify-between'>
						<span>Clients</span>
						<span>Max - 10</span>
					</div>
					<Tabs.Root
						className='flex h-full w-full flex-col'
						defaultValue='tab1'
					>
						<div className='bg-secondary z-10'>
							<Tabs.List
								className='flex w-full flex-col md:w-[621px] md:flex-row'
								aria-label='Manage your account'
							>
								<Tabs.Trigger
									className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
									value='tab1'
								>
									Enrolled (7)
								</Tabs.Trigger>
								<Tabs.Trigger
									className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
									value='tab2'
								>
									Rejected (3)
								</Tabs.Trigger>
								<Tabs.Trigger
									className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
									value='tab3'
								>
									Queue (0)
								</Tabs.Trigger>
							</Tabs.List>
						</div>
						<Tabs.Content
							className='mt-5 h-full rounded-b-md outline-none lg:mt-0'
							value='tab1'
						>
							<EnrolledTabs />
						</Tabs.Content>
						<Tabs.Content
							className='bg-secondary h-full rounded-b-md outline-none'
							value='tab2'
						>
							<RejectedTabs />
						</Tabs.Content>
						<Tabs.Content
							className='bg-secondary h-full rounded-b-md outline-none'
							value='tab3'
						>
							<QueueTabs />
						</Tabs.Content>
					</Tabs.Root>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default ViewCalendarAction;
