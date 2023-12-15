import jwt from 'jsonwebtoken';
import { sec } from '@/utils/datetime';

export function sign<T extends object>(payload: T, expiresIn: string) {
	return jwt.sign(payload, process.env.NEXT_PRIVATE_JWT_SECRET!, {
		expiresIn: sec(expiresIn),
		algorithm: 'HS256',
	});
}

export async function verify<T extends object>(token: string) {
	return new Promise<T | null>((resolve) => {
		jwt.verify(
			token,
			process.env.NEXT_PRIVATE_JWT_SECRET!,
			{
				algorithms: ['HS256'],
			},
			(err, decoded) => {
				if (err) {
					resolve(null);
				}
				resolve(decoded as T);
			},
		);
	});
}

export function decode<T extends object>(token: string) {
	return jwt.decode(token, { complete: false }) as T;
}
