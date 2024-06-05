'use server';
import { hasProjectAccess, isBranchOfProject } from '@/models/project';
import {
	createEvent,
	getEvents,
	type IEvent,
	type TRRule,
} from '@/models/event';
import { getUserFromSession } from '@/models/user';
import * as ErrorCodes from '@/errorCodes';
import { CREATE, READ } from '@/crud';
import { EnumResponse, EnumRepeatPeriod, WEEK_DAYS } from '@/enums';
import { parseError, doError, addZiro } from '@/utils';
import { mmToTime, timeToTime } from '@/utils/datetime';
import { strTimeToMinutes } from '@/utils/datetime';
import { IResponse } from '@/types';
import { isNumber, validate } from '@/utils/validation';
import { getSession } from '@/headers';
import { toIsoDate } from '@/utils/datetime';
import { getBoolean, getNumber, getString } from '@/utils/request';

const getWeek = (formData: FormData) =>
	WEEK_DAYS.filter((day) => formData.get(day)?.toString() === 'on');

const getRRule = (formData: FormData) => {
	const isRRule = formData.get('rrule')?.toString() === 'on';
	const repeatInterval = formData.get('repeat_interval')?.toString();
	const repeatPeriod = formData.get('repeat_period')?.toString();

	let rrule: TRRule | null = null;
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
		const time = mmToTime(Math.abs(tzOffset));
		timezone = `${tzOffset < 0 ? '+' : '-'}${timeToTime(time)}`;
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

		const projectId = getNumber(formData, 'id');
		if (!isNumber(projectId)) throw doError(ErrorCodes.CREATE_FAILED);
		const access = await hasProjectAccess(CREATE.EVENT, {
			userId: user.id,
			projectId,
		});

		if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

		const branchId = getNumber(formData, 'branch_id');
		if (!isNumber(branchId)) throw doError(ErrorCodes.CREATE_FAILED);
		if (!(await isBranchOfProject(branchId, projectId)))
			throw doError(ErrorCodes.ACCESS_DENIED);

		const serviceId = getNumber(formData, 'service_id');
		const name = getString(formData, 'name');
		const info = getString(formData, 'info');
		const color = getString(formData, 'color');
		const spaceShortId = getString(formData, 'space_short_id');
		const fromTime = getString(formData, 'from_time', '');
		const toTime = getString(formData, 'to_time', '');
		const date = getString(formData, 'date', '').split('T')[0];
		const endDate = getString(formData, 'end_on_date', '').split('T')[0];

		const repeatPeriod = getString(formData, 'repeat_period');
		const week = getWeek(formData);
		const endNever = getBoolean(formData, 'end_never');

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
			serviceId: isNumber(serviceId) ? undefined : serviceId,
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

/**
 * Get events
 * @returns IResponse
 */
export async function actionGetEvents(formData: FormData) {
	try {
		const user = await getUserFromSession(getSession());
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);

		const projectId = getNumber(formData, 'id');
		if (!isNumber(projectId)) throw doError(ErrorCodes.READ_FAILED);
		const access = await hasProjectAccess(READ.EVENT, {
			userId: user.id,
			projectId,
		});

		if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

		const branchId = getNumber(formData, 'branch_id');
		if (!isNumber(branchId) || !(await isBranchOfProject(branchId, projectId)))
			throw doError(ErrorCodes.ACCESS_DENIED);

		const fromDate = new Date(
			toIsoDate(getString(formData, 'from') || new Date()),
		);
		const toDate = new Date(toIsoDate(getString(formData, 'to') || new Date()));

		const events = await getEvents({
			branchId,
			from: fromDate,
			to: toDate,
		});

		return {
			status: EnumResponse.SUCCESS,
			data: events,
		};
	} catch (error: any) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
	}
}
