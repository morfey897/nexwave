import db from '@/lib/storage';
import { schemas, orm } from '@nw/storage';
import { TUID } from '@/types/common';
import { generateColor, generateName } from '@/utils';
import { EnumColor } from '@/enums';

type RRule = {
	freq?: string;
	interval?: number;
	byday?: string;
};

export interface IEvent extends TUID {
	createdAt: Date;
	branchId: number;
	name: string;
	info: string | null;
	color: string | null;
	startAt: Date;
	duration: number;
	rrule: RRule | null;
	spaceShortId: string | null;
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
		rrule?: RRule | null;
		spaceShortId?: string;
		serviceId?: number;
	},
): Promise<IEvent | null> {
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
			startAt: schemas.event.startAt,
			duration: schemas.event.duration,
			rrule: schemas.event.rrule,
			spaceShortId: schemas.event.spaceShortId,
			createdAt: schemas.event.createdAt,
			serviceId: schemas.event.serviceId,
		});

	return event;
}
