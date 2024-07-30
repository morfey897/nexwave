'use client';

import { useTranslations } from 'next-intl';
import ButtonViewEmployee from './ButtonViewEmployee';
import EmployeeActionContentLayout from './EmployeeActionContentLayout';
import { WorkViewEmployeeContent } from './ViewEmployeeContent';
import { EnumEmployeeBadge, EnumLevel } from '~/constants/enums';

import Badges from '~/components/badges';
import useNWStore from '~/lib/store';

const getLevel = (title: string): EnumLevel => {
	if (
		title === EnumEmployeeBadge.DISMISSED ||
		title === EnumEmployeeBadge.BLOCKED
	)
		return EnumLevel.CRIT;
	if (title === EnumEmployeeBadge.WORKS) return EnumLevel.SUCCESS;
	if (title === EnumEmployeeBadge.VACANCY) return EnumLevel.WARN;
	return EnumLevel.INFO;
};

const getBudges = (badges: string | undefined) =>
	(badges || '')
		.split(',')
		.filter((badge) => !!badge)
		.map((title) => ({
			title,
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
					<Badges list={getBudges(employee?.meta?.badges)} />
				</div>
				{WorkViewEmployeeContent.map((item, index) => (
					<EmployeeActionContentLayout
						key={item.name}
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
