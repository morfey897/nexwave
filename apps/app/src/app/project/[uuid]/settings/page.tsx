import SettingsView from '@/views/project/Settings';
import { getUserFromSession } from '@/models/user';
import { getFullProjectByUserId } from '@/models/project';

async function Settings({ params }: { params: { uuid: string } }) {
	const user = await getUserFromSession();
	const project = await getFullProjectByUserId(user?.id, {
		uuid: params.uuid,
	});

	return <SettingsView project={project} />;
}

export default Settings;
