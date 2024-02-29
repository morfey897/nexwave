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
import { capitalize } from 'lodash';

function CreateEvent({ closeMe }: IModal) {
	const project = useNWStore((state) => state.project);
	const hasPermission = hasAccess(project?.permission, CREATE.EVENT);

	const locale = useLocale();
	const dateLocale = useDateLocale(locale);

	const [color, setColor] = useState(generateColor());
	const [branchUUID, setBranchUUID] = useState('');

	const [repeatable, setRepeatable] = useState(false);

	const [endNever, setEndNever] = useState(true);
	const [repeatEach, setRepeat] = useState('weekly');
	const [repeatInterval, setRepeatInterval] = useState(1);
	const [endDate, setEndDate] = useState('');
	const [repeatWeek, setRepeatWeek] = useState<string[]>([]);

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

	const week = useMemo(() => {
		const monday = previousMonday(new Date());
		return [0, 1, 2, 3, 4, 5, 6].map((i) => {
			const d = addDays(monday, i);
			const day = d.getDay();
			return {
				day: day,
				value: `day-${day}`,
				label: capitalize(format(d, 'EEE', { locale: dateLocale })),
			};
		});
	}, [dateLocale]);

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

	const onChangeRepeatInterval = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setRepeatInterval(parseInt(event.target.value, 10));
		},
		[],
	);

	const onChangeRepeatEach = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setRepeat(event.target.value);
		},
		[],
	);

	const onChangeEndDate = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setEndDate(event.target.value);
		},
		[],
	);

	const onChangeRepeatable = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setRepeatable(event.target.checked);
		},
		[],
	);

	const onChangeRepeatDate = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name = event.target.name;
			console.log('onChangeRepeatDate:', name);
			setRepeatWeek((prev) =>
				prev.includes(name)
					? prev.filter((item) => item !== name)
					: [...prev, name],
			);
		},
		[],
	);

	const rrule = useMemo(() => {
		if (!repeatable) return '';
		const list: string[] = [];

		if (repeatInterval > 1) {
			list.push(
				t(`page.add_event.${repeatEach}_`, { interval: repeatInterval }),
			);
		} else {
			list.push(t(`page.add_event.repeat_${repeatEach}`));
		}
		if (repeatWeek.length > 0 && repeatEach === 'weekly') {
			list.push(
				t('page.add_event.on_days_', {
					days: `${week
						.filter((day) => repeatWeek.includes(day.value))
						.map((day) => day.label)
						.join(',')}`,
				}),
			);
		}
		if (!endNever && endDate) {
			list.push(
				t('page.add_event.until_', {
					end: format(new Date(endDate), 'dd.MM.yyyy', {
						locale: dateLocale,
					}),
				}),
			);
		}
		return list.join(';');
	}, [
		t,
		dateLocale,
		repeatable,
		repeatInterval,
		repeatEach,
		repeatWeek,
		endDate,
		endNever,
		week,
	]);

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
										className='col-span-2'
										inputProps={{
											name: 'rrule',
											checked: repeatable,
											onChange: onChangeRepeatable,
											children: (
												<Button
													message={
														!repeatable ? t('page.add_event.not_repeat') : rrule
													}
													variant={'dark'}
													tag='span'
												/>
											),
										}}
									>
										<div className='grid grid-cols-2 gap-4 mt-4'>
											<Input
												name='repeat_every'
												type='number'
												placeholder={t('page.add_event.repeat_every')}
												min={1}
												max={99}
												value={repeatInterval}
												onChange={onChangeRepeatInterval}
											/>
											<Select
												name='repeat_each'
												placeholder={t('page.add_event.repeat_each')}
												className='w-full'
												value={repeatEach}
												onChange={onChangeRepeatEach}
											>
												<option value='weekly'>
													{t('page.add_event.repeat_weekly')}
												</option>
												<option value='monthly'>
													{t('page.add_event.repeat_monthly')}
												</option>
												<option value='yearly'>
													{t('page.add_event.repeat_yearly')}
												</option>
											</Select>
											<div
												className={clsx(
													'col-span-2',
													repeatEach != 'weekly' && 'hidden',
												)}
											>
												<Fieldset legend={t('page.add_event.repeat_on')}>
													<div className='grid gap-4 grid-cols-3 md:grid-cols-4'>
														{week.map((day) => (
															<Checkbox
																key={day.value}
																name={day.value}
																placeholder={day.label}
																className='[&_.input]:!w-6 [&_.input]:!h-6'
																checked={repeatWeek.includes(day.value)}
																onChange={onChangeRepeatDate}
															/>
														))}
													</div>
												</Fieldset>
											</div>
											<div className='col-span-2'>
												<Fieldset legend={t('page.add_event.ends')}>
													<div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
														<Checkbox
															name={`end_never`}
															placeholder={t('page.add_event.end_never')}
															className='self-center'
															checked={endNever}
															onChange={onChangeEndNever}
														/>
														<Input
															name='end_on'
															type='date'
															placeholder={t('page.add_event.end_on')}
															min={new Date().toISOString()}
															className={clsx(endNever && 'hidden')}
															value={endDate}
															onChange={onChangeEndDate}
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

							<Textarea name='info' placeholder={t('form.info')} />
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
