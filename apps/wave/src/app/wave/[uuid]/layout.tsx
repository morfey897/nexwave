import React from 'react';

import type { Metadata } from 'next';
import { getUserFromSession } from '~/models/user';
import { getProjectByUserId } from '~/models/project';
import { notFound } from 'next/navigation';
import UpdateStore from '~/components/user/UpdateStore';
import { getSession, getTheme } from '~/utils/headers';
import { EnumTheme, EnumColor } from '~/constants/enums';
import AccessDenied from '~/components/access-denied';
import { getColorSchema } from '~/utils';

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
		title: project?.name || process.env.NEXT_PUBLIC_TITLE,
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
			<style>
				{`
				:root {
						--user-selected: var(--user-${getColorSchema(project?.color)});
					}
				`}
			</style>
			<UpdateStore
				state={{ project, user, theme: (theme as EnumTheme) || null }}
			/>
			{children}
		</>
	);
}
