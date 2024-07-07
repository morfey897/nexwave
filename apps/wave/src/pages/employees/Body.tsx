import React, { useMemo } from 'react';
import { IEmployee } from '@nw/storage';
import Table from '~/components/table';
import items from './__mock__';
import factory from './factory';
import headerData from './table-header';
import { useTranslations } from 'next-intl';

function Body() {
	const t = useTranslations();

	const header = useMemo(
		() =>
			headerData.map((item) => ({
				...item,
				title: t(`page.employees.${item.key}`),
			})),
		[t]
	);

	return (
		<main>
			<Table<IEmployee> header={header} content={items} factory={factory} />
		</main>
	);
}

export default Body;
