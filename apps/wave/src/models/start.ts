// import { getInvitations, type IInvitation } from '@/models/invitation';
import { deployNewProject } from '~/models/project';
import { createUser, type ICurrentUser } from '~/models/user';

/**
 * First contact with the app
 * @param email - string
 * @param emailVerified - boolean
 * @param name - string
 * @param surname - string
 * @param avatar - string
 * @param password - string
 */
export async function start({
	login,
	name,
	surname,
	avatar,
	password,
	timezone,
	langs,
}: {
	login: string;
	name?: string;
	surname?: string;
	avatar?: string;
	password: string | null;
	timezone?: string;
	langs?: string[];
}): Promise<ICurrentUser | null> {
	// Generate user
	const user = await createUser({
		login,
		password,
		name,
		surname,
		avatar,
	});

	if (!user) {
		return null;
	}

	// Generate project
	await deployNewProject(user.id, { timezone, langs });

	// TODO if user has project redirect to project page
	// if (user) {
	// 	// TODO think about inactive projects
	// 	const invitations = await getInvitations({ email: user.email });
	// 	if (invitations.length == 0) {
	// 		const project = await deployNewProject(user.id);
	// 		return { user, project, invitations: null };
	// 	} else {
	// 		return { user, project: null, invitations };
	// 	}
	// }

	return user;
}
