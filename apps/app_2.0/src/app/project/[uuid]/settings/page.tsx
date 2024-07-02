import SettingsView from '@/views/project/Settings';
import { getUserFromSession } from '@/models/user';
import { getFullProjectByUserId } from '@/models/project';
import { getSession } from '@/headers';

async function SettingsPage({ params }: { params: { uuid: string } }) {
	const user = await getUserFromSession(getSession());
	const project = await getFullProjectByUserId(user?.id, {
		uuid: params.uuid,
	});

	return <SettingsView project={project} />;
}

export default SettingsPage;
