'use client';
import { MODALS } from '@/routes';
import LoginView from '@/views/Modal/login';
import AsideSettings from '@/views/Modal/settings';
import AsideProjects from '@/views/Modal/projects';
import ModalProvider from '@/providers/ModalProvider';

function ModalsContainer() {
	return (
		<ModalProvider
			list={{
				[MODALS.LOGIN]: LoginView,
				[MODALS.SETTINGS]: AsideSettings,
				[MODALS.PROJECTS]: AsideProjects,
			}}
		/>
	);
}

export default ModalsContainer;
