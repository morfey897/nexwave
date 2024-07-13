import db from '~/lib/storage';
import { schemas, orm, IClient } from '@nw/storage';

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
			client: true,
		},
	});

	const data = clients.map(({ client }) => client);

	return data;
}
