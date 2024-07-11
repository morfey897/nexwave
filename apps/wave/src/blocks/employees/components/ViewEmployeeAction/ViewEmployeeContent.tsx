import Badge from '~/components/badges/Badge';
import { PersonPic } from '~/components/picture';
import PDFIcon from '~/icons/PDFIcon';
import { EmployeeActionContentLayoutProps } from '~/types';

export const GeneralViewEmployeeContent: EmployeeActionContentLayoutProps[] = [
	{
		name: 'Photo',
		picture: <PersonPic className='block' />,
	},
	{
		name: 'Name',
		value: 'Davis Jen',
	},
	{
		name: 'Phone number',
		value: '+3839932020',
	},
	{
		name: 'Date of birth',
		value: '-',
	},
	{
		name: 'Social media',
		value: '-',
	},
	{
		name: 'Access level',
		value: 'Employee',
	},
];

export const ExperienceViewEmployeeContent: EmployeeActionContentLayoutProps[] =
	[
		{
			name: 'In profession',
			value: '4 years',
		},
		{
			name: 'Classes',
			value: 'Stretching, Warm-up, Body Ballet',
		},
		{
			name: 'Education',
			value: 'Basic',
		},
		{
			name: 'Competitions',
			value: '2020, Ballet Expo 2022, Ballet competition',
		},
		{
			name: 'Certificates',
			value: (
				<div className='border-stroke hover:border-gray-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border transition duration-300 ease-in-out'>
					<PDFIcon />
					<a
						href='/test-certificate.pdf'
						target='_blank'
						rel='noopener noreferrer'
					>
						<span>Certificate1.pdf</span>
					</a>
				</div>
			),
		},
	];

export const WorkViewEmployeeContent: EmployeeActionContentLayoutProps[] = [
	{
		name: 'Work status',
		value: <Badge title='Works' level='success' />,
	},
	{
		name: 'Schedule',
		value: 'Rest days, 10:00 – 15:00',
	},
	{
		name: 'Classes',
		value: 'Stretching, Warm-up, Body Ballet',
	},
	{
		name: 'Start date',
		value: '12 Apr 2020',
	},
	{
		name: 'Contract expires',
		value: '20 Oct 2024',
	},
	{
		name: 'Salary frequency',
		value: '1 per month',
	},
	{
		name: 'Salary calculation',
		value: 'Hourly payment',
	},
	{
		name: 'Vacation days left',
		value: '10 days',
	},
	{
		name: 'Contract',
		value: (
			<div className='border-stroke hover:border-gray-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border transition duration-300 ease-in-out'>
				<PDFIcon />
				<a
					href='/test-certificate.pdf'
					target='_blank'
					rel='noopener noreferrer'
				>
					<span>Contract.pdf</span>
				</a>
			</div>
		),
	},
];
