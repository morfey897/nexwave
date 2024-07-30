import React from 'react';
import Badges from '~/components/badges';
import { BadgeProps } from '../badges/Badge';

function BadgesRenderer({ item }: { item: Array<BadgeProps> }) {
	return <Badges list={item} />;
}

export default BadgesRenderer;
