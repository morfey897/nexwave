import React from 'react';

import Badge, { BadgeProps } from './Badge';
import clsx from 'clsx';

const Badges = ({ list }: { list: Array<BadgeProps> }) => (
	<div className={clsx('group relative flex w-fit flex-wrap justify-center')}>
		{list.map((badge) => (
			<Badge key={badge.value} {...badge} hoverEffect={list.length > 1} />
		))}
	</div>
);

export default Badges;
