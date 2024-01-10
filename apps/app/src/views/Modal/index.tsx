'use client';
import { MODALS } from '@/routes';
import { ModalProvider } from '@nw/modal';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchParams as cfg } from '@nw/config';
import AsideSettings from '@/views/Modal/Settings';
import AsideProjects from '@/views/Modal/Projects';
import CreateProject from '@/views/Modal/CreateProject';

const COMPONENTS = {
	[MODALS.SETTINGS]: AsideSettings,
	[MODALS.PROJECTS]: AsideProjects,
	[MODALS.CREATE_PROJECT]: CreateProject,
};

function ModalsContainer({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams();
	const router = useRouter();

	return (
		<ModalProvider
			prefix={cfg.DIALOG}
			searchParams={searchParams}
			Components={COMPONENTS}
			navigate={(href, replace) =>
				replace ? router.replace(href) : router.push(href)
			}
		>
			{children}
		</ModalProvider>
	);
}

export default ModalsContainer;
