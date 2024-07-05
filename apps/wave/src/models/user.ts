import db from '~/lib/storage';
import { schemas, orm } from '@nw/storage';
import { ICurrentUser } from '~/types';
import { verifyUser } from '~/utils/cookies';
import { isLogin, isUUID } from '~/utils/validation';
import { MOCK_USER } from '~/__mock__/user';

/**
 * Get user by UUID
 * @param uuid
 * @returns
 */
async function getUserByUUID(
	uuid: string | undefined | null
): Promise<ICurrentUser | null> {
	if (!uuid || !isUUID(uuid)) return null;
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
		.where(orm.eq(schemas.Users.uuid, uuid))
		.limit(1);

	return list && list.length ? list[0] : null;
}

/**
 * Get current user from session
 * @param session
 * @returns {ICurrentUser | null}
 */
export async function getUserFromSession(
	session: string | null | undefined
): Promise<ICurrentUser | null> {
	if (process.env.SKIP_AUTHENTICATION === 'true') return MOCK_USER;
	if (!session) return null;
	let user: ICurrentUser | null = null;
	try {
		const payload = await verifyUser(session);
		user = await getUserByUUID(payload?.uuid);
	} catch (error) {
		/* empty */
		user = null;
	}
	return user;
}

/**
 * Get user by login and password
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
export async function createUser({
	login,
	password,
	name,
	avatar,
	surname,
}: {
	login: string;
	password: string | null;
	name?: string;
	avatar?: string;
	surname?: string;
}): Promise<ICurrentUser | null> {
	if (!isLogin(login) || !password) return null;
	const list = await db
		.insert(schemas.Users)
		.values({
			login,
			name: name || null,
			surname: surname || null,
			avatar: avatar || null,
			password: password
				? orm.sql<string>`crypt(${password}, gen_salt('bf'))`
				: null,
		})
		.returning({
			id: schemas.Users.id,
			uuid: schemas.Users.uuid,
			login: schemas.Users.login,
			name: schemas.Users.name,
			surname: schemas.Users.surname,
			avatar: schemas.Users.avatar,
		});

	const user: ICurrentUser | null = list && list.length ? list[0] : null;
	return user;
}

/**
 * Update user
 * @param param
 * @returns
 */
export async function updateUser(
	userId: number,
	{
		name,
		avatar,
		surname,
		loginMetadata,
	}: {
		name?: string;
		avatar?: string;
		surname?: string;
		loginMetadata: {
			method?: string;
			device: string;
			ip: string;
			timestamp: number;
		};
	}
): Promise<ICurrentUser | null> {
	if (!userId) return null;

	const list = await db
		.update(schemas.Users)
		.set({
			loginMetadata,
			...(name ? { name } : {}),
			...(surname ? { surname } : {}),
			...(avatar ? { avatar } : {}),
		})
		.where(orm.eq(schemas.Users.id, userId))
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
