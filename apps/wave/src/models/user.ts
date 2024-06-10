import db from '~lib/storage';
import { schemas, orm } from '@nw/storage';
import { TUID } from '~types';
import { verifyAuth } from '~lib/jwt';
import { isEmail, isPhone, isUUID } from '~utils/validation';

export interface ICurrentUser extends TUID {
	login: string;
	name?: string | null;
	surname?: string | null;
	avatar?: string | null;
}

/**
 * Get current user from session
 * @param session
 * @returns {ICurrentUser | null}
 */
export async function getUserFromSession(
	session: string | null | undefined
): Promise<ICurrentUser | null> {
	let user: ICurrentUser | null = null;

	try {
		if (!session) throw new Error('Invalid session');

		const payload = await verifyAuth<{ user: ICurrentUser }>(session);
		user = payload?.user || null;
		const isValidUser = !!user && !!user.id && !!user.uuid && !!user.login;
		if (!isValidUser || user === null) throw new Error('Invalid user');
	} catch (error) {
		user = null;
	}
	return user;
}

/**
 * Find user by unique params
 * @param param
 * @returns
 */
// export async function findUserByParams({
// 	email,
// 	uuid,
// 	id,
// }: {
// 	email?: string;
// 	uuid?: string;
// 	id?: number;
// }): Promise<ICurrentUser | null> {
// 	const where = email
// 		? orm.eq(schemas.Users.login, email)
// 		: uuid
// 			? orm.eq(schemas.user.uuid, uuid)
// 			: id
// 				? orm.eq(schemas.user.id, id)
// 				: null;

// 	if (!where) return null;

// 	const list = await db
// 		.select({
// 			id: schemas.user.id,
// 			uuid: schemas.user.uuid,
// 			email: schemas.user.email,
// 			emailVerified: schemas.user.emailVerified,
// 			name: schemas.user.name,
// 			surname: schemas.user.surname,
// 			avatar: schemas.user.avatar,
// 		})
// 		.from(schemas.user)
// 		.where(where)
// 		.limit(1);

// 	return list && list.length ? list[0] : null;
// }

/**
 * Get user by email and password
 * @param param
 * @returns
 */
export async function getUser({
	login,
	password,
}: {
	login: string;
	password: string | null;
}): Promise<ICurrentUser | null> {
	const where =
		password === null
			? orm.eq(schemas.Users.login, login)
			: orm.and(
					orm.eq(schemas.Users.login, login),
					orm.eq(
						schemas.Users.password,
						orm.sql<string>`crypt(${password}, password)`
					)
				);

	const list = await db
		.select({
			id: schemas.Users.id,
			uuid: schemas.Users.uuid,
			login: schemas.Users.login,
			name: schemas.Users.name,
			surname: schemas.Users.surname,
			avatar: schemas.Users.avatar,
		})
		.from(schemas.Users)
		.where(where)
		.limit(1);

	return list && list.length ? list[0] : null;
}

/**
 * Create a new user
 * @param param
 * @returns
 */
// export async function createUser({
// 	email,
// 	emailVerified,
// 	password,
// 	name,
// 	avatar,
// 	surname,
// }: {
// 	email: string;
// 	emailVerified: boolean;
// 	password: string | null;
// 	name?: string;
// 	avatar?: string;
// 	surname?: string;
// }): Promise<ICurrentUser | null> {
// 	if (!isEmail(email) || !password) return null;
// 	const list = await db
// 		.insert(schemas.user)
// 		.values({
// 			email: email,
// 			emailVerified: emailVerified,
// 			name: name || null,
// 			surname: surname || null,
// 			avatar: avatar || null,
// 			password: password
// 				? orm.sql<string>`crypt(${password}, gen_salt('bf'))`
// 				: null,
// 		})
// 		.returning({
// 			id: schemas.user.id,
// 			uuid: schemas.user.uuid,
// 			email: schemas.user.email,
// 			emailVerified: schemas.user.emailVerified,
// 			name: schemas.user.name,
// 			surname: schemas.user.surname,
// 			avatar: schemas.user.avatar,
// 		});

// 	const user: ICurrentUser | null = list && list.length ? list[0] : null;
// 	return user;
// }

/**
 * Update user
 * @param param
 * @returns
 */
export async function updateUser(
	uuid: string,
	{
		name,
		avatar,
		surname,
		lastLoginAt,
	}: {
		name?: string;
		avatar?: string;
		surname?: string;
		lastLoginAt?: Date;
	}
): Promise<ICurrentUser | null> {
	if (!isUUID(uuid)) return null;
	const list = await db
		.update(schemas.Users)
		.set({
			...(name ? { name } : {}),
			...(surname ? { surname } : {}),
			...(avatar ? { avatar } : {}),
			...(lastLoginAt ? { lastLoginAt } : {}),
		})
		.where(orm.eq(schemas.Users.uuid, uuid))
		.returning({
			id: schemas.Users.id,
			uuid: schemas.Users.uuid,
			login: schemas.Users.login,
			name: schemas.Users.name,
			surname: schemas.Users.surname,
			avatar: schemas.Users.avatar,
		});

	return list && list.length ? list[0] : null;
}
