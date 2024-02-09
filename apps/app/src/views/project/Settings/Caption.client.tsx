'use client';
import Caption from '@/components/Caption';
import { TAB_BRANCHES } from './config';
import { useCallback } from 'react';
import { useOpenModal } from '@nw/modal';
import { MODALS } from '@/routes';

function CaptionClient({
	headline,
	subheadline,
	add,
	activeTab,
	projectId,
}: {
	headline: string;
	subheadline: string;
	add: string;
	activeTab: string;
	projectId: number;
}) {
	const openModal = useOpenModal();

	const addBranch = useCallback(() => {
		openModal(MODALS.CREATE_BRANCH, { projectId });
	}, [openModal, projectId]);

	return (
		<Caption
			headline={headline}
			subheadline={subheadline}
			add={
				activeTab === TAB_BRANCHES
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
