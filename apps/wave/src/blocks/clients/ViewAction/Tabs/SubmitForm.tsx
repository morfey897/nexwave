'use client';

import { useCallback } from 'react';
import useNWStore from '~/lib/store';
import { actionUpdateClient } from '~/actions/client-action';
import { IClient } from 'packages/storage/dist';
import Form from '~/components/form/SubmitForm/Form';

function SubmitForm({ children }: { children?: React.ReactNode }) {
	const client = useNWStore((state) => state.clients.active);
	const updateClients = useNWStore((state) => state.updateClients);

	const onSuccess = useCallback(
		(data: IClient) => {
			updateClients({ active: data });
		},
		[updateClients]
	);

	return (
		<Form
			onSuccess={onSuccess}
			serverAction={actionUpdateClient}
			hiddens={{ clientUUID: client?.uuid || '' }}
		>
			{children}
		</Form>
	);
}

export default SubmitForm;
