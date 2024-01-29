'use client';
import { IFullProject } from '@/models/project';
import { Group, Button } from '@/components/Button';
import clsx from 'clsx';
import {
	useState,
	useCallback,
	useMemo,
	useLayoutEffect,
	useEffect,
} from 'react';
import Icon from '@/components/Project/Icon';
import { useRouter, useSearchParams } from 'next/navigation';
import { S_PARAMS } from '@nw/config';
import { Input, TextArea } from '@/components/Controls/Form';
import StateSettings, { type UnitAction } from './StateSettings';
import {
	actionUpdateVisibilityBranch,
	actionUpdateBranch,
} from '@/actions/branch-action';
import { UPDATE, DELETE } from '@/crud';
import { useTranslations } from 'next-intl';
import Accordion from '@/components/Accordion';
import { BiChevronDown } from 'react-icons/bi';
import { hasAccess } from '@/utils';
import Spinner from '@/components/Spinner';
import { useAction } from '@/hooks/action';
import { USER_UNAUTHORIZED, ACCESS_DENIED, UPDATE_FAILED } from '@/errorCodes';
import { EnumResponse } from '@/enums';
import Skeleton from '@/components/Skeleton';
import { cloneDeep } from 'lodash';
import ErrorCopy from '@/components/ErrorCopy';

const ROLES: Record<UnitAction, number> = {
	publish: UPDATE.BRANCH,
	unpublish: UPDATE.UNPUBLISH_BRANCH,
	delete: DELETE.BRANCH,
};

