import React from 'react';
import ProjectPic from '~/components/picture/PersonPic';
import { IEmployee } from '@nw/storage';

function NameRenderer({ item }: { item: IEmployee }) {
	const fullName = [item.name, item.surname]
		.filter((v) => Boolean(v))
		.join(' ');

	const phone = item.contacts?.phone;

	return (
		<div className='relative flex cursor-pointer items-center gap-x-2'>
			<ProjectPic size={40} photo={item.avatar} />
			<div>
				<h2 className='text-primary-text hyphens-auto break-words font-medium'>
					{fullName}
				</h2>
				{phone && (
					<a href={`tel:${phone}`} className='text-sm hover:underline'>
						{phone}
					</a>
				)}
			</div>
		</div>
	);
}

export default NameRenderer;
