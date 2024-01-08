import db from '@/lib/storage';
import { schemas, orm, EnumColor, EnumStatus } from '@nw/storage';
import { TUID } from '@/types/common';
import { humanId } from 'human-id';

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

export interface IBranch extends TUID {
	projectId: number;
	name: string;
	image: string | null;
	createdAt: Date;
	status: EnumStatus;
}

export interface IProject extends TUID {
	ownerId: number;
	createdAt: Date;
	vistedAt: Date | null;
	color: EnumColor;
	name: string;
	image: string | null;
	status: EnumStatus;
	roles: Record<string, number>;
	branches: IBranch[];
}

export type TProjectToUser = Omit<IProject, 'ownerId'> & {
	role: keyof typeof EnumRole;
};

function generateName() {
	return humanId({
		separator: ' ',
		capitalize: true,
	});
}

function generateColor() {
	const colors = Object.values(EnumColor);
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}

/**
 * Deploy new project
 * @param ownerId - number
 * @returns
 */
export async function deployNewProject({
	ownerId,
	name,
}: {
	name?: string;
	ownerId: number;
}): Promise<IProject | null> {
	const nameValue = name || generateName();
	const color = generateColor();

	const project = await db.transaction(async (trx) => {
		const [project] = await trx
			.insert(schemas.project)
			.values({
				ownerId,
				name: nameValue,
				color,
				roles: ROLES,
			})
			.returning({
				id: schemas.project.id,
				uuid: schemas.project.uuid,
				ownerId: schemas.project.ownerId,
				createdAt: schemas.project.createdAt,
				roles: schemas.project.roles,
				color: schemas.project.color,
				name: schemas.project.name,
				image: schemas.project.image,
				status: schemas.project.status,
			});
		if (!project) {
			trx.rollback();
			return null;
		}

		const [branch] = await trx
			.insert(schemas.branch)
			.values({
				projectId: project.id,
				name: generateName(),
			})
			.returning({
				id: schemas.branch.id,
				uuid: schemas.branch.uuid,
				name: schemas.branch.name,
				projectId: schemas.branch.projectId,
				createdAt: schemas.branch.createdAt,
			});

		if (!branch) {
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

		return project ? { ...project, branches: [branch] } : null;
	});

	return project as IProject;
}

/**
 * Add user to project or update role
 * @param userId - number
 * @param projectId - number
 * @param role - EnumRole
 * @returns boolean
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
 * @returns boolean
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

/**
 * Get project by user id
 * @param userId - number
 * @returns
 */
export async function getProjectByUserId(props?: {
	id?: number;
	uuid?: string;
	userId: number | null | undefined;
}): Promise<TProjectToUser[] | null> {
	if (!props?.userId) return null;
	const { id, uuid } = props;
	const projects = await db
		.select({
			id: schemas.project.id,
			uuid: schemas.project.uuid,
			createdAt: schemas.project.createdAt,
			roles: schemas.project.roles,
			color: schemas.project.color,
			name: schemas.project.name,
			image: schemas.project.image,
			status: schemas.project.status,
			role: schemas.projectToUser.role,
			_branch: schemas.branch,
		})
		.from(schemas.user)
		.leftJoin(
			schemas.projectToUser,
			orm.eq(schemas.projectToUser.userId, schemas.user.id),
		)
		.leftJoin(
			schemas.project,
			orm.eq(schemas.projectToUser.projectId, schemas.project.id),
		)
		.leftJoin(
			schemas.branch,
			orm.eq(schemas.branch.projectId, schemas.project.id),
		)
		.where(
			orm.and(
				orm.eq(schemas.user.id, props.userId),
				orm.isNotNull(schemas.projectToUser),
				id != undefined
					? orm.eq(schemas.project.id, id)
					: uuid != undefined
					? orm.eq(schemas.project.uuid, uuid)
					: undefined,
			),
		)
		.execute();

	// @ts-ignore
	const filteredProjects = projects
		.filter((item) => item.role !== null)
		.reduce((acc: TProjectToUser[], row) => {
			const { _branch, ...proj } = row;
			const project = acc.find((item) => item.id === row.id);
			const branch = _branch as IBranch;
			if (project) {
				if (!!branch) {
					project.branches.push(branch);
				}
			} else {
				const project = {
					...proj,
					branches: !!branch ? [branch] : [],
				} as TProjectToUser;
				acc.push(project);
			}
			return acc;
		}, []);

	return filteredProjects.length > 0 ? filteredProjects : null;
}
