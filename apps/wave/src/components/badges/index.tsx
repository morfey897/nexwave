import React from 'react';

import Badge from './Badge';
import clsx from 'clsx';

const Badges = ({ list }: { list: Array<Parameters<typeof Badge>[0]> }) => (
	<div className={clsx('group relative flex w-fit flex-wrap justify-center')}>
		{list.map((badge) => (
			<Badge key={badge.title} {...badge} hoverEffect={list.length > 1} />
		))}
	</div>
);

export default Badges;
