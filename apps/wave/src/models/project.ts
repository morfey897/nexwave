import db from '~/lib/storage';
import { schemas, orm, StateEnum } from '@nw/storage';
import { TUID } from '~/types';
import {
	generateColor,
	generateName,
	generateShortId,
	hasAccess,
} from '~/utils';
import { EnumRole, EnumColor, EnumCurrency } from '~/constants/enums';
import { ROLES } from '~/constants/crud';
import { isNumber, isIdOurUUID, isUUID } from '~/utils/validation';
import { RRule } from 'rrule';
import { MOCK_AVAILABLE_PROJECTS, MOCKED_PROJECT } from '~/__mock__/project';

interface IAccess {
	role: string;
	permission: number;
	roles: Record<string, number>;
}

interface IInfo {
	name: string;
	info: string | null;
	image: string | null;
	color: string | null;
	currency: string | null;
	timezone: string | null;
	langs: string[] | null;

	state: StateEnum;

	createdAt: Date;
	updatedAt: Date;
}

export interface IBranch extends TUID, IInfo {
	projectId: number;
	address: {
		country?: string;
		city?: string;
		address_line?: string;
		address_line_2?: string;
	};
	contacts: Record<string, string>;
	spaces: Array<{ id: string; name: string }>;
}

export interface IPreProject extends TUID, IAccess {}

export interface IProject extends TUID, IInfo, IAccess {
	// Children
}

const compareBranches = (a: IBranch, b: IBranch) => {
	if (a.name === b.name) return 0;
	return a.name < b.name ? 1 : -1;
};

async function executeSelectProject(userId: number, projectUUID: string) {
	const fullProject = await db.query.Projects.findFirst({
		where: orm.eq(schemas.Projects.uuid, projectUUID),
		with: {
			users: {
				where: orm.eq(schemas.ProjectUser.userId, userId),
				columns: {
					role: true,
				},
			},
		},
	});
	if (!fullProject) return null;

	const { role } = fullProject.users[0] || {};
	const permission = fullProject.roles[role] || 0;

	const project: IProject = {
		...fullProject,
		branches: fullProject.branches,
		role,
		permission,
	};
	return project;
}

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
		timezone?: string;
		langs?: string[];
	}
): Promise<IProject | null> {
	if (!isNumber(ownerId)) return null;
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

	const newProjectUUID = await db.transaction(
		async (trx): Promise<string | null> => {
			const [newProject] = await trx
				.insert(schemas.Projects)
				.values({
					name: nameValue,
					color: colorValue,
					state: StateEnum.Inactive,
					currency: currencyValue,
					info: value?.info || null,
					langs: value?.langs || [],
					timezone: value?.timezone || null,
					roles: ROLES,
				})
				.returning({
					id: schemas.Projects.id,
					uuid: schemas.Projects.uuid,
				});

			if (!newProject) {
				trx.rollback();
				return null;
			}

			const [branch] = await trx
				.insert(schemas.Branches)
				.values({
					projectId: newProject.id,
					name: generateName(),
					state: StateEnum.Inactive,
					spaces: [{ id: generateShortId(6), name: generateName(0) }],
				})
				.returning({
					id: schemas.Branches.id,
				});

			if (!branch) {
				trx.rollback();
				return null;
			}

			const [junction] = await trx
				.insert(schemas.ProjectUser)
				.values({
					userId: ownerId,
					projectId: newProject.id,
					role: EnumRole.owner,
				})
				.returning({
					userId: schemas.ProjectUser.userId,
					projectId: schemas.ProjectUser.projectId,
					role: schemas.ProjectUser.role,
				});
			if (!junction) {
				trx.rollback();
				return null;
			}
			return newProject.uuid;
		}
	);

	const project =
		newProjectUUID != null
			? await executeSelectProject(ownerId, newProjectUUID)
			: null;

	return project;
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
	if (!isNumber(userId) || !isNumber(projectId)) return false;
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
	if (!isNumber(userId) || !isNumber(projectId)) return false;
	const [junction] = await db
		.delete(schemas.projectToUser)
		.where(
			orm.and(
				orm.eq(schemas.projectToUser.userId, userId),
				orm.eq(schemas.projectToUser.projectId, projectId)
			)
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
 * @param projectUUID - string
 * @returns
 */
export async function getProjectByUserId(
	userId: number | undefined,
	projectUUID: string | undefined
): Promise<IProject | null> {
	if (process.env.SKIP_AUTHENTICATION === 'true') return MOCKED_PROJECT;
	if (
		!isNumber(userId) ||
		!isUUID(projectUUID) ||
		typeof userId !== 'number' ||
		typeof projectUUID !== 'string'
	)
		return null;
	const project = await executeSelectProject(userId, projectUUID);
	if (!project?.permission) return null;
	return project;
}

/**
 * Get projects for user id
 * @param userId - number
 * @returns
 */
export async function getProjectsForUserId(
	userId: number | undefined
): Promise<IPreProject[] | null> {
	if (process.env.SKIP_AUTHENTICATION === 'true')
		return MOCK_AVAILABLE_PROJECTS;

	if (!isNumber(userId) || typeof userId !== 'number') return null;
	const result = await db.query.ProjectUser.findMany({
		where: orm.eq(schemas.ProjectUser.userId, userId),
		columns: {
			role: true,
		},
		with: {
			project: {
				columns: {
					id: true,
					roles: true,
					uuid: true,
				},
			},
		},
	});

	return result
		.map(({ role, project }) => {
			const permission = project.roles[role] || 0;
			return {
				id: project.id,
				uuid: project.uuid,
				roles: project.roles,
				role,
				permission,
			};
		})
		.sort((a, b) => {
			if (a.permission === b.permission) return 0;
			return a.permission < b.permission ? 1 : -1;
		})
		.filter((item) => item.permission > 0);
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
	}
): Promise<IFullProject | null> {
	if (typeof userId != 'number' || !isNumber(userId)) return null;
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
					branches: !!branch ? [branch] : [],
				};
				acc.push(project);
			}
			return acc;
		}, []);

	filteredProjects.forEach((project) => {
		project.branches.sort(compareBranches);
	});
	return filteredProjects[0] || null;
}

