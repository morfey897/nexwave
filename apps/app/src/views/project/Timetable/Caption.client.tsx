'use client';
import Caption from '@/components/Caption';
import { useCallback } from 'react';
import { useOpenModal } from '@nw/modal';
import { MODALS } from '@/routes';

function CaptionClient({
	headline,
	subheadline,
	add,
	projectId,
}: {
	headline: string;
	subheadline: string;
	add: string;
	projectId: number;
}) {
	const openModal = useOpenModal();

	const addEvent = useCallback(() => {
		openModal(MODALS.CREATE_BRANCH, { projectId });
	}, [openModal, projectId]);

	return (
		<Caption
			headline={headline}
			subheadline={subheadline}
			hideAddOnScroll
			add={{
				title: add,
				onClick: addEvent,
			}}
		/>
	);
}

export default CaptionClient;
