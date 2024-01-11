'use client';
import Button from '@/components/Button';
import { HiOutlinePlus } from 'react-icons/hi';
import { BsDiagram2 } from 'react-icons/bs';
import { useTranslations } from 'next-intl';
import InnerProject, { SkeletonProject } from '@/components/Project/Inner';
import { type IModal, Position, Blur, withModal } from '@nw/modal';
import clsx from 'clsx';
import { useNWStore } from '@/hooks/store';
import { useAction } from '@/hooks/action';
import { getProjects } from '@/actions/project-action';
import { useEffect, useMemo } from 'react';
import { EnumResponse } from '@/enums';

function AsideProjects(props: IModal) {
	const activeProject = useNWStore((state) => state.activeProject);
	const t = useTranslations();

	const { submit, action, result, pending } = useAction(getProjects);

	useEffect(() => {
		console.log('FETCH PROJECTS');
	}, []);

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

	return (
		<aside
			className={clsx(
				'mt-[86px] px-4 py-8',
				'h-screen w-64 overflow-y-auto',
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
	position: Position.LEFT,
	overlay: {
		blur: Blur.MD,
		className: 'bg-gray-100/20 dark:bg-black/60',
	},
});
