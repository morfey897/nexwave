import React from 'react';

import Header from '~/blocks/employees/Header';
import Body from '~/blocks/employees/Body';
import { getEmployees } from '~/models/employee';
import { IParams } from '~/types';

async function Page({ params }: IParams) {
	const employees = await getEmployees({
		projectUUID: params.uuid,
	});

	return (
		<>
			<Header />
			<Body items={employees ?? undefined} />
		</>
	);
}

export default Page;
