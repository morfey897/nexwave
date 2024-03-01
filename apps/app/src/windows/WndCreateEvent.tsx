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
import { ACCESS_DENIED, CREATE_FAILED, USER_UNAUTHORIZED } from '@/errorCodes';
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
import { EnumColor, EnumResponse, EnumRepeatPeriod, COLORS } from '@/enums';
import { useState } from 'react';
import { generateColor } from '@/utils';
import Marker from '@/components/ColorMarker';
import SVGIcon from '@/components/SVGIcon';
import { useDateLocale } from '@/hooks/datetime';
import { format, previousMonday, addDays } from 'date-fns';
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
	const [repeatEach, setRepeat] = useState<string>(EnumRepeatPeriod.WEEK);
	const [repeatInterval, setRepeatInterval] = useState(1);
	const [endDate, setEndDate] = useState('');
	const [repeatWeek, setRepeatWeek] = useState<string[]>([]);

	const router = useRouter();
	const closeAll = useCloseAllModal();
	const { action, submit, reset, pending, result } =
		useAction(actionCreateNewEvent);
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
				value: `day_${day}`,
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

	const onChangeRepeatDate = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name = event.target.name;
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

		list.push(
			t(`page.add_event.repeat_${repeatEach}_`, { interval: repeatInterval }),
		);

		if (repeatWeek.length > 0 && repeatEach === EnumRepeatPeriod.WEEK) {
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
					<form onSubmit={submit} action={action} onChange={reset}>
						<div className='space-y-4'>
							<input type='hidden' name='id' value={project?.id} />
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
										maskedProps={{
											alias: 'datetime',
											inputFormat: 'HH:MM',
											showMaskOnHover: false,
										}}
									/>
									<Masked
										required
										name='to_time'
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
											required
											name='date'
											type='date'
											placeholder={t('form.date')}
											min={new Date().toISOString().split('T')[0]}
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
										<div className='grid grid-cols-2 gap-4 mt-4'>
											<Input
												name='repeat_interval'
												type='number'
												placeholder={t('page.add_event.repeat_interval')}
												min={1}
												max={99}
												value={repeatInterval}
												onChange={(event) =>
													setRepeatInterval(Number.parseInt(event.target.value, 10))
												}
											/>
											<Select
												name='repeat_period'
												placeholder={t('page.add_event.repeat_period')}
												className='w-full'
												value={repeatEach}
												onChange={(event) => setRepeat(event.target.value)}
											>
												<option value={EnumRepeatPeriod.WEEK}>
													{t('page.add_event.repeat_single_period_', {
														period: EnumRepeatPeriod.WEEK,
													})}
												</option>
												<option value={EnumRepeatPeriod.MONTH}>
													{t('page.add_event.repeat_single_period_', {
														period: EnumRepeatPeriod.MONTH,
													})}
												</option>
												<option value={EnumRepeatPeriod.YEAR}>
													{t('page.add_event.repeat_single_period_', {
														period: EnumRepeatPeriod.YEAR,
													})}
												</option>
											</Select>
											<div
												className={clsx(
													'col-span-2',
													repeatEach != EnumRepeatPeriod.WEEK && 'hidden',
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
															onChange={() => setEndNever(!endNever)}
														/>
														<Input
															name='end_on_date'
															type='date'
															placeholder={t('page.add_event.end_on')}
															min={new Date().toISOString().split('T')[0]}
															className={clsx(endNever && 'hidden')}
															value={endDate}
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
