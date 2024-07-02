'use client';
import Button from '@/components/Button';
import { useLocale, useTranslations } from 'next-intl';
import { type IModal, Position, withModal, useCloseAllModal } from '@nw/modal';
import {
	Input,
	Textarea,
	Select,
	Masked,
	Fieldset,
	Autocomplete,
	Checkbox,
} from '@/components/Controls/Form';

import Spinner from '@/components/Spinner';
import { useAction } from '@/hooks/action';
import { actionCreateNewEvent } from '@/actions/event-action';
import {
	ACCESS_DENIED,
	CREATE_FAILED,
	USER_UNAUTHORIZED,
	INVALID_DATE,
	INVALID_TIME_FROM,
	INVALID_TIME_TO,
	MISSING_DATE,
	MISSING_TIME_FROM,
	MISSING_TIME_TO,
	INVALID_TIME_RANGE,
} from '@/errorCodes';
import Accordion from '@/components/Accordion';
import {
	AsideWrapper,
	AsideHeader,
	AsideBody,
	WndFooter,
} from '@/components/Windows';
import ErrorCopy from '@/components/ErrorCopy';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import useNWStore from '@/lib/store';
import { CREATE } from '@/crud';
import { hasAccess } from '@/utils';
import AccessDenied from '@/components/AccessDenied';
import clsx from 'clsx';
import {
	EnumColor,
	EnumResponse,
	EnumRepeatPeriod,
	COLORS,
	WEEK_DAYS,
} from '@/enums';
import { useState } from 'react';
import { generateColor } from '@/utils';
import Marker from '@/components/ColorMarker';
import SVGIcon from '@/components/SVGIcon';
import { useDateLocale, useNow } from '@/hooks/datetime';
import { addDays, format } from 'date-fns';
import { capitalize } from 'lodash';

