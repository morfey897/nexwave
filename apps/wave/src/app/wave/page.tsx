import { getUserFromSession } from '~/models/user';
import { getSession } from '~/utils/headers';
import { getProjectsForUserId } from '~/models/project';
import { redirect } from 'next/navigation';
import { EnumProtectedRoutes } from '~/constants/enums';
import { buildDynamicHref } from '~/utils';

import Loading from './loading';

export default async function Project() {
	const user = await getUserFromSession(getSession());
	const projects = await getProjectsForUserId(user?.id);

	if (projects && projects?.length > 0) {
		return redirect(buildDynamicHref(EnumProtectedRoutes.ROOT, projects[0]));
	}

	// If no projects, redirect to create project
	return <Loading />;
}
