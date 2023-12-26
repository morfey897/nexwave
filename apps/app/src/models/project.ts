import db, { schemas, orm } from '@/lib/storage';
import { TUID } from '@/types/common';
import { humanId } from 'human-id';

enum EnumStatus {
	draft = 'draft',
	on = 'on',
	off = 'off',
	pause = 'pause',
}

enum EnumRole {
	super = 'super',
	admin = 'admin',
	user = 'user',
	guest = 'guest',
}
const ROLES = {
	[EnumRole.super]:
		2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192,
	[EnumRole.admin]: 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024,
	[EnumRole.user]: 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256,
	[EnumRole.guest]: 2 | 4 | 8 | 16 | 32 | 64,
} as const;

export interface IProject extends TUID {
	ownerId: number;
	createdAt: Date;
	slug: string;
	name: string;
	image: string | null;
	status: keyof typeof EnumStatus;
	roles: Record<string, number>;
}

async function generateUniqSlug(): Promise<string> {
	let existList: Array<{ id: number }> = [];
	let slug: string = '';
	do {
		slug = humanId({
			separator: '-',
			capitalize: false,
			adjectiveCount: 2,
		});

		existList = await db
			.select({
				id: schemas.project.id,
			})
			.from(schemas.project)
			.where(orm.eq(schemas.project.slug, slug))
			.execute();
	} while (existList.length > 0);

	return slug;
}

/**
 * Deploy new project
 * @param ownerId - number
 * @returns
 */
export async function deployNewProject({
	ownerId,
	name,
	slug,
}: {
	name?: string;
	slug?: string;
	ownerId: number;
}): Promise<IProject | null> {
	const slugValue = slug || (await generateUniqSlug());
	const nameValue =
		name ||
		slugValue
			.split('-')
			.map((v) => v[0].toUpperCase() + v.slice(1))
			.join(' ');

	const project = await db.transaction(async (trx) => {
		const [project] = await trx
			.insert(schemas.project)
			.values({
				ownerId,
				name: nameValue,
				slug: slugValue,
				roles: ROLES,
			})
			.returning({
				id: schemas.project.id,
				uuid: schemas.project.uuid,
				ownerId: schemas.project.ownerId,
				createdAt: schemas.project.createdAt,
				roles: schemas.project.roles,
				slug: schemas.project.slug,
				name: schemas.project.name,
				image: schemas.project.image,
				status: schemas.project.status,
			});
		if (!project) {
			trx.rollback();
			return null;
		}

		const [junction] = await trx
			.insert(schemas.projectToUser)
			.values({
				userId: project.ownerId,
				projectId: project.id,
				role: EnumRole.super,
			})
			.returning({
				userId: schemas.projectToUser.userId,
				projectId: schemas.projectToUser.projectId,
				role: schemas.projectToUser.role,
			});
		if (!junction) {
			trx.rollback();
			return null;
		}

		return project || null;
	});

	return project || null;
}

/**
 * Add user to project or update role
 * @param userId - number
 * @param projectId - number
 * @param role - EnumRole
 * @returns
 */
export async function addUserToProjectOrUpdate({
	userId,
	projectId,
	role,
}: {
	userId: number;
	projectId: number;
	role: EnumRole;
}): Promise<boolean> {
	const [junction] = await db
		.insert(schemas.projectToUser)
		.values({
			userId,
			projectId,
			role,
		})
		.onConflictDoUpdate({
			target: [schemas.projectToUser.userId, schemas.projectToUser.projectId],
			set: {
				role,
			},
		})
		.returning({
			userId: schemas.projectToUser.userId,
			projectId: schemas.projectToUser.projectId,
			role: schemas.projectToUser.role,
		});

	return !!junction;
}

/**
 * Remove user from project
 * @param userId - number
 * @param projectId - number
 * @returns
 */
export async function removeUserFromProject({
	userId,
	projectId,
}: {
	userId: number;
	projectId: number;
}): Promise<boolean> {
	const [junction] = await db
		.delete(schemas.projectToUser)
		.where(
			orm.and(
				orm.eq(schemas.projectToUser.userId, userId),
				orm.eq(schemas.projectToUser.projectId, projectId),
			),
		)
		.returning({
			userId: schemas.projectToUser.userId,
			projectId: schemas.projectToUser.projectId,
			role: schemas.projectToUser.role,
		});

	return !!junction;
}
