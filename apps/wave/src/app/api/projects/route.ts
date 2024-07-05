import { getUserFromSession } from '~/models/user';
import { NextResponse } from 'next/server';
import { getProjectsForUserId } from '~/models/project';
import { EnumResponseStatus } from '~/constants/enums';
import { parseError } from '~/utils';
import * as ErrorCodes from '~/constants/errorCodes';
import { getSession } from '~/utils/headers';
import * as Yup from 'yup';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
	try {
		const user = await getUserFromSession(getSession());
		if (!user) throw new Yup.ValidationError(ErrorCodes.USER_UNAUTHORIZED);

		const projects = await getProjectsForUserId(user.id);

		return NextResponse.json({
			status: EnumResponseStatus.SUCCESS,
			data: projects,
		});
	} catch (error) {
		console.log('ERROR', error);
		return NextResponse.json({
			status: EnumResponseStatus.FAILED,
			error: parseError(error),
		});
	}
}
