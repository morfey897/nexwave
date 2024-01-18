'use client';

import { useTranslations } from 'next-intl';
import { useAction } from '@/hooks/action';
import { Input, Select, File, TextArea } from '@/components/Controls/Form';
import Skeleton from '@/components/Skeleton';
import { MdLabelOutline, MdOutlineCloudUpload } from 'react-icons/md';
import Marker from '@/components/Project/Marker';
import { EnumResponse, EnumColor, EnumCurrency } from '@/enums';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
import { useNWStore } from '@/hooks/store';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { actionUpdateProject } from '@/actions/project-action';
import { IFullProject } from '@/models/project';
import { USER_UNAUTHORIZED, ACCESS_DENIED, UPDATE_FAILED } from '@/errorCodes';
import { useRouter } from 'next/navigation';
import { APP } from '@/routes';
import StateSettings from './state';
import { hasAccess } from '@/utils';
import { UPDATE } from '@/crud';

const COLORS = Object.values(EnumColor);
const CURRENCIES = Object.values(EnumCurrency);

function GeneralSettings({ project }: { project: IFullProject | null }) {
	const t = useTranslations();
	const updateProject = useNWStore((state) => state.updateProject);
	const router = useRouter();
	const [active, setProject] = useState<IFullProject | null>(null);
	const [changed, setChanged] = useState(false);

	const { action, submit, reset, pending, result } =
		useAction(actionUpdateProject);

	const responseError = result?.error?.code;

	useLayoutEffect(() => {
		setProject(project);
		setChanged(false);
	}, [project]);

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			const newProject = result.data;
			setProject(newProject);
			setChanged(false);
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

	const signIn = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			router.push(APP);
		},
		[router],
	);

	const onChange = useCallback(
		(
			event: React.FormEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>,
		) => {
			const target = event.target as HTMLInputElement;
			const name = target.name;
			const value = target.value;
			setProject((project) => (project ? { ...project, [name]: value } : null));
			setChanged(true);
		},
		[],
	);

	const onDiscard = useCallback(() => {
		setProject(project);
		setChanged(false);
	}, [project]);

	const permission = active?.roles[project?.role || ''] || 0;

	const disabledForm = !hasAccess(permission, UPDATE.PROJECT_INFO);

	return (
		<div className='w-full max-w-3xl mx-auto mt-6 space-y-4'>
			{/* State */}
			<StateSettings project={project} />

			{/* Form */}
			<form
				onSubmit={submit}
				action={action}
				onChange={reset}
				aria-disabled={disabledForm}
			>
				<div className='space-y-4'>
					{/*  ProjectId */}
					{active && (
						<input name='projectId' type='hidden' value={project?.id} />
					)}

					{/*  Name */}
					{active ? (
						<Input
							disabled={disabledForm}
							onChange={onChange}
							autoComplete='project-name'
							icon={<MdLabelOutline size={32} />}
							name='name'
							type='text'
							placeholder={t('form.project_name')}
							value={active?.name}
						/>
					) : (
						<Skeleton className='h-[58px]' />
					)}

					{/* Info */}
					{active ? (
						<TextArea
							disabled={disabledForm}
							onChange={onChange}
							name='info'
							placeholder={t('form.info')}
							value={active.info || ''}
						/>
					) : (
						<Skeleton className='h-[82px]' />
					)}

					{/* Color */}
					{active ? (
						<Select
							disabled={disabledForm}
							onChange={onChange}
							icon={<Marker size={12} color={active.color} className='block' />}
							name='color'
							placeholder={t('form.select_color')}
							value={
								COLORS.includes(active.color as EnumColor)
									? (active.color as string)
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
					{active ? (
						<Select
							disabled={disabledForm}
							onChange={onChange}
							icon={<MdOutlineCurrencyExchange size={24} />}
							name='currency'
							placeholder={t('form.select_currency')}
							value={
								CURRENCIES.includes(active.currency as EnumCurrency)
									? (active.currency as string)
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
					{active ? (
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

				<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto mt-4'>
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
					{responseError?.includes(ACCESS_DENIED) && t('error.access_denied')}
					{responseError?.includes(UPDATE_FAILED) && t('error.update_failed')}
					{result?.status === EnumResponse.FAILED &&
						!responseError?.includes(USER_UNAUTHORIZED) &&
						!responseError?.includes(ACCESS_DENIED) &&
						!responseError?.includes(UPDATE_FAILED) &&
						t('error.wrong')}
				</p>

				{changed && (
					<div className='flex justify-end my-6 gap-x-2'>
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
			</form>
		</div>
	);
}

export default GeneralSettings;
