'use client';
import Button from '@/components/Button';
import { HiOutlinePlus } from 'react-icons/hi';
import { BsDiagram2 } from 'react-icons/bs';
import { useTranslations } from 'next-intl';
import InnerProject, { SkeletonProject } from '@/components/Project/Inner';
import SVGIcon from '@/components/SVGIcon';
import {
	type IModal,
	Position,
	withModal,
	useOpenModal,
	ModalState,
	useCloseAllModal,
} from '@nw/modal';
import useNWStore from '@/lib/store';
import { useAPI } from '@/hooks/action';
import { useMemo, useCallback } from 'react';
import { EnumResponse } from '@/enums';
import { MODALS } from '@/routes';
import { IProject } from '@/models/project';
import ErrorCopy from '@/components/ErrorCopy';
import { ACCESS_DENIED, USER_UNAUTHORIZED } from '@/errorCodes';
import { API } from '@/routes';
import { AsideWrapper, AsideHeader, AsideBody } from '@/components/Windows';

function AsideProjects({ state }: IModal) {
	const onCloseAll = useCloseAllModal();
	const openModal = useOpenModal();
	const activeProject = useNWStore((state) => state.project);
	const t = useTranslations();

	const { result, pending } = useAPI<IProject[] | null>(() =>
		state === ModalState.OPENED || state === ModalState.CLOSING
			? API.PROJECTS
			: null,
	);

	const projects = useMemo(
		() =>
			result?.status === EnumResponse.SUCCESS && result?.data
				? result.data
				: [],
		[result],
	);

	const onAddProject = useCallback(() => {
		onCloseAll();
		openModal(MODALS.CREATE_PROJECT);
	}, [openModal, onCloseAll]);

	return (
		<AsideWrapper>
			<AsideHeader className='flex items-center justify-between'>
				<h2 className='text-base font-semibold text-gray-600 dark:text-gray-300 flex items-center'>
					<SVGIcon type='project' size={32} />
					<span className='ml-2'>{t('page.panel_projects.headline')}</span>
				</h2>

				<Button
					variant='default'
					size='md'
					className='!p-1'
					onClick={onAddProject}
					icon={<HiOutlinePlus size={16} />}
				/>
			</AsideHeader>
			<AsideBody className='space-y-2'>
				{projects.map((project) => (
					<InnerProject
						key={project.uuid}
						project={project}
						active={project.uuid === activeProject?.uuid}
					/>
				))}
				<ErrorCopy
					code={result?.error?.code}
					codes={{
						[USER_UNAUTHORIZED]: true,
						[ACCESS_DENIED]: true,
					}}
				/>

				{(pending || state === ModalState.OPENING) && <SkeletonProject />}
			</AsideBody>
		</AsideWrapper>
	);
}

export default withModal(AsideProjects, {
	position: [Position.LEFT, Position.TOP],
	wrapper: {
		className: 'z-20',
	},
	overlay: {
		className: 'bg-gray-100/20 dark:bg-black/60 backdrop-blur',
	},
});
