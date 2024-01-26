'use server';
import { redirect } from 'next/navigation';
import { APP } from '@/routes';
import {
	deleteBranch,
	updateBranch,
	IFullProject,
	hasProjectAccess,
	getFullProjectByUserId,
} from '@/models/project';
import { getUserFromSession } from '@/models/user';
import * as ErrorCodes from '@/errorCodes';
import { UPDATE, DELETE } from '@/crud';
import { EnumResponse } from '@/enums';
import { parseError, doError } from '@/utils';
import { IResponse } from '@/types';

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

		const [projectIdValue, branchUuid] =
			formData.get('id')?.toString().split('/') || [];
		const projectId = projectIdValue
			? Number.parseInt(projectIdValue)
			: undefined;

		const access = await hasProjectAccess(UPDATE.BRANCH, {
			userId: user.id,
			projectId,
		});

		if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

		const file = formData.get('image');
		const name = formData.get('name')?.toString();
		const info = formData.get('info')?.toString();
		const addressCountry = formData.get('address.country')?.toString();
		const addressCity = formData.get('address.city')?.toString();
		const addressLine = formData.get('address.address_line')?.toString();
		const addressLine2 = formData.get('address.address_line_2')?.toString();

		// TODO: upload image to cloudinary
		const success = await updateBranch(
			{ uuid: branchUuid },
			{
				name: name,
				info: info?.toString(),
				address: {
					country: addressCountry,
					city: addressCity,
					address_line: addressLine,
					address_line_2: addressLine2,
				},
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
		const [projectIdValue, branchUuid] =
			formData.get('id')?.toString().split('/') || [];
		const action = formData.get('action')?.toString();

		if (action != 'delete' && action != 'publish' && action != 'unpublish')
			throw doError(ErrorCodes.UNSUPPORTED_ACTION);

		const projectId = projectIdValue
			? Number.parseInt(projectIdValue)
			: undefined;

		if (action == 'delete') {
			const access = await hasProjectAccess(DELETE.BRANCH, {
				userId: user.id,
				projectId,
			});

			if (!access) throw doError(ErrorCodes.ACCESS_DENIED);
			const success = await deleteBranch({ uuid: branchUuid });
			if (!success) throw doError(ErrorCodes.DELETE_LAST_FAILED);
		} else {
			const access = await hasProjectAccess(
				action === 'publish' ? UPDATE.BRANCH : UPDATE.VISIBILITY_BRANCH,
				{
					userId: user.id,
					projectId,
				},
			);

			if (!access) throw doError(ErrorCodes.ACCESS_DENIED);

			const success = await updateBranch(
				{ uuid: branchUuid },
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