/**
 * Get access to project
 * @param userId - number
 * @param projectId - number
 */
export async function getProjectAccess(
	userId: number | null | undefined,
	projectId: number | null | undefined
): Promise<IAccess | null> {
	if (
		typeof userId != 'number' ||
		typeof projectId != 'number' ||
		!isNumber(userId) ||
		!isNumber(projectId)
	)
		return null;

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
				orm.eq(schemas.projectToUser.projectId, projectId)
			)
		)
		.leftJoin(
			schemas.project,
			orm.eq(schemas.project.id, schemas.projectToUser.projectId)
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
	}
): Promise<boolean> {
	const access = await getProjectAccess(props?.userId, props?.projectId);
	return hasAccess(access?.permission, action);
}

/**
 * Check if branch is a part of project
 * @param branchId - number
 * @param projectId - number
 * @returns boolean
 */
export async function isBranchOfProject(
	branchId: number | null | undefined,
	projectId: number | null | undefined
): Promise<boolean> {
	if (!isNumber(branchId) || !isNumber(projectId)) return false;
	const [branch] = await db
		.select()
		.from(schemas.branch)
		.where(
			orm.and(
				orm.eq(schemas.branch.id, branchId as number),
				orm.eq(schemas.branch.projectId, projectId as number)
			)
		)
		.execute();

	return !!branch;
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
		state?: EnumState.ACTIVE | EnumState.INACTIVE;
		roles?: Record<string, number>;
	}
): Promise<boolean> {
	const { id, uuid } = props || {};
	if (!isIdOurUUID(id, uuid)) return false;

	const result = await db
		.update(schemas.project)
		.set({
			...(value?.name ? { name: value.name } : {}),
			...(value?.color ? { color: value.color } : {}),
			...(value?.currency ? { currency: value.currency } : {}),
			...(typeof value?.info != 'undefined'
				? { info: value?.info || null }
				: {}),
			...(value?.state ? { state: value.state } : {}),
			...(value?.roles
				? {
						roles: {
							...value.roles,
							[EnumRole.owner]: ALL_ACCESS,
						},
					}
				: {}),
		})
		.where(
			id != undefined
				? orm.eq(schemas.project.id, id)
				: uuid != undefined
					? orm.eq(schemas.project.uuid, uuid)
					: undefined
		)
		.returning({
			id: schemas.project.id,
			uuid: schemas.project.uuid,
		});

	return result.length > 0;
}

/**
 * Create a new branch
 * @param value
 * @returns
 */
export async function createBranch(value: {
	projectId: number;
	name?: string;
	info?: string;
	address?: Object;
	spaces?: Array<{ shortId: string; name: string }>;
}): Promise<IFullBranch | null> {
	if (!isNumber(value.projectId)) return null;
	const nameValue = value?.name || generateName();

	const result = await db
		.insert(schemas.branch)
		.values({
			projectId: value.projectId,
			name: nameValue,
			spaces:
				value?.spaces && value.spaces.length > 0
					? value.spaces
					: [{ shortId: generateShortId(6), name: generateName(0) }],

			...(typeof value?.info != 'undefined'
				? { info: value?.info || null }
				: {}),
			state: EnumState.DRAFT,
			...(value?.address ? { address: value?.address } : {}),
		})
		.returning({
			id: schemas.branch.id,
			uuid: schemas.branch.uuid,
			name: schemas.branch.name,
			image: schemas.branch.image,
			state: schemas.branch.state,
			projectId: schemas.branch.projectId,
			createdAt: schemas.branch.createdAt,
			address: schemas.branch.address,
			info: schemas.branch.info,
			contacts: schemas.branch.contacts,
			spaces: schemas.branch.spaces,
		});

	return result.length > 0 ? result[0] : null;
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
		state?: EnumState.ACTIVE | EnumState.INACTIVE;
		spaces?: Array<{ shortId: string; name: string }>;
	}
): Promise<boolean> {
	const { id, uuid } = props || {};
	if (!isIdOurUUID(id, uuid)) return false;

	const result = await db
		.update(schemas.branch)
		.set({
			...(value?.name ? { name: value?.name } : {}),
			...(typeof value?.info != 'undefined'
				? { info: value?.info || null }
				: {}),
			...(value?.state ? { state: value?.state } : {}),
			...(value?.address ? { address: value?.address } : {}),
			...(value?.spaces && value.spaces.length > 0
				? { spaces: value?.spaces }
				: {}),
		})
		.where(
			id != undefined
				? orm.eq(schemas.branch.id, id)
				: uuid != undefined
					? orm.eq(schemas.branch.uuid, uuid)
					: undefined
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
	if (!isIdOurUUID(id, uuid)) return false;

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
		) > 1`
	);

	return result.rowCount > 0;
}
