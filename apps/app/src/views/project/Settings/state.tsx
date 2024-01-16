'use client';
import { IFullProject } from '@/models/project';
import { useTranslations } from 'next-intl';
import {
	HiMiniPencilSquare,
	HiArchiveBox,
	HiShieldCheck,
} from 'react-icons/hi2';
import { MdWarningAmber } from 'react-icons/md';
import { EnumState } from '@/enums';
import Button, { GroupButton } from '@/components/Button';
import Skeleton from '@/components/Skeleton';
import { UPDATE, DELETE } from '@/crud';
import { hasAccess } from '@/utils';

function StateSettings({
	project,
	...props
}: { project: IFullProject | null } & React.HTMLAttributes<HTMLDivElement>) {
	const role = project?.roles[project?.role || ''] || 0;
	const t = useTranslations();
	const state = project?.state;

	console.log('project', project);
	
	return (
		<div {...props}>
			{project ? (
				<div className='flex justify-between flex-wrap gap-y-2'>
					<p className='text-3xl font-semibold text-gray-500 dark:text-gray-400'>
						{(state === EnumState.DRAFT || !state) && (
							<>
								{t(`state.draft`)}
								<span className='text-blue-500 inline-block align-bottom ml-2'>
									<HiMiniPencilSquare size={38} />
								</span>
							</>
						)}
						{state === EnumState.ACTIVE && (
							<>
								{t(`state.published`)}
								<span className='text-green-400 inline-block align-bottom ml-2'>
									<HiShieldCheck size={38} />
								</span>
							</>
						)}
						{state === EnumState.INACTIVE && (
							<>
								{t(`state.unpublished`)}
								<span className='text-yellow-500 inline-block align-bottom ml-2'>
									<HiArchiveBox size={38} />
								</span>
							</>
						)}
					</p>
					{/* Actions */}
					{(state === EnumState.DRAFT || !state) && (
						<GroupButton>
							{hasAccess(role, UPDATE.PROJECT) && (
								<Button
									variant='secondary'
									size='xs'
									message={t('button.publish')}
									icon={<HiShieldCheck size={20} />}
								/>
							)}
							{hasAccess(role, DELETE.PROJECT) && (
								<Button
									variant='light'
									size='xs'
									message={t('button.delete')}
									icon={<MdWarningAmber size={20} />}
								/>
							)}
						</GroupButton>
					)}
					{state === EnumState.ACTIVE && hasAccess(role, UPDATE.PROJECT) && (
						<Button
							size='xs'
							variant='light'
							message={t('button.unpublish')}
							icon={<HiArchiveBox size={20} />}
						/>
					)}
					{state === EnumState.INACTIVE && (
						<GroupButton>
							{hasAccess(role, UPDATE.PROJECT) && (
								<Button
									variant='primary'
									size='sm'
									message={t('button.publish')}
									icon={<HiShieldCheck size={20} />}
								/>
							)}
							{hasAccess(role, DELETE.PROJECT) && (
								<Button
									variant='danger'
									size='sm'
									message={t('button.delete')}
									icon={<MdWarningAmber size={20} />}
								/>
							)}
						</GroupButton>
					)}
				</div>
			) : (
				<Skeleton className='h-[45px]' />
			)}
		</div>
	);
}

export default StateSettings;
