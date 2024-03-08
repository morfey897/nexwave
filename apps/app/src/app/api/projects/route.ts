import { getUserFromSession } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { getProjectsByUserId } from '@/models/project';
import { EnumResponse } from '@/enums';
import { doError, parseError } from '@/utils';
import * as ErrorCodes from '@/errorCodes';
import { getSession } from '@/nextRequest';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
	try {
		const user = await getUserFromSession(getSession(request));
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);

		const projects = await getProjectsByUserId(user.id);

		return NextResponse.json({ status: EnumResponse.SUCCESS, data: projects });
	} catch (error) {
		console.log('ERROR', error);
		return NextResponse.json({
			info: {
				request: request,
				session: getSession(request) || '__null__',
				cookies: request.cookies.getAll(),
				headersSession: cookies().getAll(),
			},
			status: EnumResponse.FAILED,
			error: parseError(error),
		});
	}
}
