import React from 'react';
import { BadgeLevel } from '~/components/badges/Badge';
import Badges from '~/components/badges';

function BadgesRenderer({
	item,
}: {
	item: Array<{ title: string; level: BadgeLevel }>;
}) {
	return <Badges list={item} />;
}

export default BadgesRenderer;
