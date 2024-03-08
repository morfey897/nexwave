'use server';
import { hasProjectAccess } from '@/models/project';
import { createEvent, type IEvent } from '@/models/event';
import { getUserFromSession } from '@/models/user';
import * as ErrorCodes from '@/errorCodes';
import { CREATE } from '@/crud';
import { EnumResponse, EnumRepeatPeriod, WEEK_DAYS } from '@/enums';
import { parseError, doError, addZiro } from '@/utils';
import { mmToTime } from '@/utils/datetime';
import { strTimeToMinutes } from '@/utils/datetime';
import { IResponse } from '@/types';
import { validate } from '@/utils/validation';
import { getSession } from '@/headers';

const getWeek = (formData: FormData) =>
	WEEK_DAYS.filter((day) => formData.get(day)?.toString() === 'on');

const getRRule = (formData: FormData) => {
	const isRRule = formData.get('rrule')?.toString() === 'on';
	const repeatInterval = formData.get('repeat_interval')?.toString();
	const repeatPeriod = formData.get('repeat_period')?.toString();

	let rrule: IEvent['rrule'] | null = null;
	if (isRRule) {
		if (repeatPeriod) {
			rrule = Object.assign(rrule || {}, {
				freq: repeatPeriod.toUpperCase(),
			});
		}
		const repInterval = Number.parseInt(repeatInterval || '1');
		rrule = Object.assign(rrule || {}, {
			interval: Number.isNaN(repInterval) || repInterval < 1 ? 1 : repInterval,
		});

		if (repeatPeriod === EnumRepeatPeriod.WEEKLY) {
			const week = getWeek(formData);
			rrule = Object.assign(rrule || {}, {
				byday: week.join(',').toUpperCase(),
			});
		}
	}
	return rrule;
};

const getTZOffset = (formData: FormData) => {
	const tzOffset = Number.parseInt(formData.get('tz_offset')?.toString() || '');

	let timezone = 'Z';
	if (!Number.isNaN(tzOffset) && tzOffset !== 0) {
		const { hh, mm } = mmToTime(Math.abs(tzOffset));
		timezone = `${tzOffset < 0 ? '+' : '-'}${addZiro(hh)}:${addZiro(mm)}`;
	}
	return timezone;
};

/**
 * Create new branch
 * @returns IResponse
 */
export async function actionCreateNewEvent(
	formData: FormData,
): Promise<IResponse<IEvent>> {
	try {
		const user = await getUserFromSession(getSession());
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);

		const projectId = Number.parseInt(formData.get('id')?.toString() || '');
		const access = await hasProjectAccess(CREATE.EVENT, {
			userId: user.id,
			projectId,
		});

		if (!access || !projectId) throw doError(ErrorCodes.ACCESS_DENIED);

		const branchId = Number.parseInt(
			formData.get('branch_id')?.toString() || '',
		);
		if (Number.isNaN(branchId)) throw doError(ErrorCodes.CREATE_FAILED);

		const serviceId = Number.parseInt(
			formData.get('service_id')?.toString() || '',
		);
		const name = formData.get('name')?.toString();
		const info = formData.get('info')?.toString();
		const color = formData.get('color')?.toString();
		const spaceShortId = formData.get('space_short_id')?.toString();
		const fromTime = formData.get('from_time')?.toString() || '';
		const toTime = formData.get('to_time')?.toString() || '';
		const date = (formData.get('date')?.toString() || '').split('T')[0];
		const endDate = (formData.get('end_on_date')?.toString() || '').split(
			'T',
		)[0];

		const repeatPeriod = formData.get('repeat_period')?.toString();
		const week = getWeek(formData);
		const endNever = formData.get('end_never')?.toString() === 'on';

		const invalid = validate([
			{ value: [fromTime, toTime], key: 'time-range' },
			{ value: date, key: 'date' },
		]);
		if (repeatPeriod === EnumRepeatPeriod.WEEKLY && !week.length) {
			invalid.push(ErrorCodes.INVALID_BYDAY);
		}
		if (invalid.length) {
			throw doError(invalid.join(','));
		}

		const rrule = getRRule(formData);
		const timezone = getTZOffset(formData);
		const newEvent = await createEvent(branchId, {
			name,
			info,
			color,
			startAt: new Date(`${date}T${fromTime}${timezone}`),
			endAt:
				!!rrule && !endNever && endDate
					? new Date(`${endDate}T${toTime}${timezone}`)
					: undefined,
			duration: strTimeToMinutes(toTime) - strTimeToMinutes(fromTime),
			rrule,
			spaceShortId,
			serviceId: Number.isNaN(serviceId) ? undefined : serviceId,
		});

		if (!newEvent) throw doError(ErrorCodes.CREATE_FAILED);
		return {
			status: EnumResponse.SUCCESS,
			data: newEvent,
		};
	} catch (error: any) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
	}
}
