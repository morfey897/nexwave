'use client';
import Button from '@/components/Button';
import { HiOutlinePlus } from 'react-icons/hi';
import { BsDiagram2 } from 'react-icons/bs';
import { useTranslations } from 'next-intl';
import InnerProject, { SkeletonProject } from '@/components/Project/Inner';
import {
	type IModal,
	Position,
	Blur,
	withModal,
	useOpenModal,
} from '@nw/modal';
import clsx from 'clsx';
import { useNWStore } from '@/hooks/store';
import { useAction } from '@/hooks/action';
import { actionGetProjects } from '@/actions/project-action';
import { useEffect, useMemo, useCallback } from 'react';
import { EnumResponse } from '@/enums';
import { MODALS } from '@/routes';

function AsideProjects(props: IModal) {
	const openModal = useOpenModal();
	const activeProject = useNWStore((state) => state.project);
	const t = useTranslations();

	const { submit, action, result, pending } = useAction(actionGetProjects);

	useEffect(() => {
		if (props.state === 'open') {
			submit();
			action(new FormData());
		}
	}, [props.state, submit, action]);

	const projects = useMemo(
		() =>
			result?.status === EnumResponse.SUCCESS && result?.data
				? result.data
				: [],
		[result],
	);

	const onAddProject = useCallback(() => {
		openModal({ name: MODALS.CREATE_PROJECT });
	}, [openModal]);

	return (
		<aside
			className={clsx(
				'pt-[calc(86px+2rem)] pb-[100px] px-4 py-8',
				'min-h-screen w-64',
				'bg-white dark:bg-gray-800 dark:border-gray-700 border-r',
			)}
		>
			<div className='flex items-center justify-between'>
				<h2 className='text-base font-semibold text-gray-600 dark:text-gray-300 flex items-center'>
					<BsDiagram2 size={32} />
					<span className='ml-2'>{t('general.projects')}</span>
				</h2>

				<Button
					variant='default'
					size='md'
					className='!p-1'
					onClick={onAddProject}
					icon={<HiOutlinePlus size={16} />}
				/>
			</div>
			<div className='mt-2 space-y-2'>
				{projects.map((project) => (
					<InnerProject
						key={project.uuid}
						project={project}
						active={project.uuid === activeProject?.uuid}
					/>
				))}
				{pending && <SkeletonProject />}
			</div>
		</aside>
	);
}

export default withModal(AsideProjects, {
	zIndex: 20,
	position: [Position.LEFT, Position.TOP],
	overlay: {
		blur: Blur.MD,
		className: 'bg-gray-100/20 dark:bg-black/60',
	},
});
