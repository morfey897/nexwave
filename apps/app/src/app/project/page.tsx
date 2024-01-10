import { getProjectByUserId } from '@/models/project';
import { getUserFromSession } from '@/models/user';
import ListOfProjects from '@/views/project/ListOfProjects';

export default async function Project() {
	const user = await getUserFromSession();
	const projects = await getProjectByUserId(user?.id);

	return <ListOfProjects projects={projects} />;
}
