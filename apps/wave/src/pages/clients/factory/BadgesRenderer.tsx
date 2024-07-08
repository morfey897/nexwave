import React, { useMemo } from 'react';
import { IClient } from '@nw/storage';
import { BadgeLevel } from '~/components/badges/Badge';
import Badges from '~/components/badges';

const getLevel = (title: string): BadgeLevel => {
	if (title === 'problem' || title === 'inactive') return 'error';
	if (title === 'loyal') return 'success';
	if (title === 'vip') return 'warn';
	return 'info';
};

function BadgesGenerator({ item }: { item: IClient }) {
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
