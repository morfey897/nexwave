'use client';

import { useTranslations } from 'next-intl';
import { useAction } from '@/hooks/action';
import { Input, Select, File, TextArea } from '@/components/Controls/Form';
import Skeleton from '@/components/Skeleton';
import { MdLabelOutline, MdOutlineCloudUpload } from 'react-icons/md';
import Marker from '@/components/Project/Marker';
import { EnumResponse, EnumColor, EnumCurrency } from '@/enums';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { actionUpdateProject } from '@/actions/project-action';
import { IFullProject } from '@/models/project';
import { USER_UNAUTHORIZED, ACCESS_DENIED, UPDATE_FAILED } from '@/errorCodes';
import { useRouter } from 'next/navigation';
import { APP } from '@/routes';
import StateSettings, { type UnitAction } from './StateSettings';
import { hasAccess } from '@/utils';
import { UPDATE, DELETE } from '@/crud';
import { actionUpdateVisibilityProject } from '@/actions/project-action';
import { cloneDeep } from 'lodash';
import ErrorCopy from '@/components/ErrorCopy';

const ROLES: Record<UnitAction, number> = {
	publish: UPDATE.PROJECT,
	unpublish: UPDATE.UNPUBLISH_PROJECT,
	delete: DELETE.PROJECT,
};

const COLORS = Object.values(EnumColor);
const CURRENCIES = Object.values(EnumCurrency);

function GeneralSettings({ project }: { project: IFullProject | null }) {
	const t = useTranslations();
	const router = useRouter();
	const [activeProject, setActiveProject] = useState<IFullProject | null>(null);
	const [changed, setChanged] = useState(false);

	const { action, submit, reset, pending, result } =
		useAction(actionUpdateProject);

	const permission = activeProject?.roles[activeProject?.role || ''] || 0;

	const disabledForm = !hasAccess(permission, UPDATE.PROJECT);

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
			const name = target.name;
			const value = target.value;
			setActiveProject((prev) => (prev ? { ...prev, [name]: value } : null));
			setChanged(true);
		},
		[],
	);

	const onDiscard = useCallback(() => {
		setActiveProject(cloneDeep(project));
		setChanged(false);
	}, [project]);

	const postProcess = useMemo(
		() => (newProject: IFullProject) => ({
			id: newProject.id,
			state: newProject.state,
			permission: newProject.roles[newProject.role || ''],
		}),
		[],
	);

	return (
		<div className='w-full max-w-3xl mx-auto mt-6 space-y-4'>
			{/* State */}
			<StateSettings<IFullProject>
				serverAction={actionUpdateVisibilityProject}
				postProcess={postProcess}
				item={activeProject}
				roles={ROLES}
			/>

			{/* Form */}
			<form onSubmit={submit} action={action} onChange={reset}>
				<div className='space-y-4'>
					{/*  ProjectId */}
					{activeProject && (
						<input name='id' type='hidden' value={activeProject?.id} />
					)}

					{/*  Name */}
					{activeProject ? (
						<Input
							disabled={disabledForm}
							onChange={onChange}
							autoComplete='project-name'
							icon={<MdLabelOutline size={32} />}
							name='name'
							type='text'
							placeholder={t('form.name')}
							value={activeProject.name}
						/>
					) : (
						<Skeleton className='h-[58px]' />
					)}

					{/* Info */}
					{activeProject ? (
						<TextArea
							disabled={disabledForm}
							onChange={onChange}
							name='info'
							placeholder={t('form.info')}
							value={activeProject.info || ''}
						/>
					) : (
						<Skeleton className='h-[82px]' />
					)}

					{/* Color */}
					{activeProject ? (
						<Select
							disabled={disabledForm}
							onChange={onChange}
							icon={
								<Marker
									size={12}
									color={activeProject.color}
									className='block'
								/>
							}
							name='color'
							placeholder={t('form.select_color')}
							value={
								COLORS.includes(activeProject.color as EnumColor)
									? (activeProject.color as string)
									: ''
							}
						>
							<option className='hidden' value={''} />
							{COLORS.map((clr) => (
								<option key={clr} value={clr}>
									{t(`color.${clr}`)}
								</option>
							))}
						</Select>
					) : (
						<Skeleton className='h-[48px]' />
					)}

					{/* Currency */}
					{activeProject ? (
						<Select
							disabled={disabledForm}
							onChange={onChange}
							icon={<MdOutlineCurrencyExchange size={24} />}
							name='currency'
							placeholder={t('form.select_currency')}
							value={
								CURRENCIES.includes(activeProject.currency as EnumCurrency)
									? (activeProject.currency as string)
									: ''
							}
						>
							<option className='hidden' value={''} />
							{CURRENCIES.map((currency) => (
								<option key={currency} value={currency}>
									{t(`currency.${currency}`)}
								</option>
							))}
						</Select>
					) : (
						<Skeleton className='h-[48px]' />
					)}
					{activeProject ? (
						<File
							disabled={disabledForm}
							onChange={onChange}
							icon={<MdOutlineCloudUpload size={24} />}
							name='image'
							placeholder={t('form.select_image')}
							hint={t('form.image_hint')}
							accept='image/png, image/jpeg'
						/>
					) : (
						<Skeleton className='h-[112px]' />
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
	);
}

export default GeneralSettings;
