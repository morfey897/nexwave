import db from '~/lib/storage';
import { schemas, orm, IUser } from '@nw/storage';
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
): Promise<IUser | null> {
	if (!uuid || !isUUID(uuid)) return null;
	const user = await db.query.Users.findFirst({
		where: orm.eq(schemas.Users.uuid, uuid),
		columns: {
			id: true,
			uuid: true,
			login: true,
			name: true,
			gender: true,
			surname: true,
			avatar: true,
			bio: true,
			birthday: true,
			contacts: true,
			meta: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return user || null;
}

/**
 * Get current user from session
 * @param session
 * @returns {IUser | null}
 */
export async function getUserFromSession(
	session: string | null | undefined
): Promise<IUser | null> {
	if (process.env.SKIP_AUTHENTICATION === 'true') return MOCK_USER;
	if (!session) return null;
	let user: IUser | null = null;
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
	password: string;
}): Promise<IUser | null> {
	const user = await db.query.Users.findFirst({
		where: orm.and(
			orm.eq(schemas.Users.login, login),
			orm.eq(
				schemas.Users.password,
				orm.sql<string>`crypt(${password}, password)`
			)
		),
		columns: {
			id: true,
			uuid: true,
			login: true,
			name: true,
			gender: true,
			surname: true,
			avatar: true,
			bio: true,
			birthday: true,
			contacts: true,
			meta: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return user || null;
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
}): Promise<IUser | null> {
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
			uuid: schemas.Users.uuid,
		});

	if (!list || !list.length) return null;
	const user = await getUserByUUID(list[0].uuid);
	return user;
}

/**
 * Update user
 * @param param
 * @returns
 */
export async function updateUser(
	userUUID: string | undefined | null,
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
): Promise<IUser | null> {
	if (typeof userUUID !== 'string' || !isUUID(userUUID)) return null;

	await db
		.update(schemas.Users)
		.set({
			loginMetadata,
			...(name ? { name } : {}),
			...(surname ? { surname } : {}),
			...(avatar ? { avatar } : {}),
		})
		.where(orm.eq(schemas.Users.uuid, userUUID))
		.execute();

	const user = await getUserByUUID(userUUID);

	return user;
}
