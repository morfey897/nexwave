import mockEvents from '../../../../__mock__/timetable.json';

import { getUserFromSession } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { getProjectsByUserId, hasProjectAccess } from '@/models/project';
import { EnumResponse } from '@/enums';
import { doError, parseError } from '@/utils';
import * as ErrorCodes from '@/errorCodes';
import { UPDATE, READ } from '@/crud';
import { IEvent } from '@/types/event';
import { addDays } from 'date-fns';
import { toIsoDate } from '@/utils/datetime';

const EVENTS: IEvent[] = (mockEvents as unknown as IEvent[]).map((event) => ({
	...event,
	date:
		toIsoDate(addDays(new Date(), Math.round(Math.random() * 18) - 6)) +
		'T' +
		event.date.split('T')[1],
}));

export async function GET(request: NextRequest) {
	try {
		const user = await getUserFromSession(request);
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
		const projectId = Number.parseInt(request.nextUrl.searchParams.get('projectId') || '');

		const access = await hasProjectAccess(READ.EVENT, {
			userId: user.id,
			projectId: projectId,
		});

		if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

		// TODO: Implement hasProjectAccess
		// const access = await hasProjectAccess(UPDATE.PROJECT, {
		// 	userId: user.id,
		// 	projectId: projectId ? Number.parseInt(projectId) : undefined,
		// });

		// const projects = await getProjectsByUserId(user.id);

		const from = request.nextUrl.searchParams.get('from');
		const to = request.nextUrl.searchParams.get('to');
		const branch = request.nextUrl.searchParams.get('branch');

		const fromDate = new Date(toIsoDate(from || new Date()));
		const toDate = new Date(toIsoDate(to || new Date()));

		// console.log(
		// 	'GETTING EVENTS',
		// 	[...EVENTS]
		// 		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		// 		.map((event) => event.date),
		// );
		const events = EVENTS.filter((event) => {
			const isoDate = new Date(toIsoDate(event.date));
			if (isoDate < fromDate) return false;
			if (isoDate > toDate) return false;
			return true;
		});

		return NextResponse.json({ status: EnumResponse.SUCCESS, data: events });
	} catch (error) {
		console.log('ERROR', error);
		return NextResponse.json({
			status: EnumResponse.FAILED,
			error: parseError(error),
		});
	}
}
