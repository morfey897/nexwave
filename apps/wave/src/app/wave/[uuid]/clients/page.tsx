import React from 'react';

import Layout from '~/blocks/clients/Layout';

import { getClients } from '~/models/clients';
import { IParams } from '~/types';

async function Page({ params }: IParams) {
	const clients = await getClients({
		projectUUID: params.uuid,
	});

	return (
		<Layout
			body={{
				items: clients ?? undefined,
			}}
		/>
	);
}

export default Page;
