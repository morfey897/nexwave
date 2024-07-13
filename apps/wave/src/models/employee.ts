import db from '~/lib/storage';
import { schemas, orm, IEmployee } from '@nw/storage';
import { isUUID } from '~/utils/validation';

/**
 * Get users by project UUID
 * @param userId - number
 * @param projectUUID - string
 * @returns
 */
export async function getEmployees({
	projectUUID,
}: {
	projectUUID: string | undefined;
}): Promise<IEmployee[] | null> {
	if (!projectUUID || !isUUID(projectUUID)) return null;

	const project = await db.query.Projects.findFirst({
		where: orm.eq(schemas.Projects.uuid, projectUUID),
		columns: {
			id: true,
		},
	});
	if (!project) return null;

	const users = await db.query.ProjectUser.findMany({
		where: orm.eq(schemas.ProjectUser.projectId, project.id),
		columns: {
			role: true,
		},
		with: {
			project: {
				columns: {
					roles: true,
				},
			},
			user: {
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
			},
		},
	});

	return users
		.filter(({ role, project }) => project.roles[role] || 0 > 0)
		.map(({ user, role }) => ({
			...user,
			role,
		}));
}

/**
 * Update client
 * @param data
 * @returns IClient | null
 */
export async function updateEmployee(
	projectUUID: string,
	employeeUUID: string,
	data: Partial<IEmployee>
): Promise<IEmployee | null> {
	if (
		!employeeUUID ||
		!isUUID(employeeUUID) ||
		!projectUUID ||
		!isUUID(projectUUID)
	)
		return null;

	const project = await db.query.Projects.findFirst({
		where: orm.eq(schemas.Projects.uuid, projectUUID),
		columns: {
			id: true,
		},
	});
	if (!project) return null;

	const { role, ...value } = data;

	const users = await db
		.update(schemas.Users)
		.set({
			...value,
			contacts: Object.values(value.contacts || {}).some(Boolean)
				? value.contacts
				: undefined,
			meta: Object.values(value.meta || {}).some(Boolean)
				? value.meta
				: undefined,
			updatedAt: new Date(),
		})
		.where(orm.eq(schemas.Users.uuid, employeeUUID))
		.returning({
			id: schemas.Users.id,
		});

	const user = users[0];

	if (role && project) {
		await db
			.update(schemas.ProjectUser)
			.set({
				role: role,
			})
			.where(
				orm.and(
					orm.eq(schemas.ProjectUser.projectId, project.id),
					orm.eq(schemas.ProjectUser.userId, user.id)
				)
			)
			.execute();
	}

	const userData = await db.query.ProjectUser.findFirst({
		where: orm.and(
			orm.eq(schemas.ProjectUser.projectId, project.id),
			orm.eq(schemas.ProjectUser.userId, user.id)
		),
		columns: {
			role: true,
		},
		with: {
			project: {
				columns: {
					roles: true,
				},
			},
			user: {
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
			},
		},
	});

	if (!userData || !((userData.project.roles[userData.role] || 0) > 0))
		return null;

	return {
		...userData.user,
		role: userData.role,
	};
}

// /**
//  * Update client
//  * @param data
//  * @returns IClient | null
//  */
// export async function addClient({
// 	login,
// 	name,
// }: {
// 	name?: string;
// 	login: string;
// }): Promise<IClient | null> {
// 	const password = generatePassword();
// 	const nameValue = name || generateName(1);

// 	const clients = await db
// 		.insert(schemas.Clients)
// 		.values({
// 			login: login,
// 			name: nameValue,
// 			password: password
// 				? orm.sql<string>`crypt(${password}, gen_salt('bf'))`
// 				: null,
// 		})
// 		.returning({
// 			id: schemas.Clients.id,
// 			uuid: schemas.Clients.uuid,
// 			name: schemas.Clients.name,
// 			surname: schemas.Clients.surname,
// 			login: schemas.Clients.login,
// 			contacts: schemas.Clients.contacts,
// 			avatar: schemas.Clients.avatar,
// 			birthday: schemas.Clients.birthday,
// 			gender: schemas.Clients.gender,
// 			bio: schemas.Clients.bio,
// 			meta: schemas.Clients.meta,
// 			createdAt: schemas.Clients.createdAt,
// 			updatedAt: schemas.Clients.updatedAt,
// 			lastVisitAt: schemas.Clients.lastVisitAt,
// 		});

// 	return clients?.length ? clients[0] : null;
// }
