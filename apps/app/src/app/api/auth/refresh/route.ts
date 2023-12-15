import { NextRequest, NextResponse } from 'next/server';
import { decode, verify } from '@/lib/jwt';
import { cookies as cookiesConfig } from 'config';
import { ICurrentUser } from '@/types/user';
import { cookies } from 'next/headers';
import { sessionCookie } from '@/utils/cookies';

const refreshCookie = async (
	refresh_token: string,
	session: string,
): Promise<ICurrentUser | null> => {
	const refreshPayload = await verify<{ uuid: string }>(refresh_token);
	const sessionPayload = decode<{ user: ICurrentUser }>(session);
	if (
		!sessionPayload ||
		!refreshPayload ||
		sessionPayload?.user?.uuid !== refreshPayload?.uuid
	)
		return null;

	return sessionPayload?.user;
};

export async function GET(request: NextRequest) {
	const refresh_token =
		request.cookies.get(cookiesConfig.REFRESH_TOKEN)?.value ||
		request.headers.get('Authorization')?.replace('Bearer ', '') ||
		'';
	const session = request.cookies.get(cookiesConfig.SESSION)?.value || '';

	const user = await refreshCookie(refresh_token, session);
	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	cookies().set(sessionCookie(user));
	return NextResponse.json({ success: true }, { status: 200 });
}

// export async function POST(request: NextRequest) {
// 	const refresh_token =
// 		request.headers.get('Authorization')?.replace('Bearer ', '') || '';
// 	const session = (await request.text()) || '';

// 	const user = await refreshCookie(refresh_token, session);
// 	if (!user) {
// 		return NextResponse.json({ success: false });
// 	}

// 	try {
// 		await refreshCookie(refresh_token, session);
// 	} catch (e) {
// 		return NextResponse.json({ error: 'Unauthorized 1' }, { status: 401 });
// 	}

// 	return NextResponse.json({ success: true }, { status: 200 });
// }
