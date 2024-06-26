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
import { Input, Textarea } from '@/components/Controls/Form';
import StateSettings, { type UnitAction } from './StateSettings';
import {
	actionUpdateVisibilityBranch,
	actionUpdateBranch,
} from '@/actions/branch-action';
import { UPDATE, DELETE } from '@/crud';
import { useTranslations } from 'next-intl';
import Accordion from '@/components/Accordion';
import { BiChevronDown } from 'react-icons/bi';
import { generateName, generateShortId, hasAccess } from '@/utils';
import Spinner from '@/components/Spinner';
import { useAction } from '@/hooks/action';
import { USER_UNAUTHORIZED, ACCESS_DENIED, UPDATE_FAILED } from '@/errorCodes';
import { EnumResponse } from '@/enums';
import Skeleton from '@/components/Skeleton';
import { cloneDeep } from 'lodash';
import ErrorCopy from '@/components/ErrorCopy';
import { HiMiniMinus, HiMiniPlus } from 'react-icons/hi2';
import { unflatten } from '@/utils/flat';

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
		(branch) => branch.uuid === activeTab
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
					(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
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
		[router, searchParams]
	);

	const postProcess = useMemo(
		() => (newProject: IFullProject) => {
			const branch = newProject?.branches.find(
				(branch) => branch.uuid === activeTab
			);
			return {
				id: `${newProject?.id}/${branch?.uuid}`,
				state: branch?.state,
				permission: newProject?.roles[newProject.role || ''],
			};
		},
		[activeTab]
	);

	const onChange = useCallback(
		(
			event: React.FormEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		) => {
			if (!activeBranch) return;
			const target = event.target as HTMLInputElement;
			const names = target.name;
			const value = target.value;

			let newBranch = { ...activeBranch };
			const obj = unflatten<Record<string, any>>({ [names]: value });
			for (let [key, value] of Object.entries(obj)) {
				if (key === 'spaces') {
					const [[i, val]] = Object.entries(value);
					const [[shortId, name]] = Object.entries(val as Object);
					const space = { name, shortId };
					const index = Number.parseInt(i);
					newBranch = {
						...newBranch,
						spaces: newBranch.spaces.map((sp, i) => (i === index ? space : sp)),
					};
				} else if (key === 'address') {
					newBranch = {
						...newBranch,
						address: {
							...newBranch.address,
							...value,
						},
					};
				} else {
					newBranch = {
						...newBranch,
						[key]: value,
					};
				}
			}
			setActiveProject((prev) =>
				prev
					? {
							...prev,
							branches: prev.branches.map((br) =>
								br.uuid === newBranch.uuid ? newBranch : br
							),
						}
					: null
			);
			setChanged(true);
		},
		[activeBranch]
	);

	const onDiscard = useCallback(() => {
		setActiveProject(cloneDeep(project));
		setChanged(false);
	}, [project]);

	/**
	 * Add a new space to the branch
	 * @param event
	 */
	const onAddSpace = useCallback(
		(event: React.MouseEvent) => {
			event.preventDefault();
			if (!activeBranch) return;

			const newBranch = {
				...activeBranch,
				spaces: [
					...activeBranch.spaces,
					{
						shortId: generateShortId(6),
						name: generateName(0),
					},
				],
			};
			setActiveProject((prev) =>
				prev
					? {
							...prev,
							branches: prev.branches.map((br) =>
								br.uuid === newBranch.uuid ? newBranch : br
							),
						}
					: null
			);
			setChanged(true);
		},
		[activeBranch]
	);

	/**
	 * Remove a space from the branch
	 * @param event
	 */
	const onRemoveSpace = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			const target = event.target as HTMLButtonElement;
			const spaceId = target.name;
			if (!activeBranch) return;

			const newBranch = {
				...activeBranch,
				spaces: activeBranch.spaces.filter((sp) => spaceId !== sp.shortId),
			};
			setActiveProject((prev) =>
				prev
					? {
							...prev,
							branches: prev.branches.map((br) =>
								br.uuid === newBranch.uuid ? newBranch : br
							),
						}
					: null
			);
			setChanged(true);
		},
		[activeBranch]
	);

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			router.refresh();
		}
	}, [result, router]);

	return (
		<div className='mx-auto mt-6 w-full max-w-3xl'>
			{activeProject ? (
				<Group className='hide-scroll relative ml-2 overflow-x-scroll [&>*:first-child]:rounded-es-none [&>*:last-child]:rounded-ee-none'>
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
									: 'translate-y-1'
							)}
							message={item.name}
							icon={
								<Icon size={24} altFallback={'branch'} image={item?.image} />
							}
						/>
					))}
				</Group>
			) : (
				<Skeleton className='ml-2 h-[42px] !w-[120px] !rounded-ee-none !rounded-es-none' />
			)}

			<div className='relative'>
				<StateSettings<IFullProject>
					serverAction={actionUpdateVisibilityBranch}
					postProcess={postProcess}
					id={`${activeProject?.id}/${activeBranch?.id}`}
					item={activeProject}
					roles={ROLES}
					className='rounded-se-lg rounded-ss-lg border border-b-0 bg-gray-900 p-4 pb-2 dark:border-gray-600'
				/>

				<form onSubmit={submit} action={action} onChange={reset}>
					<div className='space-y-4 rounded-ee-lg rounded-es-lg border border-t-0 bg-gray-900 p-4 pt-2 dark:border-gray-600'>
						{/*  ProjectId */}
						<input name='id' type='hidden' value={activeProject?.id} />
						{/*  BranchUUid */}
						<input
							name='branch_uuid'
							type='hidden'
							value={activeBranch?.uuid}
						/>
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
							<Textarea
								disabled={disabledForm}
								onChange={onChange}
								name='info'
								placeholder={t('form.info')}
								value={activeBranch.info || ''}
							/>
						) : (
							<Skeleton className='h-[82px]' />
						)}
						{/* Spaces */}
						{activeBranch ? (
							<Accordion
								inputProps={{
									children: (
										<Button
											tag='div'
											variant='dark'
											message={t('form.spaces')}
											className='justify-between text-gray-400 dark:text-gray-500'
											iconAfter={
												<span className='icon block shrink-0 rotate-0 self-baseline transition-transform ease-out'>
													<BiChevronDown size={24} className={''} />
												</span>
											}
										/>
									),
								}}
							>
								<div className='space-y-3 rounded-lg border p-4 dark:border-gray-600'>
									{activeBranch.spaces.map((space, index) => (
										<div
											className='flex w-full items-center gap-x-1'
											key={`space-${space.shortId}`}
										>
											<div className='w-full'>
												<Input
													onChange={onChange}
													disabled={disabledForm}
													placeholder={t('form.space_', { index: index + 1 })}
													value={space.name}
													name={`spaces.${index}.${space.shortId}`}
													type='text'
												/>
											</div>
											<Button
												name={space.shortId}
												onClick={onRemoveSpace}
												variant='light'
												icon={
													<span
														className={clsx(
															'pointer-events-none text-red-500 dark:text-red-500'
														)}
													>
														<HiMiniMinus size={24} />
													</span>
												}
												disabled={
													disabledForm || activeBranch.spaces.length < 2
												}
											/>
										</div>
									))}

									<Button
										onClick={onAddSpace}
										variant='dark'
										className='w-full'
										icon={
											<span
												className={clsx(
													'inline-block rounded-full p-0.5',
													'bg-blue-100 text-blue-500 dark:bg-blue-500 dark:text-white'
												)}
											>
												<HiMiniPlus size={18} />
											</span>
										}
										disabled={disabledForm}
									/>
								</div>
							</Accordion>
						) : (
							<Skeleton className='h-[42px]' />
						)}

						{/* Address */}
						{activeBranch ? (
							<Accordion
								inputProps={{
									children: (
										<Button
											tag='div'
											variant='dark'
											message={t('form.address')}
											className='justify-between text-gray-400 dark:text-gray-500'
											iconAfter={
												<span className='icon block shrink-0 rotate-0 self-baseline transition-transform ease-out'>
													<BiChevronDown size={24} className={''} />
												</span>
											}
										/>
									),
								}}
							>
								<div className='space-y-3 rounded-lg border p-4 dark:border-gray-600'>
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
					<div className='mt-6 grid grid-cols-1 gap-2 md:grid-cols-2'>
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
