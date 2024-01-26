import db from '@/lib/storage';
import { schemas, orm } from '@nw/storage';
import { TUID } from '@/types/common';
import { generateColor, generateName } from '@/utils';
import { EnumRole, EnumColor, EnumState, EnumCurrency } from '@/enums';
import { hasAccess } from '@/utils';
import { C, R, U, D } from '@/crud';

const ROLE_GUEST = 0;
const ROLE_USER = 0 | ROLE_GUEST;
const ROLE_ADMIN = U.PROJECT | ROLE_USER;
const ROLE_SUPER = U.PROJECT_ACCESS | ROLE_ADMIN;

const ROLES = {
	[EnumRole.super]: ROLE_SUPER,
	[EnumRole.admin]: ROLE_ADMIN,
	[EnumRole.user]: ROLE_USER,
	[EnumRole.guest]: ROLE_GUEST,
} as const;

interface IAccess {
	role: string;
	permission: number;
	roles: Record<string, number>;
}

export interface IProject extends TUID, Omit<IAccess, 'role' | 'roles'> {
	name: string;
	createdAt: Date;
	color: string | null;
	image: string | null;
	currency: string | null;
	state: string | null;
	branches: IBranch[];
}

export interface IBranch extends TUID {
	projectId: number;
	name: string;
	createdAt: Date;
	image: string | null;
	state: string | null;
}

export interface IFullBranch extends IBranch {
	info: string | null;
	address: {
		country?: string;
		city?: string;
		address_line?: string;
		address_line_2?: string;
	};
	contacts: Record<string, string>;
	spaces: Array<{ id: number; name: string; state: string }>;
}

export interface IFullProject
	extends Omit<IProject, 'permission'>,
		Omit<IAccess, 'permission'> {
	info: string | null;
	groups: Record<string, string>;
	branches: IFullBranch[];
}

const _executeSelectProject = async (
	userId: number,
	id?: number,
	uuid?: string,
) =>
	await db
		.select({
			id: schemas.project.id,
			uuid: schemas.project.uuid,
			createdAt: schemas.project.createdAt,
			color: schemas.project.color,
			name: schemas.project.name,
			image: schemas.project.image,
			state: schemas.project.state,
			info: schemas.project.info,
			currency: schemas.project.currency,
			groups: schemas.project.groups,
			_roles: schemas.project.roles,
			_role: schemas.projectToUser.role,
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
				orm.eq(schemas.user.id, userId),
				orm.isNotNull(schemas.projectToUser),
				id != undefined
					? orm.eq(schemas.project.id, id)
					: uuid != undefined
						? orm.eq(schemas.project.uuid, uuid)
						: undefined,
			),
		)
		.execute();

/**
 * Deploy new project
 * @param ownerId - number
 * @returns
 */
