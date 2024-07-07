import { IClient, GenderEnum } from '@nw/storage';
import { addDays } from 'date-fns';

const BADGES = [
	'loyal',
	'regular',
	'vip',
	'new',
	'active',
	'inactive',
	'blocked',
	'problem',
];

const badges = () => {
	const randomCount = Math.floor(Math.random() * 3) + 1;
	const array = Array.from({ length: randomCount }, () => {
		const randomIndex = Math.floor(Math.random() * BADGES.length);
		return BADGES[randomIndex];
	});

	return [...new Set(array)];
};

const items: IClient[] = [
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
].map(({ phone, ...raw }) => ({
	...raw,
	contacts: { phone },
	avatar: null,
	login: '',
	bio: null,
	meta: {
		badges: badges().join(','),
		tickets: String(Math.floor(Math.random() * 10) + 1),
		maxTickets: String(10),
	},
	gender: GenderEnum.Female,
	birthday: null,
	createdAt: new Date(),
	updatedAt: new Date(),
	lastVisitAt: addDays(new Date(), Math.floor(Math.random() * 30) * -1),
}));

export default items;
