// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// import { getUserFromSession } from '@/models/user';
// import { NextRequest, NextResponse } from 'next/server';
// import { hasProjectAccess, isBranchOfProject } from '@/models/project';
// import { getEvents } from '@/models/event';
// import { EnumResponse } from '@/enums';
// import { doError, parseError } from '@/utils';
// import * as ErrorCodes from '@/errorCodes';
// import { READ } from '@/crud';
// import { toIsoDate } from '@/utils/datetime';
// import { getSession } from '@/headers';
// import { getString, getNumber } from '@/utils/request';
// import { isNumber } from '@/utils/validation';

// export async function GET(request: NextRequest) {
// 	const { searchParams } = request.nextUrl;
// 	try {
// 		const user = await getUserFromSession(getSession());
// 		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
// 		const projectId = getNumber(searchParams, 'project_id');
// 		if (!isNumber(projectId)) throw doError(ErrorCodes.READ_FAILED);

// 		const access = await hasProjectAccess(READ.EVENT, {
// 			userId: user.id,
// 			projectId: projectId,
// 		});

// 		if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

// 		const branchId = getNumber(searchParams, 'branch_id');
// 		if (!isNumber(branchId) || !(await isBranchOfProject(branchId, projectId)))
// 			throw doError(ErrorCodes.ACCESS_DENIED);

// 		const fromDate = new Date(toIsoDate(getString(searchParams, 'from') || new Date()));
// 		const toDate = new Date(toIsoDate(getString(searchParams, 'to') || new Date()));

// 		const events = await getEvents({
// 			branchId: branchId,
// 			from: fromDate,
// 			to: toDate,
// 		});

// 		return NextResponse.json({ status: EnumResponse.SUCCESS, data: events });
// 	} catch (error) {
// 		console.log('ERROR', error);
// 		return NextResponse.json({
// 			status: EnumResponse.FAILED,
// 			error: parseError(error),
// 		});
// 	}
// }