export async function deployNewProject(
	ownerId: number,
	value?: {
		color?: string;
		name?: string;
		currency?: string;
		info?: string;
	},
): Promise<IProject | null> {
	const nameValue = value?.name || generateName();
	const colorValue =
		value?.color && Object.values(EnumColor).includes(value?.color as EnumColor)
			? (value?.color as EnumColor)
			: generateColor();

	const currencyValue =
		value?.currency &&
		Object.values(EnumCurrency).includes(value?.currency as EnumCurrency)
			? (value?.currency as EnumCurrency)
			: EnumCurrency.UAH;

	const project = await db.transaction(
		async (trx): Promise<IProject | null> => {
			const [newProject] = await trx
				.insert(schemas.project)
				.values({
					ownerId,
					name: nameValue,
					color: colorValue,
					state: EnumState.DRAFT,
					currency: currencyValue,
					info: value?.info || null,
					roles: ROLES,
				})
				.returning({
					id: schemas.project.id,
					uuid: schemas.project.uuid,
					createdAt: schemas.project.createdAt,
					color: schemas.project.color,
					name: schemas.project.name,
					image: schemas.project.image,
					state: schemas.project.state,
					currency: schemas.project.currency,
					_roles: schemas.project.roles,
				});
			if (!newProject) {
				trx.rollback();
				return null;
			}

			const [branch] = await trx
				.insert(schemas.branch)
				.values({
					projectId: newProject.id,
					name: generateName(),
					state: EnumState.DRAFT,
				})
				.returning({
					id: schemas.branch.id,
					uuid: schemas.branch.uuid,
					name: schemas.branch.name,
					image: schemas.branch.image,
					state: schemas.branch.state,
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
					userId: ownerId,
					projectId: newProject.id,
					role: EnumRole.super,
				})
				.returning({
					userId: schemas.projectToUser.userId,
					projectId: schemas.projectToUser.projectId,
					_role: schemas.projectToUser.role,
				});
			if (!junction) {
				trx.rollback();
				return null;
			}

			return newProject && branch && junction
				? {
						id: newProject.id,
						uuid: newProject.uuid,
						name: newProject.name,
						image: newProject.image,
						color: newProject.color,
						createdAt: newProject.createdAt,
						state: newProject.state,
						currency: newProject.currency,
						permission: newProject._roles[junction._role],
						branches: [branch],
					}
				: null;
		},
	);

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
 * @param props - { id?: number; uuid?: string }
 * @returns
 */
export async function getProjectsByUserId(
	userId: number | null | undefined,
	props?: {
		id?: number;
		uuid?: string;
	},
): Promise<IProject[] | null> {
	if (!userId) return null;
	const projects = await _executeSelectProject(userId, props?.id, props?.uuid);

	const filteredProjects = projects
		.filter((item) => item._role !== null)
		.reduce((acc: IProject[], proj) => {
			const project = acc.find((item) => item.id === proj.id);
			const branch: IBranch | null = proj._branch
				? {
						id: proj._branch.id,
						uuid: proj._branch.uuid,
						projectId: proj._branch.projectId,
						name: proj._branch.name,
						createdAt: proj._branch.createdAt,
						image: proj._branch.image,
						state: proj._branch.state,
					}
				: null;
			if (project) {
				if (!!branch) {
					project.branches.push(branch);
				}
			} else {
				const project: IProject = {
					id: proj.id as number,
					uuid: proj.uuid as string,
					name: proj.name as string,
					createdAt: proj.createdAt as Date,
					image: proj.image,
					currency: proj.currency,
					state: proj.state,
					color: proj.color,
					permission: (proj._roles || {})[proj._role || ''] || 0,
					branches: !!branch ? [branch] : [],
				};
				acc.push(project);
			}
			return acc;
		}, []);

	return filteredProjects.length > 0 ? filteredProjects : null;
}

/**
 * Get project by id
 * @param props - { id?: number; uuid?: string }
 * @returns
 */
export async function getFullProjectByUserId(
	userId: number | null | undefined,
	props?: {
		id?: number;
		uuid?: string;
	},
): Promise<IFullProject | null> {
	if (!userId) return null;
	const { id, uuid } = props || {};
	if (!id && !uuid) return null;
	const projects = await _executeSelectProject(userId, props?.id, props?.uuid);

	const filteredProjects = projects
		.filter((item) => item._role !== null)
		.reduce((acc: IFullProject[], proj) => {
			const project = acc.find((item) => item.id === proj.id);
			const branch: IFullBranch | null = proj._branch;
			if (project) {
				if (!!branch) {
					project.branches.push(branch);
				}
			} else {
				const project: IFullProject = {
					id: proj.id as number,
					uuid: proj.uuid as string,
					name: proj.name as string,
					createdAt: proj.createdAt as Date,
					image: proj.image,
					currency: proj.currency,
					state: proj.state,
					color: proj.color,
					info: proj.info,
					roles: proj._roles as Record<string, number>,
					role: proj._role as string,
					groups: proj.groups as Record<string, string>,
					branches: !!branch ? [branch] : [],
				};
				acc.push(project);
			}
			return acc;
		}, []);

	return filteredProjects[0] || null;
}

/**
 * Get access to project
 * @param userId - number
 * @param projectId - number
 */
export async function getProjectAccess(
	userId: number | null | undefined,
	projectId: number | null | undefined,
): Promise<IAccess | null> {
	if (!userId || !projectId) return null;

	const [access] = await db
		.select({
			role: schemas.projectToUser.role,
			permission: orm.sql<number>`${schemas.project.roles}->${schemas.projectToUser.role}`,
			roles: schemas.project.roles,
		})
		.from(schemas.projectToUser)
		.where(
			orm.and(
				orm.eq(schemas.projectToUser.userId, userId),
				orm.eq(schemas.projectToUser.projectId, projectId),
			),
		)
		.leftJoin(
			schemas.project,
			orm.eq(schemas.project.id, schemas.projectToUser.projectId),
		)
		.execute();

	return access
		? {
				role: access.role,
				permission: access.permission,
				roles: access.roles as IAccess['roles'],
			}
		: null;
}

/**
 * Check project access
 * @param action - number
 * @param props - { userId?: number; projectId?: number }
 * @returns boolean
 */
export async function hasProjectAccess(
	action: number,
	props?: {
		userId: number | null | undefined;
		projectId: number | null | undefined;
	},
): Promise<boolean> {
	const access = await getProjectAccess(props?.userId, props?.projectId);
	return hasAccess(access?.permission, action);
}

// <<<<<UNDER ACCESS CONTROL>>>>>

/**
 * Update project
 * @param userId - number
 * @returns
 */
export async function updateProject(
	props: {
		id?: number;
		uuid?: string;
	},
	value?: {
		color?: string;
		name?: string;
		currency?: string;
		info?: string;
		state?: 'active' | 'inactive';
	},
): Promise<boolean> {
	const { id, uuid } = props || {};
	if (!id && !uuid) return false;

	const result = await db
		.update(schemas.project)
		.set({
			...(value?.name ? { name: value?.name } : {}),
			...(value?.color ? { color: value?.color } : {}),
			...(value?.currency ? { currency: value?.currency } : {}),
			...(typeof value?.info != 'undefined'
				? { info: value?.info || null }
				: {}),
			...(value?.state ? { state: value?.state } : {}),
		})
		.where(
			id != undefined
				? orm.eq(schemas.project.id, id)
				: uuid != undefined
					? orm.eq(schemas.project.uuid, uuid)
					: undefined,
		)
		.returning({
			id: schemas.project.id,
			uuid: schemas.project.uuid,
		});

	return result.length > 0;
}

/**
 * Update branch
 * @param userId - number
 * @returns
 */
export async function updateBranch(
	props: {
		id?: number;
		uuid?: string;
	},
	value?: {
		name?: string;
		info?: string;
		address?: Object;
		state?: 'active' | 'inactive';
	},
): Promise<boolean> {
	const { id, uuid } = props || {};
	if (!id && !uuid) return false;

	const result = await db
		.update(schemas.branch)
		.set({
			...(value?.name ? { name: value?.name } : {}),
			...(typeof value?.info != 'undefined'
				? { info: value?.info || null }
				: {}),
			...(value?.state ? { state: value?.state } : {}),
			...(value?.address ? { address: value?.address } : {}),
		})
		.where(
			id != undefined
				? orm.eq(schemas.branch.id, id)
				: uuid != undefined
					? orm.eq(schemas.branch.uuid, uuid)
					: undefined,
		)
		.returning({
			id: schemas.branch.id,
			uuid: schemas.branch.uuid,
		});

	return result.length > 0;
}

/**
 * Delete branch
 * @param userId - number
 * @returns
 */

export async function deleteBranch(props: {
	id?: number;
	uuid?: string;
}): Promise<boolean> {
	const { id, uuid } = props || {};
	if (!id && !uuid) return false;

	const filter = id != undefined ? `id = ${id}` : `uuid = ${uuid}`;

	const result = await db.execute(
		id != undefined
			? orm.sql`DELETE FROM branches WHERE id = ${id}
		AND (
			SELECT COUNT(*) FROM branches WHERE project_id = (
				SELECT project_id FROM branches WHERE id = ${id}
			)
		) > 1
		RETURNING id, uuid
		`
			: orm.sql`DELETE FROM branches WHERE uuid = ${uuid}
		AND (
			SELECT COUNT(*) FROM branches WHERE project_id = (
				SELECT project_id FROM branches WHERE uuid = ${uuid}
			)
		) > 1`,
	);

	return result.rowCount > 0;
}
