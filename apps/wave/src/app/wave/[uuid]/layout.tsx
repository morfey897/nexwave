import React from 'react';

import type { Metadata } from 'next';
import { getUserFromSession } from '~/models/user';
import { getProjectByUserId } from '~/models/project';
import { notFound } from 'next/navigation';
import UpdateStore from '~/components/user/UpdateStore';
import { getSession, getTheme } from '~/utils/headers';
import { EnumTheme } from '~/constants/enums';
import AccessDenied from '~/components/access-denied';
import ColorSchema from '~/components/user/ColorSchema';

export async function generateMetadata({
	params,
}: {
	params: { uuid: string };
}): Promise<Metadata> {
	const user = await getUserFromSession(getSession());
	if (!user) {
		return notFound();
	}

	const project = await getProjectByUserId(user?.id, params.uuid);
	return {
		other: {
			custom_meta: project?.color || 'blue',
		},
	};
}

export default async function ProjectLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { uuid: string };
}) {
	const theme = getTheme();
	const user = await getUserFromSession(getSession());
	if (!user) {
		return notFound();
	}

	const project = await getProjectByUserId(user?.id, params.uuid);

	if (!project) {
		return <AccessDenied />;
	}

	return (
		<>
			<ColorSchema color={project.color} />
			<UpdateStore
				state={{ project, user, theme: (theme as EnumTheme) || null }}
			/>
			{children}
		</>
	);
}
