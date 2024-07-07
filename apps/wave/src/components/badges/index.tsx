import React from 'react';

import Badge from './Badge';

const Badges = ({ list }: { list: Array<Parameters<typeof Badge>[0]> }) => (
	<div className='group relative flex w-fit flex-wrap justify-center'>
		{list.map((badge) => (
			<Badge key={badge.title} {...badge} />
		))}
	</div>
);

export default Badges;
