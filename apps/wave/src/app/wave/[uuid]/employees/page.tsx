import React from 'react';

import Header from '~/blocks/employees/Header';
import Body from '~/blocks/employees/Body';
import { getEmployees } from '~/models/user';
import { IParams } from '~/types';

async function Page({ params }: IParams) {
	const employees = await getEmployees({
		projectUUID: '7f15acd1-eb35-480c-a86d-7d459842e7e7',
	});

	return (
		<>
			<Header />
			<Body items={employees ?? undefined} />
		</>
	);
}

export default Page;
