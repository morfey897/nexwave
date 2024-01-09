'use client';
import { MODALS } from '@/routes';
import { ModalProvider } from '@nw/modal';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchParams as cfg } from '@nw/config';
import AsideSettings from '@/views/Modal/settings';
import AsideProjects from '@/views/Modal/projects';
import AddProject from './AddProject';

const COMPONENTS = {
	[MODALS.SETTINGS]: AsideSettings,
	[MODALS.PROJECTS]: AsideProjects,
	[MODALS.ADD_PROJECT]: AddProject,
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
