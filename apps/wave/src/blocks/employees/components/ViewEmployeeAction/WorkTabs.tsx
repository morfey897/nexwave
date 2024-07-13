'use client';

import { useTranslations } from 'next-intl';
import ButtonViewEmployee from './ButtonViewEmployee';
import EmployeeActionContentLayout from './EmployeeActionContentLayout';
import { WorkViewEmployeeContent } from './ViewEmployeeContent';
import { EnumEmployeeBadge } from '~/constants/enums';

import Badges from '~/components/badges';
import { BadgeLevel } from '~/components/badges/Badge';
import useNWStore from '~/lib/store';

const getLevel = (title: string): BadgeLevel => {
	if (
		title === EnumEmployeeBadge.DISMISSED ||
		title === EnumEmployeeBadge.BLOCKED
	)
		return 'error';
	if (title === EnumEmployeeBadge.WORKS) return 'success';
	if (title === EnumEmployeeBadge.VACANCY) return 'warn';
	return 'info';
};

const getBudges = (badges: string | undefined) =>
	(badges || '')
		.split(',')
		.filter((badge) => !!badge)
		.map((title) => ({
			title: title,
			level: getLevel(title.toLowerCase()),
		}));

function WorkTabs() {
	const t = useTranslations();
	const employee = useNWStore((state) => state.edit.employee);

	return (
		<div className='bg-secondary mt-2 flex flex-col'>
			<div className='flex w-auto flex-col space-y-4 md:w-[30rem]'>
				<div className='flex items-center'>
					<p className='w-1/2'>{t('page.employees.badges')}</p>
					<Badges list={getBudges(employee?.meta?.['badges'])} />
				</div>
				{WorkViewEmployeeContent.map((item, index) => (
					<EmployeeActionContentLayout
						key={index}
						name={item.name}
						value={item.value}
						picture={item.picture}
					/>
				))}
			</div>
			<ButtonViewEmployee />
		</div>
	);
}

export default WorkTabs;
