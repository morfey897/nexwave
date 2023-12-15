import db, { schemas, orm } from '@/lib/storage';
import { ICurrentUser } from '@/types/user';

/**
 * Find user by unique params
 * @param param
 * @returns
 */
export async function findUserByParams({
	email,
	uuid,
	id,
}: {
	email?: string;
	uuid?: string;
	id?: number;
}): Promise<ICurrentUser | null> {
	const where = email
		? orm.eq(schemas.user.email, email)
		: uuid
		? orm.eq(schemas.user.uuid, uuid)
		: id
		? orm.eq(schemas.user.id, id)
		: null;

	if (!where) return null;

	const list = await db
		.select({
			id: schemas.user.id,
			uuid: schemas.user.uuid,
			email: schemas.user.email,
			email_verified: schemas.user.email_verified,
			name: schemas.user.name,
			surname: schemas.user.surname,
			avatar: schemas.user.avatar,
		})
		.from(schemas.user)
		.where(where)
		.limit(1);

	return list && list.length ? list[0] : null;
}

/**
 * Get user by email and password
 * @param param
 * @returns
 */
export async function getUser({
	email,
	password,
}: {
	email: string;
	password: string | null;
}): Promise<ICurrentUser | null> {
	const where =
		password === null
			? orm.eq(schemas.user.email, email)
			: orm.and(
					orm.eq(schemas.user.email, email),
					orm.eq(
						schemas.user.password,
						orm.sql<string>`crypt(${password}, password)`,
					),
			  );

	const list = await db
		.select({
			id: schemas.user.id,
			uuid: schemas.user.uuid,
			email: schemas.user.email,
			email_verified: schemas.user.email_verified,
			name: schemas.user.name,
			surname: schemas.user.surname,
			avatar: schemas.user.avatar,
		})
		.from(schemas.user)
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
	email,
	email_verified,
	password,
	name,
	avatar,
	surname,
}: {
	email: string;
	email_verified: boolean;
	password: string | null;
	name?: string;
	avatar?: string;
	surname?: string;
}): Promise<ICurrentUser | null> {
	const list = await db
		.insert(schemas.user)
		.values({
			email: email,
			email_verified: email_verified,
			...(password === null
				? {}
				: { password: orm.sql<string>`crypt(${password}, gen_salt('bf'))` }),
			...(name ? { name } : {}),
			...(surname ? { surname } : {}),
			...(avatar ? { avatar } : {}),
		})
		.returning({
			id: schemas.user.id,
			uuid: schemas.user.uuid,
			email: schemas.user.email,
			email_verified: schemas.user.email_verified,
			name: schemas.user.name,
			surname: schemas.user.surname,
			avatar: schemas.user.avatar,
		});

	return list && list.length ? list[0] : null;
}

/**
 * Update user
 * @param param
 * @returns
 */
export async function updateUser(
	uuid: string,
	{
		email_verified,
		name,
		avatar,
		surname,
		last_login_at,
	}: {
		email_verified?: boolean;
		name?: string;
		avatar?: string;
		surname?: string;
		last_login_at?: Date;
	},
): Promise<ICurrentUser | null> {
	const list = await db
		.update(schemas.user)
		.set({
			...(typeof email_verified === 'boolean' ? { email_verified } : {}),
			...(name ? { name } : {}),
			...(surname ? { surname } : {}),
			...(avatar ? { avatar } : {}),
			...(last_login_at ? { last_login_at } : {}),
		})
		.where(orm.eq(schemas.user.uuid, uuid))
		.returning({
			id: schemas.user.id,
			uuid: schemas.user.uuid,
			email: schemas.user.email,
			email_verified: schemas.user.email_verified,
			name: schemas.user.name,
			surname: schemas.user.surname,
			avatar: schemas.user.avatar,
		});

	return list && list.length ? list[0] : null;
}
