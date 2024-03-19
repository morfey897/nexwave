import db from '@/lib/storage';
import { schemas, orm } from '@nw/storage';
import { INode } from '@/types/calendar';
import { generateColor, generateName } from '@/utils';
import { EnumColor } from '@/enums';
import { isNumber, isValidDate } from '@/utils/validation';
import { EnumRepeatPeriod, EnumWeekDay } from '@/enums';
import { RRule, type Options, type Weekday } from 'rrule';
import { transformRRule } from '@/utils/rrule';

export type TRRule = {
	freq?: string;
	interval?: number;
	byday?: string;
};

export interface IEvent extends INode {
	createdAt: Date;
	branchId: number;
	name: string;
	info: string | null;
	color: string | null;
	date: Date;
	duration: number;
	// rrule: RRule | null;
	spaceShortId: string | null;
	serviceId: number | null;
	// TODO: add serviceId
}

/**
 * Create event
 * @param email - string
 * @param projectId - number
 * @param role - string
 */
export async function createEvent(
	branchId: number,
	value: {
		name?: string;
		info?: string;
		color?: string;
		startAt: Date | string;
		endAt?: Date | string;
		duration: number;
		rrule?: TRRule | null;
		spaceShortId?: string;
		serviceId?: number;
	},
): Promise<IEvent | null> {
	if (!isNumber(branchId) || !value?.duration) return null;
	const nameValue = value?.name || generateName();
	const colorValue =
		value?.color && Object.values(EnumColor).includes(value?.color as EnumColor)
			? (value?.color as EnumColor)
			: generateColor();

	const [event] = await db
		.insert(schemas.event)
		.values({
			branchId: branchId,
			name: nameValue,
			info: value?.info || null,
			color: colorValue,
			startAt:
				value.startAt instanceof Date ? value.startAt : new Date(value.startAt),
			endAt: !value.endAt
				? null
				: value.endAt instanceof Date
					? value.endAt
					: new Date(value.endAt),
			duration: value?.duration || 0,
			rrule: value?.rrule || null,
			spaceShortId: value?.spaceShortId || null,
			serviceId: value?.serviceId || null,
		})
		.returning({
			id: schemas.event.id,
			uuid: schemas.event.uuid,
			branchId: schemas.event.branchId,
			name: schemas.event.name,
			info: schemas.event.info,
			color: schemas.event.color,
			date: schemas.event.startAt,
			duration: schemas.event.duration,
			// rrule: schemas.event.rrule,
			spaceShortId: schemas.event.spaceShortId,
			createdAt: schemas.event.createdAt,
			serviceId: schemas.event.serviceId,
		});

	return event;
}

/**
 * Get events
 * @param branchId - number
 * @param from - Date
 * @param to - Date
 * @returns Promise<IEvent[]>
 */
export async function getEvents({
	branchId,
	from,
	to,
}: {
	branchId: number;
	from: Date;
	to: Date;
}): Promise<IEvent[] | null> {
	if (!isNumber(branchId) || !isValidDate(from) || !isValidDate(to))
		return null;
	const result = await db
		.select({
			id: schemas.event.id,
			uuid: schemas.event.uuid,
			createdAt: schemas.event.createdAt,
			branchId: schemas.event.branchId,
			name: schemas.event.name,
			info: schemas.event.info,
			color: schemas.event.color,
			duration: schemas.event.duration,
			spaceShortId: schemas.event.spaceShortId,
			serviceId: schemas.event.serviceId,
			_startAt: schemas.event.startAt,
			_endAt: schemas.event.endAt,
			_rrule: schemas.event.rrule,
		})
		.from(schemas.event)
		.where(
			orm.and(
				orm.eq(schemas.event.branchId, branchId),
				orm.or(
					orm.and(
						orm.isNull(schemas.event.rrule),
						orm.gte(schemas.event.startAt, from),
						orm.lte(schemas.event.startAt, to),
					),
					orm.and(
						orm.isNotNull(schemas.event.rrule),
						orm.lte(schemas.event.startAt, to),
						orm.or(
							orm.gte(schemas.event.endAt, from),
							orm.isNull(schemas.event.endAt),
						),
					),
				),
			),
		);

	const events: IEvent[] = [];
	result.forEach((event) => {
		const { _startAt, _endAt, _rrule, ...rest } = event;
		const rruleOptions = transformRRule(_rrule);
		if (rruleOptions) {
			const rrule = new RRule({
				...rruleOptions,
				dtstart: _startAt,
				until: _endAt,
			});
			const dates = rrule.between(from, to);
			dates.forEach((date, index) => {
				events.push({
					...rest,
					name: `${event.name} (#${index + 1})`,
					date,
				});
			});
		} else {
			events.push({
				...rest,
				date: _startAt,
			});
		}
	});
	return events;
}
