'use server';

import { IProject } from '@nw/storage';
import { EnumResponseStatus } from '~/constants/enums';
import { IResponse } from '~/types';

// import { redirect } from 'next/navigation';
// import { dynamicHref } from '@/utils';
// import { ROOT, APP, SETTINGS } from '@/routes';
// import {
// 	deployNewProject,
// 	updateProject,
// 	getProjectsByUserId,
// 	IFullProject,
// 	hasProjectAccess,
// 	getFullProjectByUserId,
// } from '@/models/project';
// import { getUserFromSession } from '@/models/user';
// import * as ErrorCodes from '@/errorCodes';
// import { UPDATE, DELETE } from '@/crud';
// import { EnumResponse, EnumRole, EnumState } from '@/enums';
// import { parseError, parseRedirect, doRedirect, doError } from '@/utils';
// import { IResponse } from '@/types';
// import { S_PARAMS } from '@nw/config';
// import { getSession } from '@/headers';

/**
 * Create project
 * @param formData
 * @returns IResponse
 */
export async function actionCreateNewProject(
	formData: FormData
): Promise<IResponse<IProject>> {
	// try {
	// 	const user = await getUserFromSession(getSession());
	// 	if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
	// 	const file = formData.get('image');
	// 	const name = formData.get('name')?.toString();
	// 	const color = formData.get('color')?.toString();
	// 	const currency = formData.get('currency')?.toString();
	// 	const info = formData.get('info')?.toString();

	// 	// TODO: upload image to cloudinary
	// 	const project = await deployNewProject(user.id, {
	// 		name: name,
	// 		color: color,
	// 		currency: currency,
	// 		info: info,
	// 		// image: file,
	// 	});

	// 	if (!project) throw doError(ErrorCodes.CREATE_FAILED);
	// 	throw doRedirect(dynamicHref(ROOT, { uuid: project.uuid }));
	// } catch (error: any) {
	// 	const { shouldRedirect, url } = parseRedirect(error);
	// 	if (shouldRedirect && url) return redirect(url);
	// 	console.log('ERROR', error);
	// 	return { status: EnumResponse.FAILED, error: parseError(error) };
	// }
	return { status: EnumResponseStatus.SUCCESS, data: null };
}

/**
 * Update project
 * @param formData
 * @returns IResponse
 */
export async function actionUpdateProject(
	formData: FormData
): Promise<IResponse<unknown>> {
	// try {
	// 	const user = await getUserFromSession(getSession());
	// 	if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
	// 	const projectId = Number.parseInt(formData.get('id')?.toString() || '');

	// 	const access = await hasProjectAccess(UPDATE.PROJECT, {
	// 		userId: user.id,
	// 		projectId,
	// 	});

	// 	if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

	// 	const file = formData.get('image');
	// 	const name = formData.get('name')?.toString();
	// 	const color = formData.get('color')?.toString();
	// 	const currency = formData.get('currency')?.toString();
	// 	const info = formData.get('info')?.toString();

	// 	// TODO: upload image to cloudinary
	// 	const success = await updateProject(
	// 		{ id: projectId },
	// 		{
	// 			name: name,
	// 			color: color,
	// 			currency: currency,
	// 			info: info,
	// 			// image: file,
	// 		}
	// 	);

	// 	if (!success) throw doError(ErrorCodes.UPDATE_FAILED);
	// 	const project = await getFullProjectByUserId(user.id, { id: projectId });
	// 	if (!project) throw doError(ErrorCodes.UPDATE_FAILED);
	// 	return { status: EnumResponse.SUCCESS, data: project };
	// } catch (error) {
	// 	console.log('ERROR', error);
	// 	return { status: EnumResponse.FAILED, error: parseError(error) };
	// }
	return { status: EnumResponseStatus.SUCCESS, data: null };
}

/**
 * Update access project
 * @param formData
 * @returns IResponse
 */
