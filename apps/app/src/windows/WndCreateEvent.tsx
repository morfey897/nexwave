'use client';
import Button from '@/components/Button';
import { useLocale, useTranslations } from 'next-intl';
import { type IModal, Position, withModal, useCloseAllModal } from '@nw/modal';
import {
	Input,
	Textarea,
	File,
	Select,
	Masked,
	Fieldset,
	Autocomplete,
	Checkbox,
} from '@/components/Controls/Form';

import Spinner from '@/components/Spinner';
import { useAction } from '@/hooks/action';
import { actionCreateNewBranch } from '@/actions/branch-action';
import { ACCESS_DENIED, CREATE_FAILED, USER_UNAUTHORIZED } from '@/errorCodes';
import { BiChevronDown } from 'react-icons/bi';
import { HiOutlineClock } from 'react-icons/hi';
import Accordion from '@/components/Accordion';
import {
	AsideWrapper,
	AsideHeader,
	AsideBody,
	WndFooter,
} from '@/components/Windows';
import ErrorCopy from '@/components/ErrorCopy';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import useNWStore from '@/lib/store';
import { CREATE } from '@/crud';
import { hasAccess } from '@/utils';
import AccessDenied from '@/components/AccessDenied';
import clsx from 'clsx';
import { EnumColor, EnumResponse, COLORS, CURRENCIES } from '@/enums';
import { useState } from 'react';
import { generateColor } from '@/utils';
import Marker from '@/components/ColorMarker';
import SVGIcon from '@/components/SVGIcon';
import { useDateLocale } from '@/hooks/datetime';
import { compareAsc, format, previousMonday, addDays } from 'date-fns';

