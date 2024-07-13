'use client';

import React, { useMemo, useState } from 'react';
import { IClient } from '@nw/storage';
import Table from '~/components/table';
import getItems from './__mock__';
import factory from './factory';
import headerData from './table-header';
import { useTranslations } from 'next-intl';
import EditViewAction from './components/EditViewAction';
import { useAction, useAPI } from '~/hooks/action';
import useNWStore from '~/lib/store';
import { buildDynamicHref } from '~/utils';
import { EnumApiRoutes } from '~/constants/enums';

function Body() {
	const t = useTranslations();
	const [items] = useState([]);

	// const {} = useAction(serverAction);

	// const project = useNWStore((state) => state.project);

	// const { result, pending } = useAPI<IClient[] | null>(() =>
	// 	project && project.uuid
	// 		? buildDynamicHref(EnumApiRoutes.CLIENTS, project)
	// 		: null
	// );

	// console.log(project && buildDynamicHref(EnumApiRoutes.CLIENTS, project));

	const header = useMemo(
		() =>
			headerData.map((item) => ({
				...item,
				title: t(`page.clients.${item.key}`),
			})),
		[t]
	);

	return (
		<>
			<main>
				<Table<IClient> header={header} content={items} factory={factory} />
			</main>
			{/* Actions */}
			<EditViewAction />
		</>
	);
}

export default Body;
