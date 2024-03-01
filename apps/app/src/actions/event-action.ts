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
import { EnumResponse, EnumState, EnumRepeatPeriod } from '@/enums';
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
export async function actionCreateNewEvent(
	formData: FormData,
): Promise<IResponse<any>> {
	try {
		const user = await getUserFromSession();
		if (!user) throw doError(ErrorCodes.USER_UNAUTHORIZED);

		const projectId = Number.parseInt(formData.get('id')?.toString() || '');
		const access = await hasProjectAccess(CREATE.EVENT, {
			userId: user.id,
			projectId,
		});

		if (!access || !projectId) throw doError(ErrorCodes.ACCESS_DENIED);

		const serviceId = Number.parseInt(formData.get('service_id')?.toString() || '');
		const branchId = Number.parseInt(formData.get('branch_id')?.toString() || '');
		const name = formData.get('name')?.toString();
		const info = formData.get('info')?.toString();
		const color = formData.get('color')?.toString();
		const spaceShortId = formData.get('space_short_id')?.toString();
		const fromTime = formData.get('from_time')?.toString();
		const toTime = formData.get('to_time')?.toString();
		const date = formData.get('date')?.toString();

		const rrule = formData.get('rrule')?.toString() === 'on';
		const repeatInterval = formData.get('repeat_interval')?.toString();
		const repeatPeriod = formData.get('repeat_period')?.toString(); //EnumRepeatPeriod

		const week = [1, 2, 3, 4, 5, 6, 0].reduce<Record<string, boolean>>(
			(map, day) => {
				const key = `day_${day}`;
				map[key] = formData.get(key)?.toString() === 'on';
				return map;
			},
			{},
		);

		const endNever = formData.get('end_never')?.toString() === 'on';
		const endOnDate = formData.get('end_on_date')?.toString();

		console.log('actionCreateNewEvent', Object.fromEntries(formData.entries()));
		console.log('serializedData', {
			serviceId,
			branchId,
			name,
			info,
			color,
			spaceShortId,
			fromTime,
			toTime,
			date,
			rrule,
			repeatInterval,
			repeatPeriod,
			week,
			endNever,
			endOnDate,
		});

		// // TODO: upload image to cloudinary
		// const newBranch = await createBranch({
		// 	projectId: projectId,
		// 	name: name,
		// 	info: info,
		// 	address: {
		// 		country: addressCountry,
		// 		city: addressCity,
		// 		address_line: addressLine,
		// 		address_line_2: addressLine2,
		// 	},
		// 	// image: file,
		// });
		// if (!newBranch) throw doError(ErrorCodes.CREATE_FAILED);
		// const project = await getFullProjectByUserId(user.id, { id: projectId });
		// if (!project) throw doError(ErrorCodes.CREATE_FAILED);
		return {
			status: EnumResponse.SUCCESS,
			data: {},
			// data: { project, branch: newBranch },
		};
	} catch (error: any) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: parseError(error) };
	}
}
