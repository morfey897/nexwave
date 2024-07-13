import Badge from '~/components/badges/Badge';
import { PersonPic } from '~/components/picture';
import { RoundedPlus } from '~/icons';
import DashCircleIIcon from '~/icons/DashCircleIIcon';
import EyeSlash from '~/icons/EyeSlash';
import PDFIcon from '~/icons/PDFIcon';
import {
	EmployeeActionContentLayoutProps,
	ViewActionContentLayoutProps,
} from '~/types';

export const DescriptionContent: EmployeeActionContentLayoutProps[] = [
	{
		name: 'Name',
		value: 'Stretching',
	},
	{
		name: 'Date',
		value: '05/22/2024, 11:00-12:00 Weekly, Mo, We, Fr',
	},
	{
		name: 'Trainer',
		value: 'Mary Brown',
	},
	{
		name: 'Price',
		value: '10$',
	},
];

export const EnrolledContent: ViewActionContentLayoutProps[] = [
	{
		name: 'Williams Anita',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Regular' level='success' />,
		iconBlock: <DashCircleIIcon />,
		iconHidden: <EyeSlash />,
	},
	{
		name: 'Key Linda',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Regular' level='success' />,
		iconBlock: <DashCircleIIcon />,
		iconHidden: <EyeSlash />,
	},
	{
		name: 'Won Patricia',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Regular' level='success' />,
		iconBlock: <DashCircleIIcon />,
		iconHidden: <EyeSlash />,
	},
	{
		name: 'Grey Olivia',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Newbie' level='info' />,
		iconBlock: <DashCircleIIcon />,
		iconHidden: <EyeSlash />,
	},
	{
		name: 'Don Charlotte',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Regular' level='success' />,
		iconBlock: <DashCircleIIcon />,
		iconHidden: <EyeSlash />,
	},
	{
		name: 'Smith Kristine',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Regular' level='success' />,
		iconBlock: <DashCircleIIcon />,
		iconHidden: <EyeSlash />,
	},
	{
		name: 'Oliver Mia',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Newbie' level='info' />,
		iconBlock: <DashCircleIIcon />,
		iconHidden: <EyeSlash />,
	},
];

export const RejectedContent: ViewActionContentLayoutProps[] = [
	{
		name: 'June Emma',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Newbie' level='info' />,
		iconPlus: <RoundedPlus fill='#637381' width='24' height='24' />,
	},
	{
		name: 'Short Amelia',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Newbie' level='info' />,
		iconPlus: <RoundedPlus fill='#637381' width='24' height='24' />,
	},
	{
		name: 'Oliver Mia',
		picture: <PersonPic className='block' />,
		number: '+38067721123',
		badge: <Badge title='Newbie' level='info' />,
		iconPlus: <RoundedPlus fill='#637381' width='24' height='24' />,
	},
];
