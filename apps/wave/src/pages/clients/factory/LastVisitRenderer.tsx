import React from 'react';
import { IClient } from '@nw/storage';
import { useDateLocale } from '~/hooks/datetime';
import { differenceInDays, format } from 'date-fns';
import { useTranslations } from 'next-intl';

const LastVisitRenderer = ({ item }: { item: IClient }) => {
	const t = useTranslations();
	const NOW = new Date(new Date().toISOString().split('T')[0]);
	const dateLocale = useDateLocale();

	const date = new Date(item?.lastVisitAt || item.createdAt);
	const isValid = !Number.isNaN(date.getTime());
	if (!isValid) return '';
	const days = differenceInDays(NOW, date);

	if (days <= 7) return t('day.days_ago_', { count: days });

	return (
		<p>
			{format(date, 'dd MMM yyyy', {
				locale: dateLocale,
			})}
		</p>
	);
};

export default LastVisitRenderer;
