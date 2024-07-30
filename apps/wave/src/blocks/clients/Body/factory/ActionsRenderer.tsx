'use client';

import React, { useCallback } from 'react';
import ThreeDotsVerticalIcon from '~/icons/ThreeDotsVerticalIcon';
import { Flex } from '~/components/layout';
import { IClient } from '@nw/storage';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';
import Button from '~/components/controls/Button';
import { PersonAddIcon, Eye } from '~/icons';
import useNWStore from '~/lib/store';

const ActionsRenderer = ({ item }: { item: IClient }) => {
	const t = useTranslations('page.clients');
	const updateClients = useNWStore((state) => state.updateClients);
	const addAlert = useNWStore((state) => state.addAlert);

	const handleViewClient = useCallback(() => {
		updateClients({ active: item });
	}, [updateClients, item]);

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
									isFullWidth
									variant='tertiary'
									icon={<PersonAddIcon />}
									className='!justify-start px-3'
									message={t('action.enroll')}
								/>
							</DropdownMenu.Item>
							<DropdownMenu.Item className='outline-none'>
								<Button
									isFullWidth
									variant='tertiary'
									icon={<Eye />}
									className='!justify-start px-3'
									message={t('action.view')}
									onClick={handleViewClient}
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