function CreateEvent({ closeMe, params }: IModal) {
	const project = useNWStore((state) => state.project);
	const hasPermission = hasAccess(project?.permission, CREATE.EVENT);

	const locale = useLocale();
	const now = useNow();
	const dateLocale = useDateLocale(locale);

	const [color, setColor] = useState(generateColor());
	const [branchUUID, setBranchUUID] = useState('');

	const [repeatable, setRepeatable] = useState(false);
	const [startDate, setStartDate] = useState((params?.date as string) || '');

	const [endNever, setEndNever] = useState(true);
	const [repeatEach, setRepeat] = useState<string>(EnumRepeatPeriod.WEEKLY);
	const [repeatInterval, setRepeatInterval] = useState(1);
	const [endDate, setEndDate] = useState('');
	const [repeatWeek, setRepeatWeek] = useState<string[]>([]);

	const router = useRouter();
	const closeAll = useCloseAllModal();
	const { action, submit, reset, pending, result } =
		useAction(actionCreateNewEvent);
	const t = useTranslations();

	const errorCode = result?.error?.code;

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

	useEffect(() => {
		if (repeatWeek.length === 0) {
			setRepeatWeek([WEEK_DAYS[now.getDay()]]);
		}
	}, [repeatWeek, now]);

	const week = useMemo(() => {
		return [0, 1, 2, 3, 4, 5, 6].map((i) => {
			const day = ((dateLocale.options?.weekStartsOn || 0) + i) % 7;
			return {
				day: day,
				value: WEEK_DAYS[day],
				label: capitalize(
					dateLocale.localize?.day(day, { width: 'abbreviated' })
				),
			};
		});
	}, [dateLocale]);

	const onChangeRepeatDate = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name = event.target.name;
			setRepeatWeek((prev) => {
				let newList = prev.includes(name)
					? prev.filter((item) => item !== name)
					: [...prev, name];

				if (newList.length === 0) {
					newList = [WEEK_DAYS[now.getDay()]];
				}
				return newList;
			});
		},
		[now]
	);

	const rrule = useMemo(() => {
		if (!repeatable) return '';
		const list: string[] = [];

		if (repeatInterval === 1) {
			list.push(
				t(`page.add_event.repeat_single_period_`, { period: repeatEach })
			);
		} else if (repeatInterval > 1) {
			let token = '';
			switch (repeatEach) {
				case EnumRepeatPeriod.MONTHLY:
					token = `page.add_event.repeat_monthly_`;
					break;
				case EnumRepeatPeriod.YEARLY:
					token = `page.add_event.repeat_yearly_`;
					break;
				case EnumRepeatPeriod.WEEKLY:
					token = `page.add_event.repeat_weekly_`;
					break;
				default:
					token = 'page.add_event.repeat_otherly_';
					break;
			}
			list.push(
				t(token, {
					period: repeatInterval,
				})
			);
		}

		if (repeatWeek.length > 0 && repeatEach === EnumRepeatPeriod.WEEKLY) {
			list.push(
				t('page.add_event.on_days_', {
					days: `${week
						.filter((day) => repeatWeek.includes(day.value))
						.map((day) => day.label)
						.join(',')}`,
				})
			);
		}
		if (!endNever && endDate) {
			list.push(
				t('page.add_event.until_', {
					end: format(new Date(endDate), 'dd.MM.yyyy', {
						locale: dateLocale,
					}),
				})
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
					<form onSubmit={submit} action={action} onChange={reset}>
						<div className='space-y-4'>
							<input type='hidden' name='id' value={project?.id} />
							<input
								type='hidden'
								name='tz_offset'
								value={now.getTimezoneOffset()}
							/>
							<Input
								name='name'
								type='text'
								placeholder={t('form.name')}
								required
							/>
							<Autocomplete
								name='service_id'
								searchOptions={{
									fields: ['label'],
									storeFields: ['id', 'label'],
									searchOptions: {
										fuzzy: 0.2,
										prefix: true,
									},
								}}
								placeholder={t('form.service')}
							/>
							<Select
								required
								name='branch_id'
								placeholder={t('form.select_branch')}
								icon={<SVGIcon type='branch' size={24} />}
								onChange={(event) => setBranchUUID(event.target.value)}
								value={branchUUID}
							>
								{project?.branches?.map((branch) => (
									<option key={branch.id} value={branch.id}>
										{branch.name}
									</option>
								))}
							</Select>
							<Select
								name='space_short_id'
								placeholder={t('form.select_space')}
							>
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
										required
										name='from_time'
										placeholder={t('form.from')}
										defaultValue={params?.from_time as string}
										maskedProps={{
											alias: 'datetime',
											inputFormat: 'HH:MM',
											showMaskOnHover: false,
										}}
										errorCopy={
											(errorCode?.includes(MISSING_TIME_FROM) &&
												t('error.missing_time_from')) ||
											(errorCode?.includes(INVALID_TIME_FROM) &&
												t('error.invalid_time_from')) ||
											(errorCode?.includes(INVALID_TIME_RANGE) && true)
										}
									/>
									<Masked
										required
										name='to_time'
										placeholder={t('form.to')}
										defaultValue={params?.to_time as string}
										maskedProps={{
											alias: 'datetime',
											inputFormat: 'HH:MM',
											showMaskOnHover: false,
										}}
										className={clsx(
											'[&:before]:absolute [&:before]:content-[""]',
											'[&:before]:border [&:before]:border-gray-400 [&:before]:dark:border-gray-600',
											'[&:before]:-left-3 [&:before]:top-7 [&:before]:w-2'
										)}
										errorCopy={
											(errorCode?.includes(MISSING_TIME_TO) &&
												t('error.missing_time_to')) ||
											(errorCode?.includes(INVALID_TIME_TO) &&
												t('error.invalid_time_to')) ||
											(errorCode?.includes(INVALID_TIME_RANGE) && true)
										}
									/>
									<ErrorCopy
										className='col-span-2'
										code={errorCode}
										codes={{
											[INVALID_TIME_RANGE]: t('error.invalid_range'),
										}}
									/>
									<div className='col-span-2'>
										<Input
											required
											name='date'
											type='date'
											placeholder={t('form.date')}
											min={now.toISOString().split('T')[0]}
											errorCopy={
												(errorCode?.includes(MISSING_DATE) && 'Missing date') ||
												(errorCode?.includes(INVALID_DATE) && 'Invalid date')
											}
											value={startDate}
											onChange={(event) => setStartDate(event.target.value)}
										/>
									</div>
									<Accordion
										className='col-span-2'
										inputProps={{
											name: 'rrule',
											checked: repeatable,
											onChange: () => setRepeatable(!repeatable),
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
										<div className='mt-4 grid grid-cols-2 gap-4'>
											<Input
												name='repeat_interval'
												type='number'
												placeholder={t('page.add_event.repeat_interval')}
												min={1}
												max={99}
												value={repeatInterval}
												onChange={(event) =>
													setRepeatInterval(
														Number.parseInt(event.target.value, 10)
													)
												}
											/>
											<Select
												name='repeat_period'
												placeholder={t('page.add_event.repeat_period')}
												className='w-full'
												value={repeatEach}
												onChange={(event) => setRepeat(event.target.value)}
											>
												<option value={EnumRepeatPeriod.WEEKLY}>
													{t('page.add_event.repeat_single_period_', {
														period: EnumRepeatPeriod.WEEKLY,
													})}
												</option>
												<option value={EnumRepeatPeriod.MONTHLY}>
													{t('page.add_event.repeat_single_period_', {
														period: EnumRepeatPeriod.MONTHLY,
													})}
												</option>
												<option value={EnumRepeatPeriod.YEARLY}>
													{t('page.add_event.repeat_single_period_', {
														period: EnumRepeatPeriod.YEARLY,
													})}
												</option>
											</Select>
											<div
												className={clsx(
													'col-span-2',
													repeatEach != EnumRepeatPeriod.WEEKLY && 'hidden'
												)}
											>
												<Fieldset legend={t('page.add_event.repeat_on')}>
													<div className='grid grid-cols-3 gap-4 md:grid-cols-4'>
														{week.map((day) => (
															<Checkbox
																key={day.value}
																name={day.value}
																placeholder={day.label}
																className='[&_.input]:!h-6 [&_.input]:!w-6'
																checked={repeatWeek.includes(day.value)}
																onChange={onChangeRepeatDate}
															/>
														))}
													</div>
												</Fieldset>
											</div>
											<div className='col-span-2'>
												<Fieldset legend={t('page.add_event.ends')}>
													<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
														<Checkbox
															name={`end_never`}
															placeholder={t('page.add_event.end_never')}
															className='self-center'
															checked={endNever}
															onChange={() => setEndNever(!endNever)}
														/>
														<Input
															required={!endNever}
															name='end_on_date'
															type={'date'}
															placeholder={t('page.add_event.end_on')}
															min={
																addDays(
																	new Date(startDate || now.toISOString()),
																	1
																)
																	.toISOString()
																	.split('T')[0]
															}
															className={clsx(endNever && '!opacity-50')}
															value={endNever ? '' : endDate}
															onClick={() => setEndNever(false)}
															onChange={(event) =>
																setEndDate(event.target.value)
															}
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
									code={errorCode}
									codes={{
										[USER_UNAUTHORIZED]: true,
										[CREATE_FAILED]: true,
										[ACCESS_DENIED]: true,
										[MISSING_DATE]: false,
										[INVALID_DATE]: false,
										[MISSING_TIME_FROM]: false,
										[INVALID_TIME_FROM]: false,
										[MISSING_TIME_TO]: false,
										[INVALID_TIME_TO]: false,
										[INVALID_TIME_RANGE]: false,
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
