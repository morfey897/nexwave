import Sidebar from '@/views/Sidebar';
import Block from '@/components/Block';
import Breadcrumbs from '@/views/Breadcrumbs';
import { getUserFromSession } from '@/models/user';
import { getProjectsByUserId } from '@/models/project';
import { UpdateStore } from '@/providers/StoreProvider';
import { getPathname } from '@/headers';

export default async function ProjectLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { uuid: string };
}) {
	const user = await getUserFromSession();
	const [project] = (await getProjectsByUserId(user?.id, {
		uuid: params.uuid,
	})) || [null];

	const pathname = getPathname();

	return (
		<>
			<UpdateStore state={{ project: project || null }} />
			<Sidebar params={params} pathname={pathname} />
			<Block>
				<Breadcrumbs pathname={pathname} />
				{children}
			</Block>
		</>
	);
}
