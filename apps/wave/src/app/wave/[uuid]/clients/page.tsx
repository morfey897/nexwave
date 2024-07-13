import React from 'react';

import Header from '~/blocks/clients/Header';
import Body from '~/blocks/clients/Body';

import { getClients } from '~/models/clients';
import { IParams } from '~/types';

async function Page({ params }: IParams) {
	const result = await getClients({ projectUUID: "7f15acd1-eb35-480c-a86d-7d459842e7e7" });

	return (
		<>
			<Header />
			<Body />
		</>
	);
}

export default Page;
