'use client';
import { MODALS } from '@/routes';
// import LoginView from '@/views/Modal/login';
import AsideSettings from '@/views/Modal/settings';
import AsideProjects from '@/views/Modal/projects';
import { ModalProvider } from '@nw/modal';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchParams as cfg } from '@nw/config';

const COMPONENTS = {
	// [MODALS.LOGIN]: LoginView,
	[MODALS.SETTINGS]: AsideSettings,
	[MODALS.PROJECTS]: AsideProjects,
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
