export const dynamic = "force-dynamic";
export const revalidate = 0

import { getUserFromSession } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { getProjectsByUserId } from '@/models/project';
import { EnumResponse } from '@/enums';
import { doError, parseError } from '@/utils';
import * as ErrorCodes from '@/errorCodes';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
	try {
		// const all = cookies().getAll();
		const user = await getUserFromSession(cookies().get('nw_session')?.value);
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);

		const projects = await getProjectsByUserId(user.id);

		return NextResponse.json({ status: EnumResponse.SUCCESS, data: projects });
	} catch (error) {
		console.log('ERROR', error);
		return NextResponse.json({
			status: EnumResponse.FAILED,
			error: parseError(error),
		});
	}
}
