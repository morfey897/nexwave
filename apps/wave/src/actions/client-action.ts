'use server';

import { IClient } from '@nw/storage';
import { IResponse } from '~/types';
import { EnumResponseStatus } from '~/constants/enums';
import { getClients } from '~/models/clients';
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
