import React from 'react';
import Wrapper from './wrapper';
import Table, { type IHeadProps } from '~/components/table';
import { TUID } from '~/types';
import ProjectPic from '~/components/picture/PersonPic';
import ThreeDotsVerticalIcon from '~/icons/ThreeDotsVerticalIcon';
import { Flex } from '~/components/layout';
import { EnumDeviceType } from '~/constants/enums';

interface ItemType extends TUID {
	name: string;
	surname: string;
	phone?: string;
	avatar?: string;
}

function AvatarGenerator({ item }: { item: ItemType }) {
	const fullName = [item.name, item.surname]
		.filter((v) => Boolean(v))
		.join(' ');

	return (
		<div className='relative flex cursor-pointer items-center gap-x-2'>
			<ProjectPic size={40} photo={item.avatar} />
			<div>
				<h2 className='text-primary-text hyphens-auto break-words font-medium'>
					{fullName}
				</h2>
				{item.phone && (
					<a href={`tel:${item.phone}`} className='text-sm hover:underline'>
						{item.phone}
					</a>
				)}
			</div>
		</div>
	);
}

const SurnameGenerator = ({ item }: { item: ItemType }) => <p>{item.name}</p>;

const Generator = ({ item }: { item: ItemType }) => <p>INFO</p>;

const ActionsGenerator = ({ item }: { item: ItemType }) => (
	<Flex>
		<button type='button' aria-label='More options' className='ml-4'>
			<ThreeDotsVerticalIcon />
		</button>
	</Flex>
);

const items: ItemType[] = [
	{
		id: 1,
		uuid: '1',
		name: 'John',
		surname: 'Doe',
		phone: '555-1234',
	},
	{
		id: 2,
		uuid: '2',
		name: 'Jane',
		surname: 'Doe',
		phone: '555-5678',
	},
	{
		id: 3,
		uuid: '3',
		name: 'John',
		surname: 'Smith',
		phone: '555-9101',
	},
	{
		id: 4,
		uuid: '4',
		name: 'Jane',
		surname: 'Smith',
		phone: '555-1123',
	},
	{
		id: 5,
		uuid: '5',
		name: 'Alice',
		surname: 'Brown',
		phone: '555-1415',
	},
	{
		id: 6,
		uuid: '6',
		name: 'Bob',
		surname: 'Brown',
		phone: '555-1617',
	},
	{
		id: 7,
		uuid: '7',
		name: 'Charlie',
		surname: 'Davis',
		phone: '555-1819',
	},
	{
		id: 8,
		uuid: '8',
		name: 'Diana',
		surname: 'Davis',
		phone: '555-2021',
	},
	{
		id: 9,
		uuid: '9',
		name: 'Edward',
		surname: 'Evans',
		phone: '555-2223',
	},
	{
		id: 10,
		uuid: '10',
		name: 'Fiona',
		surname: 'Evans',
		phone: '555-2425',
	},
	{
		id: 11,
		uuid: '11',
		name: 'George',
		surname: 'Clark',
		phone: '555-2627',
	},
	{
		id: 12,
		uuid: '12',
		name: 'Hannah',
		surname: 'Clark',
		phone: '555-2829',
	},
	{
		id: 13,
		uuid: '13',
		name: 'Ian',
		surname: 'Harris',
		phone: '555-3031',
	},
	{
		id: 14,
		uuid: '14',
		name: 'Judy',
		surname: 'Harris',
		phone: '555-3233',
	},
	{
		id: 15,
		uuid: '15',
		name: 'Kevin',
		surname: 'Lewis',
		phone: '555-3435',
	},
	{
		id: 16,
		uuid: '16',
		name: 'Laura',
		surname: 'Lewis',
		phone: '555-3637',
	},
	{
		id: 17,
		uuid: '17',
		name: 'Mike',
		surname: 'Walker',
		phone: '555-3839',
	},
	{
		id: 18,
		uuid: '18',
		name: 'Nina',
		surname: 'Walker',
		phone: '555-4041',
	},
	{
		id: 19,
		uuid: '19',
		name: 'Oscar',
		surname: 'Hall',
		phone: '555-4243',
	},
	{
		id: 20,
		uuid: '20',
		name: 'Paula',
		surname: 'Hall',
		phone: '555-4445',
	},
];

const head: IHeadProps[] = [
	{
		title: 'Name',
		key: 'name',
	},
	{
		title: 'Badges',
		key: 'badges',
		device: EnumDeviceType.TABLET,
	},
	{
		title: 'Season Tickets',
		key: 'seasonTickets',
		device: EnumDeviceType.TABLET,
	},
	{
		title: 'Last Visit',
		key: 'lastVisit',
		device: EnumDeviceType.TABLET,
	},
	{
		title: 'Header 5',
		key: 'header5',
	},
];

const factory = (key: string, item: ItemType) => {
	switch (key) {
		case 'name':
			return <AvatarGenerator item={item} />;
		case 'badges':
			return <SurnameGenerator item={item} />;
		case 'seasonTickets':
			return <Generator item={item} />;
		case 'lastVisit':
			return <Generator item={item} />;
		case 'header5':
			return <ActionsGenerator item={item} />;
		default:
			return null;
	}
};

function Page() {
	return (
		<Wrapper>
			<Table header={head} content={items} factory={factory} />
		</Wrapper>
	);
}

export default Page;
