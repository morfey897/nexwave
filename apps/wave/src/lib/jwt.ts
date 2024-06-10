import jwt from 'jsonwebtoken';
import { sec } from '~utils/datetime';

export function sign<T extends object>(payload: T, expiresIn: string) {
	return _sign(payload, sec(expiresIn), process.env.NEXT_PRIVATE_SIGN_SECRET!);
}

export function verify<T extends object>(token: string) {
	return _verify(token, process.env.NEXT_PRIVATE_SIGN_SECRET!);
}

export function signAuth<T extends object>(payload: T, expiresIn: string) {
	return _sign(payload, sec(expiresIn), process.env.NEXT_PRIVATE_JWT_SECRET!);
}

export function verifyAuth<T extends object>(token: string) {
	return _verify<T>(token, process.env.NEXT_PRIVATE_JWT_SECRET!);
}

export function decode<T extends object>(token: string) {
	return jwt.decode(token, { complete: false }) as T;
}

function _sign(payload: any, expiresIn: number, secret: string) {
	return jwt.sign(payload, secret, {
		expiresIn: expiresIn,
		algorithm: 'HS256',
	});
}

async function _verify<T extends object>(token: string, secret: string) {
	return new Promise<T | null>((resolve) => {
		jwt.verify(
			token,
			secret,
			{
				algorithms: ['HS256'],
			},
			(err, decoded) => {
				if (err) {
					resolve(null);
				}
				resolve(decoded as T);
			}
		);
	});
}
