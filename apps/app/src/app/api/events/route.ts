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
		const branchId = request.nextUrl.searchParams.get('branchId');

		const fromDate = new Date(toIsoDate(from || new Date()));
		const toDate = new Date(toIsoDate(to || new Date()));

		const events = await getEvents({
			branchId: Number.parseInt(branchId || ''),
			from: fromDate,
			to: toDate,
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
