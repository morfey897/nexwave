'use client';

import React, { useCallback } from 'react';
import ThreeDotsVerticalIcon from '~/icons/ThreeDotsVerticalIcon';
import { Flex } from '~/components/layout';
import { IClient } from '@nw/storage';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';
import { Button } from '~/components/buttons/Button';
import {
	PersonAddIcon,
	PauseCircleIcon,
	LockIcon,
	TrashIcon,
	PencilIcon,
} from '~/icons';
import useNWStore from '~/lib/store';

const ActionsRenderer = ({ item }: { item: IClient }) => {
	const t = useTranslations();
	const setEditClient = useNWStore((state) => state.setUI);

	const handleEditClient = useCallback(() => {
		setEditClient({ editClient: true });
	}, [setEditClient]);

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
									icon={<PersonAddIcon />}
									className='!justify-start px-3'
									message={t('page.clients.action.enroll')}
								/>
							</DropdownMenu.Item>
							<DropdownMenu.Item className='outline-none'>
								<Button
									variant='tertiary'
									icon={<PauseCircleIcon />}
									className='!justify-start px-3'
									message={t(`page.clients.action.pause`)}
								/>
							</DropdownMenu.Item>
							<DropdownMenu.Item className='outline-none'>
								<Button
									variant='tertiary'
									icon={<LockIcon />}
									className='!justify-start px-3'
									message={t('page.clients.action.block')}
								/>
							</DropdownMenu.Item>
							<DropdownMenu.Item className='outline-none'>
								<Button
									variant='tertiary'
									icon={<PencilIcon />}
									className='!justify-start px-3'
									message={t('page.clients.action.edit')}
									onClick={handleEditClient}
								/>
							</DropdownMenu.Item>
							<DropdownMenu.Item className='outline-none'>
								<Button
									variant='tertiary'
									icon={<TrashIcon />}
									className='!justify-start px-3'
									message={t('page.clients.action.delete')}
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
