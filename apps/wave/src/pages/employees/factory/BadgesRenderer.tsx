import React, { useMemo } from 'react';

import { IEmployee } from '@nw/storage';
import Badges from '~/components/badges';
import { BadgeLevel } from '~/components/badges/Badge';

const getLevel = (title: string): BadgeLevel => {
	if (title === 'dismissed') return 'error';
	if (title === 'works') return 'success';
	if (title === 'vacancy') return 'warn';
	return 'info';
};

function BadgesGenerator({ item }: { item: IEmployee }) {
	const badges = useMemo(
		() =>
			(item.meta.badges || '').split(',').map((title) => ({
				title,
				level: getLevel(title.toLowerCase()),
			})),
		[item]
	);

	return <Badges list={badges} />;
}

export default BadgesGenerator;