function CreateEvent({ closeMe }: IModal) {
	const project = useNWStore((state) => state.project);
	const hasPermission = hasAccess(project?.permission, CREATE.EVENT);

	const locale = useLocale();
	const dateLocale = useDateLocale(locale);

	const [color, setColor] = useState(generateColor());
	const [branchUUID, setBranchUUID] = useState('');

	const [endNever, setEndNever] = useState(true);
	const [repeat, setRepeat] = useState('weekly');

	const router = useRouter();
	const closeAll = useCloseAllModal();
	const { action, submit, reset, pending, result } = useAction(
		actionCreateNewBranch,
	);
	const t = useTranslations();

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			closeAll();
			router.refresh();
		}
	}, [result, router, closeAll]);

	useEffect(() => {
		if (project?.branches?.length === 1) {
			setBranchUUID(project?.branches[0].uuid);
		}
	}, [project?.branches]);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		console.log('SUBMIT:', Object.fromEntries(data.entries()));
		// submit(data);
	};

	const onChangeEndNever = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setEndNever(event.target.checked);
		},
		[],
	);

	const onChangeRepeat = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setRepeat(event.target.value);
		},
		[],
	);

	const week = useMemo(() => {
		const monday = previousMonday(new Date());
		return new Array(7).fill(0).map((_, i) => {
			const d = addDays(monday, i);
			return (
				<Checkbox
					key={`day-${d.getDay()}`}
					name={`day-${d.getDay()}`}
					placeholder={format(d, 'EEE', { locale: dateLocale })}
					className='[&_.label]:capitalize [&_.input]:!w-6 [&_.input]:!h-6'
				/>
			);
		});
	}, [dateLocale]);

	return (
		<AsideWrapper className='!w-full md:w-96'>
			<AsideHeader
				headline={t('page.add_event.headline')}
				subheadline={t('page.add_event.subheadline')}
				onClose={closeMe}
			/>
			<AsideBody>
				{hasPermission ? (
					// <form onSubmit={submit} action={action} onChange={reset}>
					<form onSubmit={onSubmit}>
						<div className='space-y-4'>
							<input type='hidden' name='id' value={project?.id} />
							<Input name='name' type='text' placeholder={t('form.name')} />
							<Autocomplete
								name='direction'
								searchOptions={{
									fields: ['label'],
									storeFields: ['id', 'label'],
									searchOptions: {
										fuzzy: 0.2,
										prefix: true,
									},
								}}
								placeholder={t('form.direction')}
							/>
							<Select
								name='branch_uuid'
								placeholder={t('form.select_branch')}
								icon={<SVGIcon type='branch' size={24} />}
								onChange={(event) => setBranchUUID(event.target.value)}
							>
								{project?.branches?.map((branch) => (
									<option key={branch.uuid} value={branch.uuid}>
										{branch.name}
									</option>
								))}
							</Select>
							<Select name='space_id' placeholder={t('form.select_space')}>
								{project?.branches
									?.find((branch) => branch.uuid === branchUUID)
									?.spaces?.map((space) => (
										<option key={space.shortId} value={space.shortId}>
											{space.name}
										</option>
									))}
							</Select>
							<Fieldset legend={t('form.date')}>
								<div className='grid grid-cols-2 gap-4'>
									<Masked
										name='from'
										placeholder={t('form.from')}
										maskedProps={{
											alias: 'datetime',
											inputFormat: 'HH:MM',
											showMaskOnHover: false,
										}}
									/>
									<Masked
										name='to'
										placeholder={t('form.to')}
										maskedProps={{
											alias: 'datetime',
											inputFormat: 'HH:MM',
											showMaskOnHover: false,
										}}
										className={clsx(
											'[&:before]:content-[""] [&:before]:absolute',
											'[&:before]:border-gray-400 [&:before]:dark:border-gray-600 [&:before]:border',
											'[&:before]:w-2 [&:before]:-left-3 [&:before]:top-7',
										)}
									/>
									<div className='col-span-2'>
										<Input
											name='date'
											type='date'
											placeholder={t('form.date')}
											min={new Date().toISOString()}
										/>
									</div>
									<Accordion
										id={`rrule-${project?.id}`}
										name='rrule'
										className='col-span-2'
										head={
											<Button message={'Repeat'} variant={'dark'} tag='span' />
										}
									>
										<div className='grid grid-cols-2 gap-4 mt-4'>
											<Input
												name='repeat_every'
												type='number'
												placeholder={t('form.repeat_every')}
												min={1}
												max={99}
												defaultValue={1}
											/>
											<Select
												name='repeat'
												placeholder={t('form.repeat')}
												className='w-full'
												value={repeat}
												onChange={onChangeRepeat}
											>
												<option value='weekly'>
													{t('form.repeat_weekly')}
												</option>
												<option value='monthly'>
													{t('form.repeat_monthly')}
												</option>
												<option value='yearly'>
													{t('form.repeat_yearly')}
												</option>
											</Select>
											<div
												className={clsx(
													'col-span-2',
													repeat != 'weekly' && 'hidden',
												)}
											>
												<Fieldset legend={t('form.repeat_on')}>
													<div className='grid gap-4 grid-cols-3 md:grid-cols-4'>
														{week}
													</div>
												</Fieldset>
											</div>
											<div className='col-span-2'>
												<Fieldset legend={t('form.ends')}>
													<div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
														<Checkbox
															name={`end_never`}
															placeholder={t('form.end_never')}
															className='self-center'
															checked={endNever}
															onChange={onChangeEndNever}
														/>
														<Input
															name='end_on'
															type='date'
															placeholder={t('form.end_on')}
															min={new Date().toISOString()}
															className={clsx(endNever && 'hidden')}
														/>
													</div>
												</Fieldset>
											</div>
										</div>
									</Accordion>
								</div>
							</Fieldset>

							<Select
								onChange={(event) => setColor(event.target.value as EnumColor)}
								icon={<Marker size={12} color={color} className='block' />}
								name='color'
								placeholder={t('form.select_color')}
								defaultValue={color}
							>
								{COLORS.map((clr) => (
									<option key={clr} value={clr}>
										{t(`color.${clr}`)}
									</option>
								))}
							</Select>
						</div>
						<WndFooter
							errorCopy={
								<ErrorCopy
									code={result?.error?.code}
									codes={{
										[USER_UNAUTHORIZED]: true,
										[CREATE_FAILED]: true,
										[ACCESS_DENIED]: true,
									}}
								/>
							}
						>
							<Button
								onClick={closeMe}
								variant='default'
								className='capitalize'
								message={t('button.cancel')}
								disabled={pending}
							/>

							<Button
								variant='primary'
								type='submit'
								className='capitalize'
								message={t('button.create')}
								disabled={pending}
								icon={pending && <Spinner variant='primary' />}
							/>
						</WndFooter>
					</form>
				) : (
					<AccessDenied />
				)}
			</AsideBody>
		</AsideWrapper>
	);
}

export default withModal(CreateEvent, {
	position: [Position.RIGHT, Position.TOP],
	wrapper: {
		className: 'z-20',
	},
	overlay: {
		className: 'bg-gray-100/20 dark:bg-black/60 backdrop-blur',
	},
});
