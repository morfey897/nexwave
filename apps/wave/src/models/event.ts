// import db from '@/lib/storage';
// import { schemas, orm } from '@nw/storage';
// import { INode } from '@/types/calendar';
// import { generateColor, generateName } from '@/utils';
// import { EnumColor } from '@/enums';
// import { isNumber, isValidDate } from '@/utils/validation';
// import { RRule } from 'rrule';
// import { transformRRule } from '@/utils/rrule';

// export type TRRule = {
// 	freq?: string;
// 	interval?: number;
// 	byday?: string;
// };

// export interface IEvent extends INode {
// 	createdAt: Date;
// 	branchId: number;
// 	name: string;
// 	info: string | null;
// 	color: string | null;
// 	date: Date;
// 	duration: number;
// 	// rrule: RRule | null;
// 	spaceShortId: string | null;
// 	serviceId: number | null;
// 	// TODO: add serviceId
// }

// /**
//  * Create event
//  * @param email - string
//  * @param projectId - number
//  * @param role - string
//  */
// export async function createEvent(
// 	branchId: number,
// 	value: {
// 		name?: string;
// 		info?: string;
// 		color?: string;
// 		startAt: Date | string;
// 		endAt?: Date | string;
// 		duration: number;
// 		rrule?: TRRule | null;
// 		spaceShortId?: string;
// 		serviceId?: number;
// 	}
// ): Promise<IEvent | null> {
// 	if (!isNumber(branchId) || !value?.duration) return null;
// 	const nameValue = value?.name || generateName();
// 	const colorValue =
// 		value?.color && Object.values(EnumColor).includes(value?.color as EnumColor)
// 			? (value?.color as EnumColor)
// 			: generateColor();

// 	const [event] = await db
// 		.insert(schemas.slot)
// 		.values({
// 			branchId: branchId,
// 			name: nameValue,
// 			info: value?.info || null,
// 			color: colorValue,
// 			startAt:
// 				value.startAt instanceof Date ? value.startAt : new Date(value.startAt),
// 			endAt: !value.endAt
// 				? null
// 				: value.endAt instanceof Date
// 					? value.endAt
// 					: new Date(value.endAt),
// 			duration: value?.duration || 0,
// 			rrule: value?.rrule || null,
// 			spaceShortId: value?.spaceShortId || null,
// 			serviceId: value?.serviceId || null,
// 		})
// 		.returning({
// 			id: schemas.slot.id,
// 			uuid: schemas.slot.uuid,
// 			branchId: schemas.slot.branchId,
// 			name: schemas.slot.name,
// 			info: schemas.slot.info,
// 			color: schemas.slot.color,
// 			date: schemas.slot.startAt,
// 			duration: schemas.slot.duration,
// 			// rrule: schemas.event.rrule,
// 			spaceShortId: schemas.slot.spaceShortId,
// 			createdAt: schemas.slot.createdAt,
// 			serviceId: schemas.slot.serviceId,
// 		});

// 	return event;
// }

// /**
//  * Get events
//  * @param branchId - number
//  * @param from - Date
//  * @param to - Date
//  * @returns Promise<IEvent[]>
//  */
// export async function getEvents({
// 	branchId,
// 	from,
// 	to,
// }: {
// 	branchId: number;
// 	from: Date;
// 	to: Date;
// }): Promise<IEvent[] | null> {
// 	if (!isNumber(branchId) || !isValidDate(from) || !isValidDate(to))
// 		return null;
// 	const result = await db
// 		.select({
// 			id: schemas.slot.id,
// 			uuid: schemas.slot.uuid,
// 			createdAt: schemas.slot.createdAt,
// 			branchId: schemas.slot.branchId,
// 			name: schemas.slot.name,
// 			info: schemas.slot.info,
// 			color: schemas.slot.color,
// 			duration: schemas.slot.duration,
// 			spaceShortId: schemas.slot.spaceShortId,
// 			serviceId: schemas.slot.serviceId,
// 			_startAt: schemas.slot.startAt,
// 			_endAt: schemas.slot.endAt,
// 			_rrule: schemas.slot.rrule,
// 		})
// 		.from(schemas.slot)
// 		.where(
// 			orm.and(
// 				orm.eq(schemas.slot.branchId, branchId),
// 				orm.or(
// 					orm.and(
// 						orm.isNull(schemas.slot.rrule),
// 						orm.gte(schemas.slot.startAt, from),
// 						orm.lte(schemas.slot.startAt, to)
// 					),
// 					orm.and(
// 						orm.isNotNull(schemas.slot.rrule),
// 						orm.lte(schemas.slot.startAt, to),
// 						orm.or(
// 							orm.gte(schemas.slot.endAt, from),
// 							orm.isNull(schemas.slot.endAt)
// 						)
// 					)
// 				)
// 			)
// 		);

// 	const events: IEvent[] = [];
// 	result.forEach((event) => {
// 		const { _startAt, _endAt, _rrule, ...rest } = event;
// 		const rruleOptions = transformRRule(_rrule);
// 		if (rruleOptions) {
// 			const rrule = new RRule({
// 				...rruleOptions,
// 				dtstart: _startAt,
// 				until: _endAt,
// 			});
// 			const dates = rrule.between(from, to);
// 			dates.forEach((date, index) => {
// 				events.push({
// 					...rest,
// 					name: `${event.name} (#${index + 1})`,
// 					date,
// 				});
// 			});
// 		} else {
// 			events.push({
// 				...rest,
// 				date: _startAt,
// 			});
// 		}
// 	});
// 	return events;
// }
