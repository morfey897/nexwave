'use client';
import Caption from '@/components/Caption';
import { TAB_BRANCHES } from './config';
import { useCallback } from 'react';
import { useOpenModal } from '@nw/modal';
import { MODALS } from '@/routes';
import useNWStore from '@/lib/store';
import { hasAccess } from '@/utils';
import { CREATE } from '@/crud';

function CaptionClient({
	headline,
	subheadline,
	add,
	activeTab,
}: {
	headline: string;
	subheadline: string;
	add: string;
	activeTab: string;
}) {
	const project = useNWStore((state) => state.project);
	const hasPermission = hasAccess(project?.permission, CREATE.BRANCH);
	const openModal = useOpenModal();

	const addBranch = useCallback(() => {
		openModal(MODALS.CREATE_BRANCH);
	}, [openModal]);

	return (
		<Caption
			headline={headline}
			subheadline={subheadline}
			add={
				activeTab === TAB_BRANCHES && hasPermission
					? {
							title: add,
							onClick: addBranch,
						}
					: undefined
			}
		/>
	);
}

export default CaptionClient;
