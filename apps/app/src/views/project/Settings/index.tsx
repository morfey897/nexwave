'use client';
import GeneralSettings from './general';
import { GroupButton, Button } from '@/components/Button';
import { HiOutlineInformationCircle, HiOutlinePuzzle } from 'react-icons/hi';
import { HiMiniRectangleGroup } from 'react-icons/hi2';
import { MdOutlineLockPerson, MdWarningAmber } from 'react-icons/md';
import { useTranslations } from 'next-intl';
import Container, {
	ContainerBody,
	ContainerHeader,
	ContainerScrollableHeader,
	useSyncScroll,
} from '@/components/Containers';
import Caption from '@/components/Caption';
import { useScrollDetect } from '@/hooks/scrollDetect';
import { useCallback, useMemo, useState } from 'react';

import clsx from 'clsx';
import { IFullProject } from '@/models/project';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchParams as searchParamsConfig } from '@nw/config';
import { EnumState } from '@/enums';

const TAB_INFO = 'info';
const TAB_BRANCHES = 'branches';
const TAB_GROUPS = 'groups';
const TAB_ACCESS = 'access';

function Settings({ project }: { project: IFullProject | null }) {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const router = useRouter();
	const isScrolled = useScrollDetect(0.07);
	const { refHeader, refBody, onScroll } = useSyncScroll();
	const [activeTab, setActiveTab] = useState(
		searchParams.get(searchParamsConfig.TAB) || TAB_INFO,
	);

	const tabs = useMemo(
		() => [
			{
				id: TAB_INFO,
				message: t('page.settings.tab_general'),
				icon: <HiOutlineInformationCircle size={24} />,
			},
			{
				id: TAB_BRANCHES,
				message: t('page.settings.tab_branches'),
				icon: <HiOutlinePuzzle size={24} />,
			},
			{
				id: TAB_GROUPS,
				message: t('page.settings.tab_groups'),
				icon: <HiMiniRectangleGroup size={24} />,
			},
			{
				id: TAB_ACCESS,
				message: t('page.settings.tab_access'),
				icon: <MdOutlineLockPerson size={24} />,
			},
		],
		[t],
	);

	const onTabChange = useCallback(
		(tab: string) => {
			setActiveTab(tab);
			const clone = new URLSearchParams(searchParams);
			if (tab === TAB_INFO) {
				clone.delete(searchParamsConfig.TAB);
			} else {
				clone.set(searchParamsConfig.TAB, tab);
			}
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[router, searchParams],
	);

	const addBranch = useCallback(() => {}, []);

	return (
		<Container>
			<ContainerHeader>
				<div className='bg-gray-100 dark:bg-gray-900 pt-2'>
					<Caption
						isScrolled={isScrolled}
						headline={t('page.settings.headline')}
						subheadline={t('page.settings.subheadline')}
						amount={activeTab === TAB_BRANCHES ? 2 : undefined}
						// add={
						// 	activeTab === TAB_BRANCHES
						// 		? {
						// 				title: t('button.add'),
						// 				onClick: addBranch,
						// 			}
						// 		: undefined
						// }
						// imprt={{
						// 	title: t('button.import'),
						// 	onClick: () => {
						// 		console.log('onImport');
						// 	},
						// }}
					/>
				</div>
				<ContainerScrollableHeader ref={refHeader} onScroll={onScroll}>
					<GroupButton className='[&>*:first-child]:rounded-es-none [&>*:last-child]:rounded-ee-none'>
						{tabs.map(({ id, ...tab }) => (
							<Button
								key={id}
								variant={activeTab === id ? 'primary' : 'dark'}
								onClick={() => onTabChange(id)}
								className={clsx(activeTab === id && 'pointer-events-none')}
								{...tab}
							/>
						))}
					</GroupButton>
				</ContainerScrollableHeader>
			</ContainerHeader>

			<ContainerBody ref={refBody} onScroll={onScroll}>
				<div className='border-t dark:border-gray-700'>
					{activeTab === TAB_INFO && <GeneralSettings project={project} />}
				</div>
			</ContainerBody>
		</Container>
	);
}

export default Settings;
