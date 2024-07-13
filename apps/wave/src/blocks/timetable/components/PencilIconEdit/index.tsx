'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import { Button } from '~/components/buttons/Button';
import { LockIcon, PencilIcon, TrashIcon } from '~/icons';
import { useTranslations } from 'next-intl';
import * as Tabs from '@radix-ui/react-tabs';
import ArchiveIcon from '~/icons/ArchiveIcon';
import Separator from '~/components/sidebar/components/Separator';
import GeneralInfoBlock from './components/GeneralInfoBlock';
import SettingsBlock from './components/SettingsBlock';
import DateBlock from './components/DateBlock';
import RepeatBlock from './components/RepeatBlock';
import ButtonEditViewActionCallendar from './components/ButtonEditViewActionCallendar';
import useNWStore from '~/lib/store';
import { useCallback } from 'react';

const PencilIconEdit = () => {
	const t = useTranslations();

	const editCalendar = useNWStore((state) => state.edit.event);
	const setEdit = useNWStore((state) => state.setEdit);

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (!open) {
				setEdit({ event: false });
			}
		},
		[setEdit]
	);

	return (
		<AlertDialog.Root open={editCalendar} onOpenChange={handleOpenChange}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className='fixed inset-0 z-40 backdrop-blur' />
				<AlertDialog.Content className='data-[state=open]:animate-slideRightAndFade bg-secondary fixed right-0 top-0 z-50 h-full w-full translate-x-0 translate-y-0 overflow-auto rounded-r-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none md:w-[30rem]'>
					<div className='flex justify-between'>
						<AlertDialog.Title className='font-inter text-xl font-semibold leading-7'>
							Edit event
						</AlertDialog.Title>
						<AlertDialog.Cancel asChild>
							<span className='hover:text-primary-text-gray cursor-pointer'>
								<SidebarBurgerIcon />
							</span>
						</AlertDialog.Cancel>
					</div>
					<GeneralInfoBlock />
					<SettingsBlock />
					<DateBlock />
					<RepeatBlock />
					<ButtonEditViewActionCallendar />
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default PencilIconEdit;
