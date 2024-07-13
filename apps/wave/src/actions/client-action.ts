'use server';

import { IClient } from '@nw/storage';
import { IResponse } from '~/types';
import { EnumResponseStatus } from '~/constants/enums';
import { getClients, updateClient } from '~/models/clients';
import { parseError, doError } from '~/utils';

/**
 * Get clients in the project
 * @param userId
 * @returns IResponse<IFullProject[]>
 */

export async function actionGetClients(
	formData: FormData
): Promise<IResponse<IClient[]>> {
	const projectUUID = formData.get('projectUUID') as string;
	try {
		const clients = await getClients({ projectUUID });
		return {
			status: EnumResponseStatus.SUCCESS,
			data: clients,
		};
	} catch (error: any) {
		return {
			status: EnumResponseStatus.FAILED,
			error: parseError(error),
			data: null,
		};
	}
}

/**
 * Update client
 * @param formData
 * @returns IResponse<null>
 */
export async function actionUpdateClient(formData: FormData) {
	const clientUUID = formData.get('uuid') as string;
	const name = formData.get('name') as string;
	const email = formData.get('email') as string;
	const phone = formData.get('phone') as string;
	const surname = formData.get('surname') as string;
	const badges = formData.getAll('badges') as string[];

	try {
		const newClient = await updateClient(clientUUID, {
			name: name ?? undefined,
			surname: surname ?? undefined,
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
			data: newClient,
		};
	} catch (error: any) {
		return {
			status: EnumResponseStatus.FAILED,
			error: parseError(error),
			data: null,
		};
	}
}
