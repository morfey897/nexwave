'use server';
import { redirect } from 'next/navigation';
import { dynamicHref } from '@/utils';
import { ROOT } from '@/routes';
import {
	TProjectToUser,
	deployNewProject,
	getProjectByUserId,
} from '@/models/project';
import { getUserFromSession } from '@/models/user';
import * as ErrorCodes from '@/errorCodes';
import { EnumResponse } from '@/enums';
import { getError } from '@/utils';
import { IResponse } from '@/types';

export async function createProject(formData: FormData): Promise<IResponse> {
	try {
		const user = await getUserFromSession();
		if (!user) throw { code: ErrorCodes.USER_UNAUTHORIZED };
		const file = formData.get('image');
		const name = formData.get('name');
		const color = formData.get('color');

		// TODO: upload image to cloudinary
		const project = await deployNewProject(user.id, {
			name: name?.toString(),
			color: color?.toString(),
			// image: file,
		});

		if (!project) throw { code: ErrorCodes.PROJECT_CREATE_FAILED };
		return redirect(dynamicHref(ROOT, { uuid: project.uuid }));
	} catch (error) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: getError(error) };
	}
}

/**
 * Get projects
 * @returns IResponse
 */
export async function getProjects(): Promise<
	IResponse<TProjectToUser[] | null>
> {
	try {
		const user = await getUserFromSession();
		if (!user) throw { code: ErrorCodes.USER_UNAUTHORIZED };

		const projects = await getProjectByUserId(user.id);

		return { status: EnumResponse.SUCCESS, data: projects };
	} catch (error) {
		console.log('ERROR', error);
		return { status: EnumResponse.FAILED, error: getError(error) };
	}
}
