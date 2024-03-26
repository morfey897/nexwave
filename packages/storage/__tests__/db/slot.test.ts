import { describe, expect, test } from '@jest/globals';
import { schemas, orm } from '../../src';
import * as utils from '../../__utils__/utils';

let cfg: ReturnType<typeof utils.configDB>;

describe('slot module', () => {
	beforeAll(() => {
		cfg = utils.configDB();
	});

	afterAll(() => {
		cfg.destroy();
	});

	describe('getSlots', () => {
		const branchId = 25;
		const from = new Date('2024-03-22T00:00:00.000Z');
		const to = new Date('2024-03-25T23:59:59.000Z');
		test('getSlots', async () => {
			const slots = await cfg.db
				.select({
					id: schemas.slot.id,
					startAt: schemas.slot.startAt,
					endAt: schemas.slot.endAt,
					rrule: schemas.slot.rrule,
				})
				.from(schemas.slot)
				.where(
					orm.and(
						orm.eq(schemas.slot.branchId, branchId),
						orm.or(
							orm.and(
                orm.isNull(schemas.slot.rrule),
								orm.gte(schemas.slot.startAt, from),
								orm.lte(schemas.slot.startAt, to),
							),
							orm.and(
                orm.isNotNull(schemas.slot.rrule),
								orm.lte(schemas.slot.startAt, to),
                orm.or(
                  orm.gte(schemas.slot.endAt, from),
                  orm.isNull(schemas.slot.endAt),
                )
							),
						),
					),
				);

			console.log('events:', slots);
			expect(slots).toBeTruthy();
		});
	});
});
