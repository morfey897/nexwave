'use client';

import React, { useMemo } from 'react';
import { IClient } from '@nw/storage';
import Table from '~/components/table';
import factory from './factory';
import { headerData } from '../config';
import { useTranslations } from 'next-intl';
import Empty from '~/components/errors/Empty';

function Body({ items }: { items?: IClient[] }) {
	const t = useTranslations();

	const header = useMemo(
		() =>
			headerData.map((item) => ({
				...item,
				title: t(`page.clients.header.${item.key}`),
			})),
		[t]
	);

	return (
		<main>
			<Table<IClient> header={header} content={items} factory={factory} />
			{!items?.length && (
				<Empty
					messages={{
						headline: t('page.clients.headline_empty'),
						subheadline: t('page.clients.subheadline_empty'),
					}}
				/>
			)}
		</main>
	);
}

export default Body;
