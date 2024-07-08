import db from '~/lib/storage';
import { schemas, orm, StateEnum, IProject, IAccess } from '@nw/storage';
import {
	generateColor,
	generateName,
	generateShortId,
	hasAccess,
} from '~/utils';
import { EnumRole, EnumColor, EnumCurrency } from '~/constants/enums';
import { ROLES } from '~/constants/crud';
import { isNumber, isUUID } from '~/utils/validation';
import { MOCKED_PROJECT } from '~/__mock__/project';

async function executeAccessProject(
	userId: number,
	projectUUID: string
): Promise<IAccess | null> {
	const fullProject = await db.query.Projects.findFirst({
		where: orm.eq(schemas.Projects.uuid, projectUUID),
		columns: {
			roles: true,
		},
		with: {
			users: {
				where: orm.eq(schemas.ProjectUser.userId, userId),
				columns: {
					role: true,
				},
			},
		},
	});
	if (!fullProject || !fullProject.users.length) return null;

	const { role } = fullProject.users[0] || {};
	const { roles } = fullProject;

	return {
		roles,
		role,
		permission: roles[role] || 0,
	};
}

async function executeSelectProject(
	userId: number,
	projectUUID: string
): Promise<IProject | null> {
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
	if (!fullProject || !fullProject.users.length) return null;

	const { role } = fullProject.users[0] || {};
	const permission = fullProject.roles[role] || 0;

	const project: IProject = {
		...fullProject,
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
					spaces: [{ id: generateShortId(6), name: generateName(0) }],
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
 * Get project by user id
 * @param userId - number
 * @param projectUUID - string
 * @returns
 */
export async function getProjectByUserId(
	userId: number | undefined | null,
	projectUUID: string | undefined | null
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
): Promise<IProject[] | null> {
	if (process.env.SKIP_AUTHENTICATION === 'true') return [MOCKED_PROJECT];

	if (!isNumber(userId) || typeof userId !== 'number') return null;
	const result = await db.query.ProjectUser.findMany({
		where: orm.eq(schemas.ProjectUser.userId, userId),
		columns: {
			role: true,
		},
		with: {
			project: true,
		},
	});

	return result
		.map(({ role, project }) => {
			const permission = project.roles[role] || 0;
			return {
				...project,
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
 * Check project access
 * @param action - number
 * @param props - { userId?: number; projectId?: number }
 * @returns boolean
 */
export async function hasProjectAccess(
	action: number,
	{
		userId,
		projectUUID,
	}: {
		userId: number | null | undefined;
		projectUUID: string | null | undefined;
	}
): Promise<boolean> {
	if (
		typeof userId !== 'number' ||
		typeof projectUUID !== 'string' ||
		!isNumber(userId) ||
		!isUUID(projectUUID)
	)
		return false;

	const access = await executeAccessProject(userId, projectUUID);
	return hasAccess(access?.permission, action);
}

// <<<<<UNDER ACCESS CONTROL>>>>>

/**
 * Update project
 * @param userId - number
 * @returns
 */
export async function updateProject(
	projectUUID: string | undefined | null,
	value?: {
		color?: string;
		name?: string;
		currency?: string;
		info?: string;
		state?: StateEnum;
		roles?: Record<string, number>;
	}
): Promise<boolean> {
	if (typeof projectUUID !== 'string' || !isUUID(projectUUID)) return false;

	const result = await db
		.update(schemas.Projects)
		.set({
			...(value?.name ? { name: value.name } : {}),
			...(value?.color ? { color: value.color } : {}),
			...(value?.currency ? { currency: value.currency } : {}),
			...(typeof value?.info !== 'undefined'
				? { info: value?.info || null }
				: {}),
			...(value?.state ? { state: value.state } : {}),
			...(value?.roles
				? {
						roles: {
							...value.roles,
							[EnumRole.owner]: ROLES.owner,
						},
					}
				: {}),
		})
		.where(orm.eq(schemas.Projects.uuid, projectUUID))
		.returning({
			id: schemas.Projects.id,
			uuid: schemas.Projects.uuid,
		});

	return result.length > 0;
}
