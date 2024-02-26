'use client';
import Caption from '@/components/Caption';
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
}: {
	headline: string;
	subheadline: string;
	add: string;
}) {
	const project = useNWStore((state) => state.project);

	const hasPermission = hasAccess(project?.permission, CREATE.EVENT);

	const openModal = useOpenModal();

	const addEvent = useCallback(() => {
		openModal(MODALS.CREATE_EVENT);
	}, [openModal]);

	return (
		<Caption
			headline={headline}
			subheadline={subheadline}
			hideAddOnScroll
			add={
				hasPermission
					? {
							title: add,
							onClick: addEvent,
						}
					: undefined
			}
		/>
	);
}

export default CaptionClient;
