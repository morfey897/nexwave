import { EnumRepeatPeriod, EnumWeekDay } from '~/constants/enums';
import { RRule, type Options, type Weekday } from 'rrule';

export const transformRRule = (
	rrule: {
		freq?: string;
		interval?: number;
		byday?: string;
	} | null
): Partial<Options> | null => {
	if (!rrule) return null;
	switch (rrule.freq) {
		case EnumRepeatPeriod.WEEKLY:
			return {
				freq: RRule.WEEKLY,
				interval: rrule.interval || 1,
				byweekday: (rrule.byday?.split(',') || [])
					.map((day) => {
						switch (day) {
							case EnumWeekDay.MONDAY:
								return RRule.MO;
							case EnumWeekDay.TUESDAY:
								return RRule.TU;
							case EnumWeekDay.WEDNESDAY:
								return RRule.WE;
							case EnumWeekDay.THURSDAY:
								return RRule.TH;
							case EnumWeekDay.FRIDAY:
								return RRule.FR;
							case EnumWeekDay.SATURDAY:
								return RRule.SA;
							case EnumWeekDay.SUNDAY:
								return RRule.SU;
							default:
								return null;
						}
					})
					.filter((day) => day !== null) as Weekday[],
			};
		case EnumRepeatPeriod.MONTHLY:
			return {
				freq: RRule.MONTHLY,
				interval: rrule.interval || 1,
			};
		case EnumRepeatPeriod.YEARLY:
			return {
				freq: RRule.YEARLY,
				interval: rrule.interval || 1,
			};
	}
	return null;
};
