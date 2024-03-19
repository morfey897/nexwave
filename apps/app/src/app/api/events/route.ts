export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserFromSession } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { hasProjectAccess } from '@/models/project';
import { getEvents } from '@/models/event';
import { EnumResponse } from '@/enums';
import { doError, parseError } from '@/utils';
import * as ErrorCodes from '@/errorCodes';
import { READ } from '@/crud';
import { toIsoDate } from '@/utils/datetime';
import { getSession } from '@/headers';

export async function GET(request: NextRequest) {
	try {
		const user = await getUserFromSession(getSession());
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
		const projectId = Number.parseInt(
			request.nextUrl.searchParams.get('projectId') || '',
		);

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
		const events = await getEvents({
			branchId: Number.parseInt(branch || ''),
			from: fromDate,
			to: toDate,
		});

		// console.log('EVENTS', events, fromDate, toDate, branch);

		// EVENTS.filter((event) => {
		// 	const isoDate = new Date(toIsoDate(event.date));
		// 	if (isoDate < fromDate) return false;
		// 	if (isoDate > toDate) return false;
		// 	return true;
		// });

		return NextResponse.json({ status: EnumResponse.SUCCESS, data: events });
	} catch (error) {
		console.log('ERROR', error);
		return NextResponse.json({
			status: EnumResponse.FAILED,
			error: parseError(error),
		});
	}
}
