'use client';
import { createPortal } from 'react-dom';
import { MODALS } from '@/routes';
import { ModalProvider } from '@nw/modal';
import { useSearchParams, useRouter } from 'next/navigation';
import { S_PARAMS } from '@nw/config';
import AsideSettings from '@/windows/WndPanelSettings';
import AsideProjects from '@/windows/WndPanelProjects';
import CreateProject from '@/windows/WndCreateProject';
import CreateBranch from '@/windows/WndCreateBranch';
import { useCallback, useRef, useEffect, useState } from 'react';

const COMPONENTS = {
	[MODALS.SETTINGS]: AsideSettings,
	[MODALS.PROJECTS]: AsideProjects,
	[MODALS.CREATE_PROJECT]: CreateProject,
	[MODALS.CREATE_BRANCH]: CreateBranch,
};

function ModalsContainer() {
	// const searchParams = useSearchParams();
	// const router = useRouter();

	// const navigate = useCallback(
	// 	(href: string, replace: boolean) => {
	// 		replace ? router.replace(href) : router.push(href);
	// 	},
	// 	[router],
	// );

	// return (
	// 	<ModalProvider
	// 		prefix={S_PARAMS.DIALOG}
	// 		searchParams={searchParams}
	// 		Components={COMPONENTS}
	// 		navigate={navigate}
	// 	>
	// 		{children}
	// 	</ModalProvider>
	// );

	const ref = useRef<Element | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		ref.current = document.body;
		setMounted(true);
	}, []);

	return mounted && ref.current
		? createPortal(
				<ModalProvider Components={COMPONENTS} data-name='modals' />,
				ref.current,
			)
		: null;
}

export default ModalsContainer;
