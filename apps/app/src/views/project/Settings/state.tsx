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
import { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { useAction } from '@/hooks/action';
import { actionUpdateVisibilityProject } from '@/actions/project-action';
import Spinner from '@/components/Spinner';
import { USER_UNAUTHORIZED, ACCESS_DENIED, UPDATE_FAILED } from '@/errorCodes';
import { EnumResponse } from '@/enums';
import { useRouter } from 'next/navigation';
import { APP } from '@/routes';
import { useNWStore } from '@/hooks/store';

type UnitAction = 'publish' | 'unpublish' | 'delete';
const WrapButton = ({
	permission,
	brole,
	active,
	name,
	disabled,
	icon,
	...props
}: {
	permission: number | undefined;
	brole: number;
	name: UnitAction;
	active: UnitAction | '';
} & Parameters<typeof Button>[0]) => {
	if (!hasAccess(permission, brole)) return null;

	return (
		<Button
			size='sm'
			name={name}
			disabled={disabled}
			icon={active === name && disabled ? <Spinner variant='primary' /> : icon}
			{...props}
		/>
	);
};

function StateSettings({
	project,
	...props
}: { project: IFullProject | null } & React.HTMLAttributes<HTMLDivElement>) {
	const router = useRouter();

	const updateProject = useNWStore((state) => state.updateProject);

	const t = useTranslations();

	const [active, setProject] = useState<IFullProject | null>(null);

	const [currentAction, setCurrenAction] = useState<UnitAction | ''>('');
	const { action, submit, reset, pending, result } = useAction(
		actionUpdateVisibilityProject,
	);
	const responseError = result?.error?.code;

	useLayoutEffect(() => {
		setProject(project);
	}, [project]);

	const signIn = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			router.push(APP);
		},
		[router],
	);

	const onSubmit = useCallback(
		(formData: FormData) => {
			action(formData);
		},
		[action],
	);

	const onChangeState: React.MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			const active = event.currentTarget.name;
			setCurrenAction(active as UnitAction);
			const formData = new FormData();
			formData.append('action', active);
			formData.append('projectId', (project?.id || '').toString());
			reset();
			submit();
			onSubmit(formData);
		},
		[project, action, reset],
	);

	useEffect(() => {
		if (!!result?.status) {
			setCurrenAction('');
		}
	}, [result]);

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			const newProject = result.data;
			setProject(newProject);
			updateProject({
				id: newProject.id,
				uuid: newProject.uuid,
				name: newProject.name,
				color: newProject.color,
				currency: newProject.currency,
				state: newProject.state,
				image: newProject.image,
			});
		}
	}, [result, updateProject]);

	const state = active?.state;
	const permission = active?.roles[project?.role || ''] || 0;

	return (
		<div {...props}>
			{active ? (
				<div className='grid grid-cols-12 grid-rows-1 gap-2'>
					<div className='col-span-12 md:col-span-7'>
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
					</div>
					{/* Actions */}
					<div className='col-span-12 md:col-span-5 flex flex-col items-start md:items-end'>
						<GroupButton>
							{(state === EnumState.DRAFT || !state) && (
								<>
									<WrapButton
										permission={permission}
										brole={UPDATE.PROJECT}
										name='publish'
										active={currentAction}
										disabled={pending}
										variant='secondary'
										message={t('button.publish')}
										icon={<HiShieldCheck size={20} />}
										onClick={onChangeState}
									/>
									<WrapButton
										permission={permission}
										brole={DELETE.PROJECT}
										name='delete'
										variant='warn'
										active={currentAction}
										disabled={pending}
										message={t('button.delete')}
										icon={<MdWarningAmber size={20} />}
										onClick={onChangeState}
									/>
								</>
							)}
							{state === EnumState.ACTIVE && (
								<>
									<WrapButton
										active={currentAction}
										permission={permission}
										brole={UPDATE.PROJECT}
										onClick={onChangeState}
										name='unpublish'
										variant='dark'
										message={t('button.unpublish')}
										disabled={pending}
										icon={<HiArchiveBox size={20} />}
									/>
								</>
							)}
							{state === EnumState.INACTIVE && (
								<>
									<WrapButton
										active={currentAction}
										permission={permission}
										brole={UPDATE.PROJECT}
										onClick={onChangeState}
										name='publish'
										variant='secondary'
										message={t('button.publish')}
										disabled={pending}
										icon={<HiShieldCheck size={20} />}
									/>

									<WrapButton
										active={currentAction}
										permission={permission}
										brole={DELETE.PROJECT}
										onClick={onChangeState}
										name='delete'
										variant='danger'
										message={t('button.delete')}
										disabled={pending}
										icon={<MdWarningAmber size={20} />}
									/>
								</>
							)}
						</GroupButton>
						{result?.status === EnumResponse.FAILED && (
							<div className='flex justify-end my-2'>
								<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto'>
									{responseError?.includes(USER_UNAUTHORIZED) &&
										t.rich('error.unauthorized_rt', {
											button: (chunks) => (
												<button
													onClick={signIn}
													className='text-blue-500 underline dark:text-blue-400'
												>
													{chunks}
												</button>
											),
										})}
									{responseError?.includes(ACCESS_DENIED) &&
										t('error.access_denied')}
									{responseError?.includes(UPDATE_FAILED) &&
										t('error.update_failed')}
									{result?.status === EnumResponse.FAILED &&
										!responseError?.includes(USER_UNAUTHORIZED) &&
										!responseError?.includes(ACCESS_DENIED) &&
										!responseError?.includes(UPDATE_FAILED) &&
										t('error.wrong')}
								</p>
							</div>
						)}
					</div>
				</div>
			) : (
				<Skeleton className='h-[45px]' />
			)}
		</div>
	);
}

export default StateSettings;
