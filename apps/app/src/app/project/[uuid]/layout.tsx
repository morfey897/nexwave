import Sidebar from '@/components/Sidebar';
import Block from '@/components/Block';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getUserFromSession } from '@/models/user';
import { getProjectByUserId } from '@/models/project';
import { UpdateStore } from '@/providers/StoreProvider';

export default async function ProjectLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { uuid: string };
}) {
	const user = await getUserFromSession();
	const [activeProject] = (await getProjectByUserId(user?.id, {
		uuid: params.uuid,
	})) || [null];

	return (
		<>
			<UpdateStore state={{ activeProject: activeProject || null }} />
			<Sidebar params={params} />
			<Block>
				<Breadcrumbs />
				{children}
			</Block>
		</>
	);
}
