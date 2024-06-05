import { getInvitations, type IInvitation } from '@/models/invitation';
import { deployNewProject, type IProject } from '@/models/project';
import { createUser, type ICurrentUser } from '@/models/user';

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
	email,
	emailVerified,
	name,
	surname,
	avatar,
	password,
}: {
	email: string;
	emailVerified: boolean;
	name?: string;
	surname?: string;
	avatar?: string;
	password: string | null;
}): Promise<{
	user: ICurrentUser | null;
	project: IProject | null;
	invitations: IInvitation[] | null;
}> {
	const user = await createUser({
		email: email,
		emailVerified: emailVerified,
		password: password,
		name: name,
		surname: surname,
		avatar: avatar,
	});

	if (user) {
		// TODO think about inactive projects
		const invitations = await getInvitations({ email: user.email });
		if (invitations.length == 0) {
			const project = await deployNewProject(user.id);
			return { user, project, invitations: null };
		} else {
			return { user, project: null, invitations };
		}
	}

	return { user, project: null, invitations: null };
}
