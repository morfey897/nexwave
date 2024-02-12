import AccessDenied from '@/components/AccessDenied';
import GeneralSettings from './GeneralSettings';
import BranchesSettings from './BranchesSettings';
import AccessSettings from './AccessSettings';
import { Group } from '@/components/Button';
import { HiOutlineInformationCircle, HiOutlinePuzzle } from 'react-icons/hi';
import { MdOutlineLockPerson } from 'react-icons/md';
import {
	useTranslations,
	NextIntlClientProvider,
	useMessages,
} from 'next-intl';
import Container, {
	ContainerBody,
	ContainerHeader,
} from '@/components/Containers';
import clsx from 'clsx';
import { IFullProject } from '@/models/project';
import { hasAccess } from '@/utils';
import { UPDATE } from '@/crud';
import { getSearchParams } from '@/headers';
import Tab from './Tab.client';
import Caption from './Caption.client';
import { S_PARAMS } from '@packages/config/dist';
import { TAB_BRANCHES, TAB_ACCESS, TAB_GENERAL } from './config';
import { pick } from 'lodash';

const TABS = [
	{
		id: TAB_GENERAL,
		label: 'page.settings.tab_general',
		icon: <HiOutlineInformationCircle size={24} />,
		access: UPDATE.PROJECT,
	},
	{
		id: TAB_BRANCHES,
		label: 'page.settings.tab_branches',
		icon: <HiOutlinePuzzle size={24} />,
		access: UPDATE.BRANCH,
	},
	{
		id: TAB_ACCESS,
		label: 'page.settings.tab_access',
		icon: <MdOutlineLockPerson size={24} />,
		access: UPDATE.PROJECT_ACCESS,
	},
];

const ACCESS = {
	[TAB_GENERAL]: UPDATE.PROJECT,
	[TAB_BRANCHES]: UPDATE.BRANCH,
	[TAB_ACCESS]: UPDATE.PROJECT_ACCESS,
};

function Settings({ project }: { project: IFullProject | null }) {
	const t = useTranslations();
	const permission = project?.roles[project?.role || ''] || 0;
	const activeTab = getSearchParams().get(S_PARAMS.TAB) || TAB_GENERAL;

	const messages = useMessages();

	const partMessages = pick(messages, [
		'form',
		'button',
		'error',
		'state',
		'color',
		'currency',
		'crud',
	]);
	return (
		<Container className='mb-12'>
			<Caption
				headline={t('page.settings.headline')}
				subheadline={t('page.settings.subheadline')}
				add={t('button.add')}
				activeTab={activeTab}
				projectId={project?.id || 0}
			/>
			<ContainerHeader className='border-b dark:border-gray-700 pt-2 md:pt-4 bg-gray-100 dark:bg-gray-900'>
				<Group
					className={clsx(
						'[&>*:first-child]:rounded-es-none [&>*:last-child]:rounded-ee-none',
						'overflow-x-scroll hide-scroll',
					)}
				>
					{TABS.map(({ id, label, icon }) => (
						<Tab
							key={id}
							name={id}
							size='sm'
							variant={activeTab === id ? 'primary' : 'dark'}
							message={t(label)}
							icon={icon}
						/>
					))}
				</Group>
			</ContainerHeader>

			<ContainerBody>
				<NextIntlClientProvider messages={partMessages}>
					{activeTab === TAB_GENERAL &&
						(hasAccess(permission, ACCESS[TAB_GENERAL]) ? (
							<GeneralSettings project={project} />
						) : (
							<AccessDenied className='mt-6' />
						))}
					{activeTab === TAB_BRANCHES &&
						(hasAccess(permission, ACCESS[TAB_BRANCHES]) ? (
							<BranchesSettings project={project} />
						) : (
							<AccessDenied className='mt-6' />
						))}
					{activeTab === TAB_ACCESS &&
						(hasAccess(permission, ACCESS[TAB_ACCESS]) ? (
							<AccessSettings project={project} />
						) : (
							<AccessDenied className='mt-6' />
						))}
				</NextIntlClientProvider>
			</ContainerBody>
		</Container>
	);
}

export default Settings;
