import React from 'react';
import { getUserFromSession } from '~models/user';
import { getProjectByUserId } from '~models/project';
import { notFound } from 'next/navigation';
import UpdateStore from '~components/user/UpdateStore';
import { getSession } from '~utils/headers';

export default async function ProjectLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { uuid: string };
}) {
	const user = await getUserFromSession(getSession());
	const [project] = (await getProjectByUserId(user?.id, {
		uuid: params.uuid,
	})) || [null];

	if (!project) {
		return notFound();
	}

	return (
		<>
			<UpdateStore state={{ project }} />
			{children}
		</>
	);
}
