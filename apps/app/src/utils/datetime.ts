import toMS from 'ms';
import { previousMonday } from 'date-fns';

export const ms = (time: string | number) => toMS(time.toString());
export const sec = (time: string | number) => Math.ceil(ms(time) / 1000);

// '2023-11-21T08:10:39.898Z'
export const toIsoDate = (d: Date | string | number) => {
	if (typeof d !== 'string') {
		if (!(d instanceof Date)) {
			d = new Date(d);
		}
		d = d.toISOString();
	}
	return d.split('T')[0];
};

export const toTime = (d: Date | string | number) => {
	if (!(d instanceof Date)) {
		d = new Date(d);
	}
	const time = d.toISOString().split('T')[1];
	const [hh, mm, ss] = ((time || '').split('.')[0] || '').split(':');
	return {
		hh: parseInt(hh || '0', 10),
		mm: parseInt(mm || '0', 10),
		ss: parseInt(ss || '0', 10),
	};
};

export const timeToSeconds = (time: ReturnType<typeof toTime>) =>
	time.hh * 60 * 60 + time.mm * 60 + time.ss;

export const timeToMinutes = (time: ReturnType<typeof toTime>) =>
	time.hh * 60 + time.mm;

// const minutes = Math.floor(seconds / 60);
// const remainingSeconds = seconds % 60;
// const hours = Math.floor(minutes / 60);
// const remainingMinutes = minutes % 60;
export const ssToTime = (seconds: number) => ({
	hh: Math.floor(seconds / (60 * 60)),
	mm: Math.floor(seconds / 60) % 60,
	ss: seconds % 60,
});

export const mmToTime = (minutes: number) => ({
	hh: Math.floor(minutes / 60),
	mm: minutes % 60,
	ss: 0,
});

export const addTime = (
	d: Date | string | number | ReturnType<typeof toTime>,
	plus: ReturnType<typeof toTime>,
) => {
	let time =
		typeof d === 'string' || typeof d === 'number' || d instanceof Date
			? toTime(d)
			: d;
	const total = timeToSeconds(time) + timeToSeconds(plus);
	return ssToTime(total);
};

export const getFirstDayOfWeek = (d?: Date | string | number) => {
	if (!(d instanceof Date)) {
		d =
			typeof d === 'string' || typeof d === 'number' ? new Date(d) : new Date();
	}

	if (d.getDay() === 1) {
		return toIsoDate(d);
	}
	return toIsoDate(previousMonday(d));
};
