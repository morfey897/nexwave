'use client';

import { useTranslations } from 'next-intl';
import { useAction } from '@/hooks/action';
import { Checkbox, Fieldset } from '@/components/Controls/Form';
import Skeleton from '@/components/Skeleton';
import { EnumResponse, EnumRole } from '@/enums';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { IFullProject } from '@/models/project';
import { USER_UNAUTHORIZED, ACCESS_DENIED, UPDATE_FAILED } from '@/errorCodes';
import { useRouter } from 'next/navigation';
import { hasAccess } from '@/utils';
import { UPDATE, DELETE, CREATE, READ } from '@/crud';
import { actionUpdateAccessProject } from '@/actions/project-action';
import { cloneDeep } from 'lodash';
import ErrorCopy from '@/components/ErrorCopy';
import { PiWarningCircle } from 'react-icons/pi';

const GROUPS = [
	EnumRole.owner,
	EnumRole.super,
	EnumRole.admin,
	EnumRole.manager,
	EnumRole.user,
] as const;

const ALL_ROLES: Array<{ name: string; value: number; important?: boolean }> = [
	{
		name: 'update.project_access',
		value: UPDATE.PROJECT_ACCESS,
		important: true,
	},
	{
		name: 'delete.project',
		value: DELETE.PROJECT,
		important: true,
	},
	{ name: 'delete.branch', value: DELETE.BRANCH, important: true },
	{
		name: 'update.unpublish_project',
		value: UPDATE.UNPUBLISH_PROJECT,
	},
	{
		name: 'update.unpublish_branch',
		value: UPDATE.UNPUBLISH_BRANCH,
	},

	{ name: 'update.project', value: UPDATE.PROJECT },

	{ name: 'create.branch', value: CREATE.BRANCH },
	{ name: 'create.event', value: CREATE.EVENT },
	{ name: 'update.branch', value: UPDATE.BRANCH },

	{
		name: 'update.project_group',
		value: UPDATE.PROJECT_GROUP,
	},
	{
		name: 'delete.project_group',
		value: DELETE.PROJECT_GROUP,
	},
	{
		name: 'read.event',
		value: READ.EVENT,
	},

	// Delete
] as const;

function AccessSettings({ project }: { project: IFullProject | null }) {
	const t = useTranslations();
	const router = useRouter();
	const [activeProject, setActiveProject] = useState<IFullProject | null>(null);
	const [changed, setChanged] = useState(false);

	const { action, submit, reset, pending, result } = useAction(
		actionUpdateAccessProject,
	);

	const permission = activeProject?.roles[activeProject?.role || ''] || 0;

	const disabledForm = !hasAccess(permission, UPDATE.PROJECT_ACCESS);

	useLayoutEffect(() => {
		setActiveProject(cloneDeep(project));
		setChanged(false);
	}, [project]);

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			router.refresh();
		}
	}, [result, router]);

	const onChange = useCallback(
		(
			event: React.FormEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>,
		) => {
			const target = event.target as HTMLInputElement;
			const [role] = target.name.split('.');
			const value = Number.parseInt(target.value);
			if (Number.isNaN(value)) return;
			// console.log('name', name);
			setActiveProject((prev) =>
				prev
					? {
							...prev,
							roles: {
								...prev.roles,
								[role]: prev.roles[role] ^ value,
							},
						}
					: null,
			);
			setChanged(true);
		},
		[],
	);

	const onDiscard = useCallback(() => {
		setActiveProject(cloneDeep(project));
		setChanged(false);
	}, [project]);

	return (
		<div className='w-full max-w-3xl mx-auto mt-6 space-y-4'>
			{/* Form */}
			{activeProject ? (
				<p className='text-3xl font-semibold text-gray-500 dark:text-gray-400'>
					{t.rich('crud.role.your_role_rt', {
						span: () => (
							<span className='text-blue-500'>
								{t(`crud.role.${activeProject.role}`)}
							</span>
						),
					})}
				</p>
			) : (
				<Skeleton className='h-9' />
			)}

			<form onSubmit={submit} action={action} onChange={reset}>
				<div className='space-y-4'>
					{/*  ProjectId */}
					{activeProject && (
						<input name='id' type='hidden' value={activeProject?.id} />
					)}

					{/*  Role super */}
					{activeProject ? (
						GROUPS.map((role) =>
							role != EnumRole.owner ||
							activeProject.role === EnumRole.owner ? (
								<Fieldset
									key={role}
									legend={t(`crud.role.${role}`)}
									className='flex flex-wrap gap-x-4 gap-y-1'
								>
									{ALL_ROLES.map(
										({ name, value, important }) =>
											value > 0 && (
												<Checkbox
													key={`${role}.${name}`}
													disabled={disabledForm || role == EnumRole.owner}
													onChange={onChange}
													name={`${role}.${name}`}
													value={value}
													placeholder={t(`crud.${name}`)}
													checked={hasAccess(
														activeProject?.roles[role] || 0,
														value,
													)}
													icon={
														important && (
															<span className='text-orange-600 dark:text-orange-400'>
																<PiWarningCircle size={16} />
															</span>
														)
													}
												/>
											),
									)}
								</Fieldset>
							) : null,
						)
					) : (
						<>
							<Skeleton className='h-[120px]' />
							<Skeleton className='h-[120px]' />
							<Skeleton className='h-[120px]' />
						</>
					)}
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-6'>
					<ErrorCopy
						code={result?.error?.code}
						codes={{
							[USER_UNAUTHORIZED]: true,
							[ACCESS_DENIED]: true,
							[UPDATE_FAILED]: true,
						}}
					/>
					{changed && (
						<div className='flex justify-end gap-x-2'>
							<Button
								onClick={onDiscard}
								variant='default'
								className='capitalize'
								message={t('button.discard')}
								disabled={disabledForm || pending}
							/>

							<Button
								variant='primary'
								type='submit'
								className='capitalize'
								message={t('button.save')}
								disabled={disabledForm || pending}
								icon={pending && <Spinner variant='primary' />}
							/>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}

export default AccessSettings;
