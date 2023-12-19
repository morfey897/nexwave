import db, { schemas, orm } from '@/lib/storage';
import { TUID } from '@/types/common';

export interface IProject extends TUID {
	email: string;
	createdAt: Date;
	//TODO: add project
}

export async function createProject({
	ownerId,
}: {
	ownerId: number;
}): Promise<IProject | null> {
	const list = await db
		.insert(schemas.project)
		.values({
			ownerId,
			roles: [
				{
					id: 1,
					title: { ru: 'админ', en: 'admin' },
					permissions: 1,
				},
        {
					id: 2,
					title: { ru: 'пользователь', en: 'user' },
					permissions: 1,
				},
        {
					id: 3,
					title: { ru: 'наблюдатель', en: 'viewer' },
					permissions: 1,
				},
			],
		})
		.returning({
			id: schemas.project.id,
			uuid: schemas.project.uuid,
      ownerId: schemas.project.ownerId,
      createdAt: schemas.project.createdAt,
		});

	return null;
}
