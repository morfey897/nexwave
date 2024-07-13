'use server';

import { IEmployee } from '@nw/storage';
import { IResponse } from '~/types';
import { EnumResponseStatus } from '~/constants/enums';
import { updateEmployee } from '~/models/employee';
import { parseError, doError } from '~/utils';

/**
 * Update client
 * @param formData
 * @returns IResponse<null>
 */
export async function actionUpdateEmployee(formData: FormData) {
	const projectUUID = formData.get('projectUUID') as string;

	const employeeUUID = formData.get('uuid') as string;
	const name = formData.get('name') as string;
	const email = formData.get('email') as string;
	const phone = formData.get('phone') as string;
	const surname = formData.get('surname') as string;
	const birthday = formData.get('birthday') as string;
	const badges = formData.getAll('badges') as string[];
	const role = formData.get('role') as string;

	try {
		const newEmployee = await updateEmployee(projectUUID, employeeUUID, {
			name: name ?? undefined,
			surname: surname ?? undefined,
			birthday: birthday ?? undefined,
			role: role ?? undefined,
			contacts: {
				email: email ?? undefined,
				phone: phone ?? undefined,
			},
			meta: {
				badges: (badges ? badges.join(',') : undefined) as string,
			},
		});
		return {
			status: EnumResponseStatus.SUCCESS,
			data: newEmployee,
		};
	} catch (error: any) {
		return {
			status: EnumResponseStatus.FAILED,
			error: parseError(error),
			data: null,
		};
	}
}
