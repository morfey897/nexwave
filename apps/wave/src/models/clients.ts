import db from '~/lib/storage';
import { schemas, orm, IClient } from '@nw/storage';
import { isUUID } from '~/utils/validation';
import { generateName, generatePassword } from '~/utils';

/**
 * Get clients for a project
 * @param projectUUID
 * @returns IClient[] | null
 */
export async function getClients({
	projectUUID,
}: {
	projectUUID: string;
}): Promise<IClient[] | null> {
	const project = await db.query.Projects.findFirst({
		where: orm.eq(schemas.Projects.uuid, projectUUID),
		columns: {
			id: true,
		},
	});

	if (!project) return null;
	const clients = await db.query.ProjectClient.findMany({
		where: orm.eq(schemas.ProjectClient.projectId, project.id),
		with: {
			client: {
				columns: {
					id: true,
					uuid: true,
					name: true,
					surname: true,
					login: true,
					contacts: true,
					avatar: true,
					birthday: true,
					gender: true,
					bio: true,
					meta: true,
					createdAt: true,
					updatedAt: true,
					lastVisitAt: true,
				},
			},
		},
	});

	const data = clients.map(({ client }) => client);

	return data;
}

/**
 * Get client by UUID
 * @param clientUUID
 * @returns IClient | null
 */
export async function getClientByUUID(
	clientUUID: string
): Promise<IClient | null> {
	if (!clientUUID || !isUUID(clientUUID)) return null;
	const client = await db.query.Clients.findFirst({
		where: orm.eq(schemas.Clients.uuid, clientUUID),
		columns: {
			id: true,
			uuid: true,
			name: true,
			surname: true,
			login: true,
			contacts: true,
			avatar: true,
			birthday: true,
			gender: true,
			bio: true,
			meta: true,
			createdAt: true,
			updatedAt: true,
			lastVisitAt: true,
		},
	});

	return client || null;
}

/**
 * Update client
 * @param data
 * @returns IClient | null
 */
export async function updateClient(
	clientUUID: string,
	{
		data,
	}: {
		data: Partial<IClient>;
	}
): Promise<IClient | null> {
	if (!clientUUID || !isUUID(clientUUID)) return null;
	const clients = await db
		.update(schemas.Clients)
		.set(data)
		.where(orm.eq(schemas.Clients.uuid, clientUUID))
		.returning({
			id: schemas.Clients.id,
			uuid: schemas.Clients.uuid,
			name: schemas.Clients.name,
			surname: schemas.Clients.surname,
			login: schemas.Clients.login,
			contacts: schemas.Clients.contacts,
			avatar: schemas.Clients.avatar,
			birthday: schemas.Clients.birthday,
			gender: schemas.Clients.gender,
			bio: schemas.Clients.bio,
			meta: schemas.Clients.meta,
			createdAt: schemas.Clients.createdAt,
			updatedAt: schemas.Clients.updatedAt,
			lastVisitAt: schemas.Clients.lastVisitAt,
		});

	return clients?.length ? clients[0] : null;
}

/**
 * Update client
 * @param data
 * @returns IClient | null
 */
export async function addClient({
	login,
	name,
}: {
	name?: string;
	login: string;
}): Promise<IClient | null> {
	const password = generatePassword();
	const nameValue = name || generateName(1);

	const clients = await db
		.insert(schemas.Clients)
		.values({
			login: login,
			name: nameValue,
			password: password
				? orm.sql<string>`crypt(${password}, gen_salt('bf'))`
				: null,
		})
		.returning({
			id: schemas.Clients.id,
			uuid: schemas.Clients.uuid,
			name: schemas.Clients.name,
			surname: schemas.Clients.surname,
			login: schemas.Clients.login,
			contacts: schemas.Clients.contacts,
			avatar: schemas.Clients.avatar,
			birthday: schemas.Clients.birthday,
			gender: schemas.Clients.gender,
			bio: schemas.Clients.bio,
			meta: schemas.Clients.meta,
			createdAt: schemas.Clients.createdAt,
			updatedAt: schemas.Clients.updatedAt,
			lastVisitAt: schemas.Clients.lastVisitAt,
		});

	return clients?.length ? clients[0] : null;
}
