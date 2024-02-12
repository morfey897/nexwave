'use client';
import { useFilter, useDay } from '@/hooks/filter';
import ChangeDate from '@/components/Controls/ChangeDate';
import { useLocale, useTranslations } from 'next-intl';
import { EnumPeriod } from '@/enums';
import { useMemo } from 'react';
import { WeekCalendarHead } from '@/components/Calendar/Week';
import { MdCalendarViewDay, MdCalendarViewWeek } from 'react-icons/md';
import { previousMonday, addDays } from 'date-fns';
import { toIsoDate } from '@/utils/datetime';
import Container, {
	ContainerBody,
	ContainerHeader,
	ContainerScrollableHeader,
	useSyncScroll,
} from '@/components/Containers';
import clsx from 'clsx';
import { S_PARAMS } from '@nw/config';
import { EnumDeviceType } from '@/enums';
import useNWStore from '@/lib/store';
import BranchIcon from '@/components/Project/Icon';
import DropDown from '@/components/DropDown';
import Button, { Group } from '@/components/Button';

const PERIODS = [
	{
		uid: EnumPeriod.WEEK,
		title: `filter.week`,
		icon: <MdCalendarViewWeek size={24} />,
	},
	{
		uid: EnumPeriod.DAY,
		title: `filter.day`,
		icon: <MdCalendarViewDay size={24} />,
	},
	
];

const getFirstDay = () => {
	const now = new Date();
	if (now.getDay() === 1) {
		return toIsoDate(now);
	}
	return toIsoDate(previousMonday(now));
};

function Header({ device }: { device?: EnumDeviceType }) {
	const project = useNWStore((state) => state.project);
	const t = useTranslations();
	const locale = useLocale();

	const { onChange: onBranch, value: branchUUid } = useFilter({
		name: 'branch',
		defaultValue: 'all',
	});

	const activeBranch = project?.branches.find(
		(branch) => branch.uuid === branchUUid,
	);

	const { onChange: onView, value: period } = useFilter({
		name: S_PARAMS.VIEW,
		defaultValue:
			device === EnumDeviceType.MOBILE ? EnumPeriod.DAY : EnumPeriod.WEEK,
	});

	const { onDay, day } = useDay({
		name: S_PARAMS.DAY,
		defaultValue: getFirstDay(),
	});

	const getDates = useMemo(() => {
		if (period === EnumPeriod.WEEK) {
			return new Array(7)
				.fill(0)
				.map((_, index) => toIsoDate(addDays(new Date(day), index)));
		} else {
			return [day];
		}
	}, [period, day]);

	const FilterBranche = useMemo(
		() => (
			<DropDown
				direction={{ y: 'bottom' }}
				element={
					<Button
						size='sm'
						className='w-[120px]'
						icon={
							<BranchIcon
								image={activeBranch?.image}
								size={24}
								altFallback='branch'
							/>
						}
						message={activeBranch?.name || t('filter.all')}
					/>
				}
			>
				<div className='px-2 py-4 flex flex-col'>
					{project?.branches.map(({ uuid, name, image }) => (
						<Button
							key={uuid}
							onClick={() => {
								onBranch(uuid);
							}}
							disabled={branchUUid === uuid}
							className={clsx('w-[120px]')}
							message={name}
							icon={<BranchIcon image={image} size={24} altFallback='branch' />}
						/>
					))}
				</div>
			</DropDown>
		),
		[t, project, activeBranch, onBranch, branchUUid],
	);

	const FilterPeriod = useMemo(
		() => (
			<Group>
				{PERIODS.map(({ uid, title, icon }) => (
					<Button
						size='sm'
						key={uid}
						onClick={() => {
							onView(uid);
						}}
						disabled={period === uid}
						aria-label={t(title)}
						icon={icon}
					/>
				))}
			</Group>
		),
		[t, period, onView],
	);

	return (
		<>
			<div className='flex md:hidden flex-wrap gap-2 items-center justify-between justify-items-center'>
				{FilterBranche}
				{FilterPeriod}
			</div>
			<ContainerHeader
				className={clsx(
					'border-b dark:border-gray-700 pt-2 md:pt-4 bg-gray-100 dark:bg-gray-900',
				)}
			>
				<div
					className={clsx(
						'flex flex-wrap justify-between gap-2 md:gap-0',
					)}
				>
					<div className='hidden md:block'>{FilterBranche}</div>
					<ChangeDate
						onChange={(index: number) =>
							onDay(index * (period === EnumPeriod.WEEK ? 7 : 1))
						}
						dates={[getDates[0], getDates[getDates.length - 1]]}
						className='md:w-auto w-full max-w-[250px] m-auto'
						messages={{
							today: t('day.today'),
						}}
					/>
					<div className='hidden md:flex justify-end'>{FilterPeriod}</div>
				</div>
				<div
					className={clsx(
						'overflow-x-scroll hide-scroll',
						'bg-gray-50 dark:bg-gray-800',
						'border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md md:rounded-t-lg',
					)}
				>
					<WeekCalendarHead
						locale={locale}
						className={clsx(
							'w-full',
							period === EnumPeriod.WEEK && 'min-w-[600px]',
						)}
						dates={getDates}
					/>
				</div>
			</ContainerHeader>
		</>
	);
}

export default Header;
