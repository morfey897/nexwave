import { describe, expect, test } from '@jest/globals';
import { RRule } from 'rrule';

describe('event model', () => {
	test('rrule ', () => {
		const rule = new RRule({
			freq: RRule.WEEKLY,
			interval: 1,
			byweekday: ['MO', 'WE', 'SA'],
			// dtstart: new Date('2024-03-18T09:11:00.000Z'),
			// until: new Date('2024-03-31T13:11:00.000Z'),
		});

		const dates = rule.between(new Date('2024-03-18T09:11:00.000Z'), new Date('2024-03-25T13:11:00.000Z'));

		// const dates = rule.all();

		console.log(dates);
		expect(dates).toBeTruthy();
	});
});
