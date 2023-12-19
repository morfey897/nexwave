import { ICurrentUser } from '@/models/user';
import { cookies as cookiesConfig } from 'config';
import { sign } from '@/lib/jwt';

export const sessionCookie = (user: ICurrentUser | null) => ({
	name: cookiesConfig.SESSION,
	value: user
		? sign({ user }, process.env.NEXT_PRIVATE_JWT_EXPIRES_IN! || '1h')
		: '',
	maxAge: user ? undefined : -1,
	...(user ? { httpOnly: true, secure: true } : {}),
});

export const refreshCookie = (user: ICurrentUser | null) => ({
	name: cookiesConfig.REFRESH_TOKEN,
	value: user
		? sign(
				{ uuid: user.uuid },
				process.env.NEXT_PRIVATE_JWT_REFRESH_EXPIRES_IN! || '7d',
		  )
		: '',
	maxAge: user ? undefined : -1,
	...(user ? { httpOnly: true, secure: true } : {}),
});

export const trailCookie = (value: string | null) => ({
	name: cookiesConfig.TRAIL,
	value: value || '',
	maxAge: value ? undefined : -1,
	...(value ? { httpOnly: true, secure: true } : {}),
});
