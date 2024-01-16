'use server';
import { redirect } from 'next/navigation';
import { dynamicHref } from '@/utils';
import { ROOT, APP } from '@/routes';
import {
	deployNewProject,
	updateProject,
	getProjectsByUserId,
	IFullProject,
	getProjectAccess,
	hasProjectAccess,
	getFullProjectByUserId,
} from '@/models/project';
import { getUserFromSession } from '@/models/user';
import * as ErrorCodes from '@/errorCodes';
import { UPDATE, DELETE } from '@/crud';
import { EnumResponse } from '@/enums';
import { getError } from '@/utils';
import { IResponse } from '@/types';

const throwRedirect = (url: string) => {
	throw { redirect: true, url };
};

/**
 * Create project
 * @param formData
 * @returns IResponse
 */
export async function actionCreateNewProject(
	formData: FormData,
): Promise<IResponse | never> {
	try {
		const user = await getUserFromSession();
		if (!user) throw { code: ErrorCodes.USER_UNAUTHORIZED };
		const file = formData.get('image');
		const name = formData.get('name')?.toString();
		const color = formData.get('color')?.toString();
		const currency = formData.get('currency')?.toString();
		const info = formData.get('info')?.toString();

		// TODO: upload image to cloudinary
		const project = await deployNewProject(user.id, {
			name: name,
			color: color,
			currency: currency,
			info: info,
			// image: file,
		});

		if (!project) throw { code: ErrorCodes.CREATE_FAILED };
		throwRedirect(dynamicHref(ROOT, { uuid: project.uuid }));
	} catch (error: any) {
		if (error.redirect && error.url) {
			return redirect(error.url);
		}
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: getError(error) };
	}
	return { status: EnumResponse.SUCCESS };
}

/**
 * Get projects
 * @returns IResponse
 */
export async function actionGetProjects(): Promise<
	IResponse<Awaited<ReturnType<typeof getProjectsByUserId>>>
> {
	try {
		const user = await getUserFromSession();
		if (!user) throw { code: ErrorCodes.USER_UNAUTHORIZED };

		const projects = await getProjectsByUserId(user.id);

		return { status: EnumResponse.SUCCESS, data: projects };
	} catch (error) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: getError(error) };
	}
}

/**
 * Update project
 * @param formData
 * @returns IResponse
 */
export async function actionUpdateProject(
	formData: FormData,
): Promise<IResponse<IFullProject>> {
	try {
		const user = await getUserFromSession();
		if (!user) throw { code: ErrorCodes.USER_UNAUTHORIZED };
		const projectIdValue = formData.get('projectId')?.toString();
		const projectId = projectIdValue
			? Number.parseInt(projectIdValue)
			: undefined;

		const access = await hasProjectAccess(UPDATE.PROJECT_INFO, {
			userId: user.id,
			projectId,
		});

		if (!access) throw { code: ErrorCodes.ACCESS_DENIED };

		const file = formData.get('image');
		const name = formData.get('name')?.toString();
		const color = formData.get('color')?.toString();
		const currency = formData.get('currency')?.toString();
		const info = formData.get('info')?.toString();

		// TODO: upload image to cloudinary
		const success = await updateProject(
			{ id: projectId },
			{
				name: name,
				color: color?.toString(),
				currency: currency?.toString(),
				info: info?.toString(),
				// image: file,
			},
		);

		if (!success) throw { code: ErrorCodes.UPDATE_FAILED };
		const project = await getFullProjectByUserId(user.id, { id: projectId });
		if (!project) throw { code: ErrorCodes.UPDATE_FAILED };
		return { status: EnumResponse.SUCCESS, data: project };
	} catch (error) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: getError(error) };
	}
}

/**
 * Update project visibility
 * @param formData
 * @returns IResponse
 */
export async function actionUpdateVisibilityProject(
	formData: FormData,
): Promise<IResponse<IFullProject> | never> {
	try {
		const user = await getUserFromSession();
		if (!user) throw { code: ErrorCodes.USER_UNAUTHORIZED };
		const projectIdValue = formData.get('projectId')?.toString();
		const action = formData.get('action')?.toString();

		if (action != 'delete' && action != 'publish' && action != 'unpublish')
			throw { code: ErrorCodes.UNSUPPORTED_ACTION };

		const projectId = projectIdValue
			? Number.parseInt(projectIdValue)
			: undefined;

		// Delete project
		if (action == 'delete') {
			const access = await hasProjectAccess(DELETE.PROJECT, {
				userId: user.id,
				projectId,
			});

			if (!access) throw { code: ErrorCodes.ACCESS_DENIED };
			// DELETE junctions & project & branches
			throwRedirect(APP);
		}

		const access = await hasProjectAccess(UPDATE.PROJECT, {
			userId: user.id,
			projectId,
		});

		if (!access) throw { code: ErrorCodes.ACCESS_DENIED };

		const success = await updateProject(
			{ id: projectId },
			{
				state:
					action == 'publish'
						? 'active'
						: action == 'unpublish'
							? 'inactive'
							: undefined,
			},
		);

		if (!success) throw { code: ErrorCodes.UPDATE_FAILED };
		const project = await getFullProjectByUserId(user.id, { id: projectId });
		if (!project) throw { code: ErrorCodes.UPDATE_FAILED };
		return { status: EnumResponse.SUCCESS, data: project };
	} catch (error: any) {
		if (error.redirect && error.url) {
			return redirect(error.url);
		}
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: getError(error) };
	}
}
