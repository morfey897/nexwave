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
import ErrorLayout from '~/components/errors/ErrorLayout';
import { IoIosWarning } from 'react-icons/io';
import Empty from '~/components/errors/Empty';

function Body({ items }: { items?: IClient[] }) {
	const t = useTranslations();

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
				{!items?.length && (
					<Empty
						messages={{
							headline: t('page.clients.headline_empty'),
							subheadline: t('page.clients.subheadline_empty'),
						}}
					/>
				)}
			</main>
			{/* Actions */}
			<EditViewAction />
		</>
	);
}

export default Body;
