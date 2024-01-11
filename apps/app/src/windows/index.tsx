'use client';
import { MODALS } from '@/routes';
import { ModalProvider } from '@nw/modal';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchParams as cfg } from '@nw/config';
import AsideSettings from '@/windows/WndSettings';
import AsideProjects from '@/windows/WndProjects';
import CreateProject from '@/windows/WndCreateProject';
import { useCallback } from 'react';

const COMPONENTS = {
	[MODALS.SETTINGS]: AsideSettings,
	[MODALS.PROJECTS]: AsideProjects,
	[MODALS.CREATE_PROJECT]: CreateProject,
};

function ModalsContainer({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const navigate = useCallback(
		(href: string, replace: boolean) => {
			replace ? router.replace(href) : router.push(href);
		},
		[router],
	);

	return (
		<ModalProvider
			prefix={cfg.DIALOG}
			searchParams={searchParams}
			Components={COMPONENTS}
			navigate={navigate}
		>
			{children}
		</ModalProvider>
	);
}

export default ModalsContainer;
