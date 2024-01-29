'use client';
import AccessDenied from '@/components/AccessDenied';
import GeneralSettings from './GeneralSettings';
import BranchesSettings from './BranchesSettings';
import AccessSettings from './AccessSettings';
import { Group, Button } from '@/components/Button';
import { HiOutlineInformationCircle, HiOutlinePuzzle } from 'react-icons/hi';
import { HiMiniRectangleGroup } from 'react-icons/hi2';
import { MdOutlineLockPerson } from 'react-icons/md';
import { useTranslations } from 'next-intl';
import Container, {
	ContainerBody,
	ContainerHeader,
	useSyncScroll,
} from '@/components/Containers';
import Caption from '@/components/Caption';
import { useScrollDetect } from '@/hooks/scrollDetect';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { IFullProject } from '@/models/project';
import { useSearchParams, useRouter } from 'next/navigation';
import { S_PARAMS } from '@nw/config';
import { useOpenModal } from '@nw/modal';
import { MODALS } from '@/routes';
import { hasAccess } from '@/utils';
import { UPDATE } from '@/crud';
import Skeleton from '@/components/Skeleton';

const TAB_GENERAL = 'general';
const TAB_BRANCHES = 'branches';
const TAB_GROUPS = 'groups';
const TAB_ACCESS = 'access';

function Settings({ project }: { project: IFullProject | null }) {
	const t = useTranslations();
	const openModal = useOpenModal();
	const searchParams = useSearchParams();
	const router = useRouter();
	const isScrolled = useScrollDetect(0.07);
	const { refHeader, refBody, onScroll } = useSyncScroll();
	const [activeTab, setActiveTab] = useState('');

	const permission = project?.roles[project?.role || ''] || 0;

	const tabs = useMemo(
		() => [
			{
				id: TAB_GENERAL,
				message: t('page.settings.tab_general'),
				icon: <HiOutlineInformationCircle size={24} />,
				access: hasAccess(permission, UPDATE.PROJECT),
			},
			{
				id: TAB_BRANCHES,
				message: t('page.settings.tab_branches'),
				icon: <HiOutlinePuzzle size={24} />,
				access: hasAccess(permission, UPDATE.BRANCH),
			},
			// {
			// 	id: TAB_GROUPS,
			// 	message: t('page.settings.tab_groups'),
			// 	icon: <HiMiniRectangleGroup size={24} />,
			// },
			{
				id: TAB_ACCESS,
				message: t('page.settings.tab_access'),
				icon: <MdOutlineLockPerson size={24} />,
				access: hasAccess(permission, UPDATE.PROJECT_ACCESS),
			},
		],
		[t],
	);

	useLayoutEffect(() => {
		let activeTab = searchParams.get(S_PARAMS.TAB);
		if (!activeTab || !tabs.some((tab) => tab.id === activeTab && tab.access)) {
			activeTab = TAB_GENERAL;
		}
		setActiveTab(activeTab);
	}, [searchParams, tabs]);

	const onTabChange = useCallback(
		(tab: string) => {
			setActiveTab(tab);
			const clone = new URLSearchParams(searchParams);
			if (tab === TAB_GENERAL) {
				clone.delete(S_PARAMS.TAB);
			} else {
				clone.set(S_PARAMS.TAB, tab);
			}
			clone.delete(S_PARAMS.ACTIVE);
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[router, searchParams],
	);

	const addBranch = useCallback(() => {
		openModal({
			name: MODALS.CREATE_BRANCH,
			params: { projectId: project?.id || '' },
		});
	}, [openModal, project]);

	return (
		<Container>
			<ContainerHeader>
				<div className='bg-gray-100 dark:bg-gray-900 pt-2'>
					<Caption
						isScrolled={isScrolled}
						headline={t('page.settings.headline')}
						subheadline={t('page.settings.subheadline')}
						add={
							activeTab === TAB_BRANCHES
								? {
										title: t('button.add'),
										onClick: addBranch,
									}
								: undefined
						}
					/>
				</div>
				<Group
					className={clsx(
						'[&>*:first-child]:rounded-es-none [&>*:last-child]:rounded-ee-none pt-4 bg-gray-100 dark:bg-gray-900',
						'overflow-x-scroll hide-scroll',
						// isScrolled && 'pt-0.5',
					)}
				>
					{activeTab ? (
						tabs.map(({ id, access, ...tab }) =>
							access ? (
								<Button
									size='sm'
									key={id}
									variant={activeTab === id ? 'primary' : 'dark'}
									onClick={() => onTabChange(id)}
									className={clsx(activeTab === id && 'pointer-events-none')}
									{...tab}
								/>
							) : null,
						)
					) : (
						<Skeleton className='h-[42px] !w-[120px] !rounded-ee-none !rounded-es-none ml-2' />
					)}
				</Group>
				{/* <ContainerScrollableHeader ref={refHeader} onScroll={onScroll}>
					
				</ContainerScrollableHeader> */}
			</ContainerHeader>

			<ContainerBody ref={refBody} onScroll={onScroll}>
				<div className='border-t dark:border-gray-700'>
					{activeTab === TAB_GENERAL && <GeneralSettings project={project} />}
					{activeTab === TAB_BRANCHES && <BranchesSettings project={project} />}
					{activeTab === TAB_ACCESS && <AccessSettings project={project} />}
				</div>
			</ContainerBody>
		</Container>
	);
}

export default Settings;
