// import { getInvitations, type IInvitation } from '@/models/invitation';
import { deployNewProject } from '~/models/project';
import { createUser } from '~/models/user';

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
}): ReturnType<typeof createUser> {
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

	return user;
}
