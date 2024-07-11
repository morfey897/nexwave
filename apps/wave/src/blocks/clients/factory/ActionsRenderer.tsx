'use client';

import React from 'react';
import ThreeDotsVerticalIcon from '~/icons/ThreeDotsVerticalIcon';
import { Flex } from '~/components/layout';
import { IClient } from '@nw/storage';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';
import { Button } from '~/components/buttons/Button';
import { PersonAddIcon, PauseCircleIcon, LockIcon, TrashIcon } from '~/icons';
import EditViewAction from './EditViewAction';

const ActionsRenderer = ({ item }: { item: IClient }) => {
	const t = useTranslations();
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
								<EditViewAction />
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
