import React from 'react';

import Header from '~/blocks/clients/Header';
import Body from '~/blocks/clients/Body';

import { getClients } from '~/models/clients';
import { IParams } from '~/types';

async function Page({ params }: IParams) {
	const clients = await getClients({
		projectUUID: params.uuid,
	});

	return (
		<>
			<Header />
			<Body items={clients ?? undefined} />
		</>
	);
}

export default Page;
