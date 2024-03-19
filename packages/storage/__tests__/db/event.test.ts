import { describe, expect, test } from '@jest/globals';
import { schemas, orm } from '../../src';
import * as utils from '../../__utils__/utils';

let cfg: ReturnType<typeof utils.configDB>;

describe('event module', () => {
	beforeAll(() => {
		cfg = utils.configDB();
	});

	afterAll(() => {
		cfg.destroy();
	});

	describe('getEvents', () => {
		const branchId = 25;
		const from = new Date('2024-03-22T00:00:00.000Z');
		const to = new Date('2024-03-25T23:59:59.000Z');
		test('getEvents', async () => {
			const events = await cfg.db
				.select({
					id: schemas.event.id,
					startAt: schemas.event.startAt,
					endAt: schemas.event.endAt,
					rrule: schemas.event.rrule,
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
                )
							),
						),
					),
				);

			console.log('events:', events);
			expect(events).toBeTruthy();
		});
	});
});
