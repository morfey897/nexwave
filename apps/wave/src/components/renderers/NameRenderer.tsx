import React from 'react';
import ProjectPic from '~/components/picture/PersonPic';

export type INameProps = {
	login: string;
	name: string | null | undefined;
	surname: string | null | undefined;
	avatar: string | null | undefined;
	phone: string | null | undefined;
};

function NameRenderer({ item }: { item: INameProps }) {
	const { name, surname, phone, login } = item;
	const fullName = [name, surname].filter((v) => Boolean(v)).join(' ') || login;

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