function BranchesSettings({ project }: { project: IFullProject | null }) {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const router = useRouter();

	const { action, submit, reset, pending, result } =
		useAction(actionUpdateBranch);

	const [activeTab, setActiveTab] = useState('');

	const [activeProject, setActiveProject] = useState<IFullProject | null>(null);
	const [changed, setChanged] = useState(false);

	const permission = activeProject?.roles[activeProject?.role || ''] || 0;
	const disabledForm = !hasAccess(permission, UPDATE.BRANCH);

	const activeBranch = activeProject?.branches.find(
		(branch) => branch.uuid === activeTab,
	);

	/**
	 * Initialize the form with the project data
	 */
	useLayoutEffect(() => {
		setActiveProject(cloneDeep(project));
		setChanged(false);
	}, [project]);

	/**
	 * Prepopulate the form with the project data
	 */
	useLayoutEffect(() => {
		if (!activeProject) return;

		const branches = activeProject.branches;

		const searchTab = searchParams.get(S_PARAMS.ACTIVE);
		if (searchTab && branches.find((br) => br.uuid === searchTab)) {
			setActiveTab(searchTab);
		} else {
			const [first] =
				branches?.toSorted(
					(a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
				) || [];
			setActiveTab(first?.uuid || '');
		}
	}, [activeProject, activeTab, searchParams]);

	/**
	 * Update the active tab when the url changes
	 */
	const onTabChange = useCallback(
		(tab: string) => {
			setActiveTab(tab);
			const clone = new URLSearchParams(searchParams);
			clone.set(S_PARAMS.ACTIVE, tab);
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[router, searchParams],
	);

	const postProcess = useMemo(
		() => (newProject: IFullProject) => {
			const branch = newProject?.branches.find(
				(branch) => branch.uuid === activeTab,
			);
			return {
				id: `${newProject?.id}/${branch?.uuid}`,
				state: branch?.state,
				permission: newProject?.roles[newProject.role || ''],
			};
		},
		[activeTab],
	);

	const onChange = useCallback(
		(
			event: React.FormEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>,
		) => {
			if (!activeBranch) return;
			const target = event.target as HTMLInputElement;
			const names = target.name.split('.');
			const value = target.value;

			let newBranch = { ...activeBranch };
			let len = names.length;

			let obj = newBranch as any;
			for (let i = 0; i < len - 1; i++) {
				let name = names[i];
				if ((newBranch as any)[name] === undefined) {
					newBranch = { ...newBranch, [name]: {} };
				}
				obj = (newBranch as any)[name];
			}
			obj[names[len - 1]] = value;

			setActiveProject((prev) =>
				prev
					? {
							...prev,
							branches: prev.branches.map((br) =>
								br.uuid === newBranch.uuid ? newBranch : br,
							),
						}
					: null,
			);
			setChanged(true);
		},
		[activeBranch],
	);

	const onDiscard = useCallback(() => {
		setActiveProject(cloneDeep(project));
		setChanged(false);
	}, [project]);

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			router.refresh();
		}
	}, [result, router]);

	return (
		<div className='w-full max-w-3xl mx-auto mt-6'>
			{activeProject ? (
				<Group className='relative [&>*:first-child]:rounded-es-none [&>*:last-child]:rounded-ee-none ml-2 overflow-x-scroll hide-scroll'>
					{project?.branches.map((item) => (
						<Button
							size='xs'
							key={item.uuid}
							variant={activeTab === item.uuid ? 'primary' : 'dark'}
							onClick={() => onTabChange(item.uuid)}
							className={clsx(
								'relative',
								'max-w-[100px]',
								'[&>.message]:truncate',
								activeTab === item.uuid
									? 'pointer-events-none'
									: 'translate-y-1',
							)}
							message={item.name}
							icon={
								<Icon size={24} altFallback={'branch'} image={item?.image} />
							}
						/>
					))}
				</Group>
			) : (
				<Skeleton className='h-[42px] !w-[120px] !rounded-ee-none !rounded-es-none ml-2' />
			)}

			<div className='relative'>
				<StateSettings<IFullProject>
					serverAction={actionUpdateVisibilityBranch}
					postProcess={postProcess}
					item={activeProject}
					roles={ROLES}
					className='border border-b-0 rounded-ss-lg rounded-se-lg dark:border-gray-600 p-4 pb-2 bg-gray-900'
				/>

				<form onSubmit={submit} action={action} onChange={reset}>
					<div className='space-y-4 border border-t-0 rounded-ee-lg rounded-es-lg dark:border-gray-600 p-4 pt-2 bg-gray-900'>
						{/*  ProjectId */}
						{activeBranch && (
							<input
								name='id'
								type='hidden'
								value={`${activeProject?.id}/${activeBranch?.uuid}`}
							/>
						)}

						{activeBranch ? (
							<Input
								onChange={onChange}
								disabled={disabledForm}
								autoComplete='branch-name'
								placeholder={t('form.name')}
								value={activeBranch.name}
								name='name'
								type='text'
							/>
						) : (
							<Skeleton className='h-[58px]' />
						)}
						{activeBranch ? (
							<TextArea
								disabled={disabledForm}
								onChange={onChange}
								name='info'
								placeholder={t('form.info')}
								value={activeBranch.info || ''}
							/>
						) : (
							<Skeleton className='h-[82px]' />
						)}
						{activeBranch ? (
							<Accordion
								id={`branch-settings-${activeBranch.uuid}`}
								head={
									<Button
										tag='div'
										variant='dark'
										message={t('form.address')}
										className='justify-between text-gray-400 dark:text-gray-500'
										iconAfter={
											<span className='icon shrink-0 block transition-transform rotate-0 ease-out self-baseline'>
												<BiChevronDown size={24} className={''} />
											</span>
										}
									/>
								}
							>
								<div className='space-y-3 border rounded-lg dark:border-gray-600 p-4'>
									<Input
										onChange={onChange}
										disabled={disabledForm}
										autoComplete='country'
										placeholder={t('form.country')}
										value={activeBranch.address.country || ''}
										name='address.country'
										type='text'
									/>
									<Input
										onChange={onChange}
										disabled={disabledForm}
										autoComplete='city'
										placeholder={t('form.city')}
										value={activeBranch.address.city || ''}
										name='address.city'
										type='text'
									/>
									<Input
										onChange={onChange}
										disabled={disabledForm}
										placeholder={t('form.address_line')}
										value={activeBranch.address.address_line || ''}
										name='address.address_line'
										type='text'
									/>
									<Input
										onChange={onChange}
										disabled={disabledForm}
										placeholder={t('form.address_line_2')}
										value={activeBranch.address.address_line_2 || ''}
										name='address.address_line_2'
										type='text'
									/>
								</div>
							</Accordion>
						) : (
							<Skeleton className='h-[42px]' />
						)}
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-2 my-6'>
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
		</div>
	);
}

export default BranchesSettings;

/* <fieldset className='space-y-3 border rounded-lg dark:border-gray-600 p-4'>
							<legend className='text-xs font-medium text-gray-400 dark:text-gray-500 px-1'>
								Contacts
							</legend>
							<div className='grid w-full grid-cols-2 gap-4'>
								<Input
									placeholder='Country'
									defaultValue={branch?.address.country}
								/>
								<Input
									placeholder='State/Region'
									defaultValue={branch?.address.state_region}
								/>
								<Input
									placeholder='Country'
									defaultValue={branch?.address.country}
								/>
								<Input
									placeholder='State/Region'
									defaultValue={branch?.address.state_region}
								/>
								<Button
									variant='dark'
									className='col-span-2'
									message='Add contact'
									icon={<MdOutlineAdd size={24} />}
								/>
							</div>
						</fieldset> */
