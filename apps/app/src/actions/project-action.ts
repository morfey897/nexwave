'use server';
import { redirect } from 'next/navigation';
import { dynamicHref } from '@/utils';
import { ROOT, APP } from '@/routes';
import {
	deployNewProject,
	updateProject,
	getProjectsByUserId,
	IFullProject,
	hasProjectAccess,
	getFullProjectByUserId,
} from '@/models/project';
import { getUserFromSession } from '@/models/user';
import * as ErrorCodes from '@/errorCodes';
import { UPDATE, DELETE } from '@/crud';
import { EnumResponse } from '@/enums';
import { parseError, parseRedirect, doRedirect, doError } from '@/utils';
import { IResponse } from '@/types';

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
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
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

		if (!project) throw doError(ErrorCodes.CREATE_FAILED);
		throw doRedirect(dynamicHref(ROOT, { uuid: project.uuid }));
	} catch (error: any) {
		const { shouldRedirect, url } = parseRedirect(error);
		if (shouldRedirect && url) return redirect(error.url);
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
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
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);

		const projects = await getProjectsByUserId(user.id);

		return { status: EnumResponse.SUCCESS, data: projects };
	} catch (error) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
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
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
		const projectIdValue = formData.get('id')?.toString();
		const projectId = projectIdValue
			? Number.parseInt(projectIdValue)
			: undefined;

		const access = await hasProjectAccess(UPDATE.PROJECT, {
			userId: user.id,
			projectId,
		});

		if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

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

		if (!success) throw doError(ErrorCodes.UPDATE_FAILED);
		const project = await getFullProjectByUserId(user.id, { id: projectId });
		if (!project) throw doError(ErrorCodes.UPDATE_FAILED);
		return { status: EnumResponse.SUCCESS, data: project };
	} catch (error) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
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
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
		const projectIdValue = formData.get('id')?.toString();
		const action = formData.get('action')?.toString();

		if (action != 'delete' && action != 'publish' && action != 'unpublish')
			throw doError(ErrorCodes.UNSUPPORTED_ACTION);

		const projectId = projectIdValue
			? Number.parseInt(projectIdValue)
			: undefined;

		// Delete project
		if (action == 'delete') {
			const access = await hasProjectAccess(DELETE.PROJECT, {
				userId: user.id,
				projectId,
			});

			if (!access) throw doError(ErrorCodes.ACCESS_DENIED);
			// DELETE junctions & project & branches
			throw doRedirect(APP);
		}

		const access = await hasProjectAccess(
			action === 'publish' ? UPDATE.PROJECT : UPDATE.VISIBILITY_PROJECT,
			{
				userId: user.id,
				projectId,
			},
		);

		if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

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

		if (!success) throw doError(ErrorCodes.UPDATE_FAILED);
		const project = await getFullProjectByUserId(user.id, { id: projectId });
		if (!project) throw doError(ErrorCodes.UPDATE_FAILED);
		return { status: EnumResponse.SUCCESS, data: project };
	} catch (error: any) {
		const { shouldRedirect, url } = parseRedirect(error);
		if (shouldRedirect && url) return redirect(error.url);
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
	}
}
