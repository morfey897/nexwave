'use client';

import React, { useMemo } from 'react';
import { IEmployee } from '@nw/storage';
import Table from '~/components/table';
import ViewEmployeeAction from './components/ViewEmployeeAction';
import factory from './factory';
import headerData from './table-header';
import { useTranslations } from 'next-intl';
import Empty from '~/components/errors/Empty';

function Body({ items }: { items?: IEmployee[] }) {
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
		<>
			<main>
				<Table<IEmployee> header={header} content={items} factory={factory} />
				{!items?.length && (
					<Empty
						messages={{
							headline: t('page.employees.headline_empty'),
							subheadline: t('page.employees.subheadline_empty'),
						}}
					/>
				)}
			</main>
			{/* Action */}
			<ViewEmployeeAction />
		</>
	);
}

export default Body;
