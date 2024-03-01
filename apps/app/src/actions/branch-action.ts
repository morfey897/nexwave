'use server';
import { redirect } from 'next/navigation';
import { APP, SETTINGS } from '@/routes';
import {
	deleteBranch,
	updateBranch,
	IFullProject,
	hasProjectAccess,
	getFullProjectByUserId,
	createBranch,
	IFullBranch,
} from '@/models/project';
import { getUserFromSession } from '@/models/user';
import * as ErrorCodes from '@/errorCodes';
import { UPDATE, DELETE, CREATE } from '@/crud';
import { EnumResponse, EnumState } from '@/enums';
import {
	parseError,
	doError,
	parseRedirect,
	doRedirect,
	dynamicHref,
} from '@/utils';
import { IResponse } from '@/types';
import { S_PARAMS } from '@nw/config';

/**
 * Create new branch
 * @returns IResponse
 */
export async function actionCreateNewBranch(
	formData: FormData,
): Promise<IResponse<{ project: IFullProject; branch: IFullBranch }>> {
	try {
		const user = await getUserFromSession();
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);

		const projectId = Number.parseInt(formData.get('id')?.toString() || '');
		const access = await hasProjectAccess(CREATE.BRANCH, {
			userId: user.id,
			projectId,
		});

		if (!access || !projectId) throw doError(ErrorCodes.ACCESS_DENIED);

		const file = formData.get('image');
		const name = formData.get('name')?.toString();
		const info = formData.get('info')?.toString();
		const addressCountry = formData.get('address.country')?.toString();
		const addressCity = formData.get('address.city')?.toString();
		const addressLine = formData.get('address.address_line')?.toString();
		const addressLine2 = formData.get('address.address_line_2')?.toString();

		// TODO: upload image to cloudinary
		const newBranch = await createBranch({
			projectId: projectId,
			name: name,
			info: info,
			address: {
				country: addressCountry,
				city: addressCity,
				address_line: addressLine,
				address_line_2: addressLine2,
			},
			// image: file,
		});
		if (!newBranch) throw doError(ErrorCodes.CREATE_FAILED);
		const project = await getFullProjectByUserId(user.id, { id: projectId });
		if (!project) throw doError(ErrorCodes.CREATE_FAILED);
		return {
			status: EnumResponse.SUCCESS,
			data: { project, branch: newBranch },
		};
	} catch (error: any) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
	}
}

/**
 * Update branch
 * @param formData
 * @returns IResponse
 */
// TODO: update branch
export async function actionUpdateBranch(
	formData: FormData,
): Promise<IResponse<IFullProject>> {
	try {
		const user = await getUserFromSession();
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);

		const projectId = Number.parseInt(formData.get('id')?.toString() || '');

		const access = await hasProjectAccess(UPDATE.BRANCH, {
			userId: user.id,
			projectId,
		});

		if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

		const file = formData.get('image');
		const branchUuid = formData.get('branch_uuid')?.toString();
		const name = formData.get('name')?.toString();
		const info = formData.get('info')?.toString();
		const addressCountry = formData.get('address.country')?.toString();
		const addressCity = formData.get('address.city')?.toString();
		const addressLine = formData.get('address.address_line')?.toString();
		const addressLine2 = formData.get('address.address_line_2')?.toString();
		const spaces: Array<{ shortId: string; name: string }> = [];

		formData.forEach((value, key) => {
			if (key.startsWith('spaces')) {
				const [_, index, shortId] = key.split('.');
				spaces[parseInt(index)] = { shortId, name: value.toString() };
			}
		});

		// TODO: upload image to cloudinary
		const success = await updateBranch(
			{ uuid: branchUuid },
			{
				name: name,
				info: info,
				address: {
					country: addressCountry,
					city: addressCity,
					address_line: addressLine,
					address_line_2: addressLine2,
				},
				spaces: spaces,
				// image: file,
			},
		);

		if (!success) throw doError(ErrorCodes.UPDATE_FAILED);
		const project = await getFullProjectByUserId(user.id, { id: projectId });
		if (!project) throw { code: ErrorCodes.UPDATE_FAILED };
		return { status: EnumResponse.SUCCESS, data: project };
	} catch (error) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
	}
}

/**
 * Update branch visibility
 * @param formData
 * @returns IResponse
 */
export async function actionUpdateVisibilityBranch(
	formData: FormData,
): Promise<IResponse<IFullProject> | never> {
	try {
		const user = await getUserFromSession();
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);
		const [projectId, branchId] = (
			formData.get('id')?.toString().split('/') || []
		).map((v) => parseInt(v));
		const action = formData.get('action')?.toString();

		if (action != 'delete' && action != 'publish' && action != 'unpublish')
			throw doError(ErrorCodes.UNSUPPORTED_ACTION);

		if (action == 'delete') {
			const access = await hasProjectAccess(DELETE.BRANCH, {
				userId: user.id,
				projectId,
			});

			if (!access) throw doError(ErrorCodes.ACCESS_DENIED);
			const success = await deleteBranch({ id: branchId });
			if (!success) throw doError(ErrorCodes.DELETE_LAST_FAILED);
		} else {
			const access = await hasProjectAccess(
				action === 'publish' ? UPDATE.BRANCH : UPDATE.UNPUBLISH_BRANCH,
				{
					userId: user.id,
					projectId,
				},
			);

			if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

			const success = await updateBranch(
				{ id: branchId },
				{
					state:
						action == 'publish'
							? EnumState.ACTIVE
							: action == 'unpublish'
								? EnumState.INACTIVE
								: undefined,
				},
			);

			if (!success) throw doError(ErrorCodes.UPDATE_FAILED);
		}

		const project = await getFullProjectByUserId(user.id, { id: projectId });
		if (!project)
			throw doError(
				action === 'delete'
					? ErrorCodes.DELETE_FAILED
					: ErrorCodes.UPDATE_FAILED,
			);
		return { status: EnumResponse.SUCCESS, data: project };
	} catch (error: any) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
	}
}
