'use client';
import React, { useCallback } from 'react';
import { MODALS } from '@/routes';
import { useOpenModal } from '@nw/modal';
import useNWStore from '@/lib/store';
import { Button } from '@/components/Button';
import BranchIcon from '@/components/Project/Icon';
import clsx from 'clsx';
import { EnumState } from '@/enums';
import Skeleton from '@/components/Skeleton';

function ActiveProject() {
	const activeProject = useNWStore((state) => state.project);
	const openModal = useOpenModal();

	const onOpenProjects = useCallback(() => {
		openModal(MODALS.PROJECTS);
	}, [openModal]);

	return activeProject ? (
		<Button
			variant='light'
			onClick={onOpenProjects}
			message={activeProject.name}
			className={clsx(
				'flex-col !px-0 lg:flex-row [&>.message]:hidden md:[&>.message]:inline-block',
				{
					'!border-blue-400 dark:!border-blue-600':
						activeProject?.state === EnumState.DRAFT || !activeProject?.state,
					'!border-green-400 dark:!border-green-800':
						activeProject?.state === EnumState.ACTIVE,
					'!border-orange-400 dark:!border-orange-600':
						activeProject?.state === EnumState.INACTIVE,
				}
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
		/>
	) : (
		<Skeleton className='h-[54px]' />
	);
}
export default ActiveProject;