export async function actionUpdateAccessProject(
	formData: FormData
): Promise<IResponse<unknown>> {
	// try {
	// 	const user = await getUserFromSession(getSession());
	// 	if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
	// 	const { id: projectIdValue, ...formValue } = Object.fromEntries(
	// 		formData.entries()
	// 	);
	// 	const projectId = Number.parseInt(projectIdValue?.toString() || '');

	// 	const access = await hasProjectAccess(UPDATE.PROJECT_ACCESS, {
	// 		userId: user.id,
	// 		projectId,
	// 	});

	// 	if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

	// 	const roles = Object.entries(formValue).reduce(
	// 		(accum, [key, value]) => {
	// 			const [role] = key.split('.');
	// 			if (
	// 				role === EnumRole.super ||
	// 				role === EnumRole.admin ||
	// 				role === EnumRole.user ||
	// 				role === EnumRole.manager
	// 			) {
	// 				const access = Number.parseInt(value.toString());
	// 				if (!Number.isNaN(access)) {
	// 					accum[role] = accum[role] | access;
	// 				}
	// 			}
	// 			return accum;
	// 		},
	// 		{
	// 			[EnumRole.super]: 0,
	// 			[EnumRole.admin]: 0,
	// 			[EnumRole.user]: 0,
	// 			[EnumRole.manager]: 0,
	// 		} as Record<string, number>
	// 	);

	// 	const success = await updateProject(
	// 		{ id: projectId },
	// 		{
	// 			roles: roles,
	// 		}
	// 	);

	// 	if (!success) throw doError(ErrorCodes.UPDATE_FAILED);
	// 	const project = await getFullProjectByUserId(user.id, { id: projectId });
	// 	if (!project) throw doError(ErrorCodes.UPDATE_FAILED);
	// 	return { status: EnumResponse.SUCCESS, data: project };
	// } catch (error) {
	// 	console.log('ERROR', error);
	// 	return { status: EnumResponse.FAILED, error: parseError(error) };
	// }
	return { status: EnumResponseStatus.SUCCESS, data: {} };
}

/**
 * Update project visibility
 * @param formData
 * @returns IResponse
 */
export async function actionUpdateVisibilityProject(
	formData: FormData
): Promise<IResponse<IProject>> {
	// try {
	// 	const user = await getUserFromSession(getSession());
	// 	if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
	// 	const action = formData.get('action')?.toString();

	// 	if (action != 'delete' && action != 'publish' && action != 'unpublish')
	// 		throw doError(ErrorCodes.UNSUPPORTED_ACTION);

	// 	const projectId = Number.parseInt(formData.get('id')?.toString() || '');

	// 	// Delete project
	// 	if (action == 'delete') {
	// 		const access = await hasProjectAccess(DELETE.PROJECT, {
	// 			userId: user.id,
	// 			projectId,
	// 		});

	// 		if (!access) throw doError(ErrorCodes.ACCESS_DENIED);
	// 		// DELETE junctions & project & branches
	// 		throw doRedirect(APP);
	// 	}

	// 	const access = await hasProjectAccess(
	// 		action === 'publish' ? UPDATE.PROJECT : UPDATE.UNPUBLISH_PROJECT,
	// 		{
	// 			userId: user.id,
	// 			projectId,
	// 		}
	// 	);

	// 	if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

	// 	const success = await updateProject(
	// 		{ id: projectId },
	// 		{
	// 			state:
	// 				action == 'publish'
	// 					? EnumState.ACTIVE
	// 					: action == 'unpublish'
	// 						? EnumState.INACTIVE
	// 						: undefined,
	// 		}
	// 	);

	// 	if (!success) throw doError(ErrorCodes.UPDATE_FAILED);
	// 	const project = await getFullProjectByUserId(user.id, { id: projectId });
	// 	if (!project) throw doError(ErrorCodes.UPDATE_FAILED);
	// 	return { status: EnumResponse.SUCCESS, data: project };
	// } catch (error: any) {
	// 	const { shouldRedirect, url } = parseRedirect(error);
	// 	if (shouldRedirect && url) return redirect(url);
	// 	console.log('ERROR', error);
	// 	return { status: EnumResponse.FAILED, error: parseError(error) };
	// }
	return { status: EnumResponseStatus.SUCCESS, data: null };
}
