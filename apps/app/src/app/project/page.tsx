import { getSession } from '@/headers';
import { getProjectsByUserId } from '@/models/project';
import { getUserFromSession } from '@/models/user';
import Projects from '@/views/project/Projects';

export default async function Project() {
	const user = await getUserFromSession(getSession());
	const projects = await getProjectsByUserId(user?.id);

	return <Projects projects={projects} />;
}
