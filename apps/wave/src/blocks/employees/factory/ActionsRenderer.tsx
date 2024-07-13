'useclient';

import { IEmployee } from '@nw/storage';
import React, { useCallback } from 'react';
import ThreeDotsVerticalIcon from '~/icons/ThreeDotsVerticalIcon';
import { Flex } from '~/components/layout';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';
import { Button } from '~/components/buttons/Button';
import {
	CalendarPlusIcon,
	SuitcaseIcon,
	LockIcon,
	TrashIcon,
	PencilIcon,
} from '~/icons';
import useNWStore from '~/lib/store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ActionsRenderer = ({ item }: { item: IEmployee }) => {
	const t = useTranslations();
	const setEdit = useNWStore((state) => state.setEdit);

	const handleViewClient = useCallback(() => {
		setEdit({ employee: item });
	}, [setEdit, item]);

	return (
		<Flex>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger className='outline-none'>
					<span className='ml-4 block'>
						<ThreeDotsVerticalIcon />
					</span>
				</DropdownMenu.Trigger>
				<DropdownMenu.Portal>
					<DropdownMenu.Content
						side='left'
						className='animate-slideRightAndFade relative z-30 will-change-[opacity,transform]'
					>
						<div className='bg-secondary space-y-2 rounded-lg px-px py-2.5 shadow-xl'>
							<DropdownMenu.Item className='outline-none'>
								<Button
									variant='tertiary'
									icon={<CalendarPlusIcon />}
									className='!justify-start px-3'
									message={t('page.employees.action.assign')}
								/>
							</DropdownMenu.Item>
							<DropdownMenu.Item className='outline-none'>
								<Button
									variant='tertiary'
									icon={<SuitcaseIcon />}
									className='!justify-start px-3'
									message={t(`page.employees.action.vacation`)}
								/>
							</DropdownMenu.Item>
							<DropdownMenu.Item className='outline-none'>
								<Button
									variant='tertiary'
									icon={<LockIcon />}
									className='!justify-start px-3'
									message={t('page.employees.action.block')}
								/>
							</DropdownMenu.Item>
							<DropdownMenu.Item className='outline-none'>
								<Button
									variant='tertiary'
									icon={<PencilIcon />}
									className='!justify-start px-3'
									message={t('page.employees.action.view')}
									onClick={handleViewClient}
								/>
							</DropdownMenu.Item>
							<DropdownMenu.Item className='outline-none'>
								<Button
									variant='tertiary'
									icon={<TrashIcon />}
									className='!justify-start px-3'
									message={t('page.employees.action.delete')}
								/>
							</DropdownMenu.Item>
						</div>
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</Flex>
	);
};

export default ActionsRenderer;
