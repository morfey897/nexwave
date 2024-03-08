import Sidebar from '@/views/Sidebar';
import Block from '@/components/Block';
import { getUserFromSession } from '@/models/user';
import { getProjectsByUserId } from '@/models/project';
import { UpdateStore } from '@/providers/StoreProvider';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/views/Breadcrumbs';
import { getSession } from '@/headers';

export default async function ProjectLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { uuid: string };
}) {
	const user = await getUserFromSession(getSession());
	const [project] = (await getProjectsByUserId(user?.id, {
		uuid: params.uuid,
	})) || [null];

	if (!project) {
		return notFound();
	}

	return (
		<>
			<UpdateStore state={{ project }} />
			<Sidebar params={params} />
			<Block>
				<Breadcrumbs project={project} />
				{children}
			</Block>
		</>
	);
}
