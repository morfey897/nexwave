import { COOKIES } from '@nw/config';
import { signAuth } from '~lib/jwt';

export const sessionCookie = (user: { uuid: string } | null) => ({
	name: COOKIES.SESSION,
	value: user
		? signAuth({ user }, process.env.NEXT_PRIVATE_JWT_EXPIRES_IN! || '1h')
		: '',
	maxAge: user ? undefined : -1,
	...(user ? { httpOnly: true, secure: true } : {}),
});

export const refreshCookie = (user: { uuid: string } | null) => ({
	name: COOKIES.REFRESH_TOKEN,
	value: user
		? signAuth(
				{ uuid: user.uuid },
				process.env.NEXT_PRIVATE_JWT_REFRESH_EXPIRES_IN! || '7d'
			)
		: '',
	maxAge: user ? undefined : -1,
	...(user ? { httpOnly: true, secure: true } : {}),
});

export const trailCookie = (value: string | null) => ({
	name: COOKIES.TRAIL,
	value: value || '',
	maxAge: value ? undefined : -1,
	...(value ? { httpOnly: true, secure: true } : {}),
});
