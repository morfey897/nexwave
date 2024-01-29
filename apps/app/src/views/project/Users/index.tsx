'use client';
import { HiOutlineFilter } from 'react-icons/hi';
import Pagination from '@/components/Controls/Pagination';
import { ListTableBody, ListTableHead } from '@/components/Table/List';
import { WideTableHead, WideTableBody } from '@/components/Table/Wide';
import { useTranslations } from 'next-intl';
import { HiOutlineViewGrid } from 'react-icons/hi';

import { IClient } from '@/types/client';
import { AvatarGenerator } from '@/components/Generators/client';
import withGenerator, {
	TimeGenerator,
	BadgesGenerator,
} from '@/components/Generators';

import { EnumState, EnumLevel, EnumSortBy, EnumRepresent } from '@/enums';
import Caption from '@/components/Caption';
import { useFilter, useSearch, useSort, usePage } from '@/hooks/filter';
import Search from '@/components/Controls/Search';
import Filter from '@/components/Controls/Filter';
import { useMemo } from 'react';
import { ITableProps } from '@/types/table';
import { useScrollDetect } from '@/hooks/scrollDetect';
import Container, {
	ContainerBody,
	ContainerHeader,
	ContainerScrollableHeader,
	useSyncScroll,
} from '@/components/Containers';
import clsx from 'clsx';
import { useView } from '@/hooks/filter';
import { S_PARAMS } from '@nw/config';

function UsersView({ clients }: { clients: IClient[] }) {
	const t = useTranslations();

	const isScrolled = useScrollDetect(0.07);
	const { refHeader, refBody, onScroll } = useSyncScroll();
	const { onFilter, filter: state } = useFilter({
		name: S_PARAMS.FILTER,
		defaultValue: 'all',
	});
	const { onView, view: represent } = useView({
		name: S_PARAMS.VIEW,
		defaultValue: EnumRepresent.TABLE,
	});
	const { onSearch, search } = useSearch({
		name: S_PARAMS.SEARCH,
	});
	const { onSort, sort } = useSort({
		name: S_PARAMS.SORT,
		defaultValue: 'name',
	});
	const { onPage, page, maxPage } = usePage({
		pages: 1,
		name: S_PARAMS.PAGE,
	});

	const states = useMemo(() => {
		return [
			{
				uid: 'all',
				title: t(`filter.all`),
			},
			{
				uid: EnumState.ACTIVE,
				title: t(`filter.active`),
			},
			{
				uid: EnumState.INACTIVE,
				title: t(`filter.inactive`),
			}
		];
	}, [t]);

	const represents = useMemo(() => {
		return [
			{
				uid: EnumRepresent.TABLE,
				title: t(`filter.table`),
			},
			{
				uid: EnumRepresent.LIST,
				title: t(`filter.list`),
			},
		];
	}, [t]);

	const getHead = useMemo(() => {
		return [
			{
				flex: 2,
				token: 'name',
				title: 'Name',
				type: EnumSortBy.SYMBOLIC,
				comparator: sort.asc === 'name' ? 1 : sort.desc === 'name' ? -1 : 0,
				onSort: onSort,
				Generator: AvatarGenerator,
			},
			{
				flex: 2,
				token: 'badges',
				title: 'Badges',
				type: EnumSortBy.NONE,
				Generator: withGenerator('badges', BadgesGenerator),
			},
			{
				flex: 1,
				token: 'lastVisit',
				title: 'LastVisit',
				type: EnumSortBy.NUMERIC,
				comparator:
					sort.asc === 'lastVisit' ? 1 : sort.desc === 'lastVisit' ? -1 : 0,
				onSort: onSort,
				Generator: withGenerator('last_visit_at', TimeGenerator),
			},
		] as ITableProps<IClient>['head'];
	}, [onSort, sort]);

	const getBody = useMemo(() => {
		return clients.map((item) => ({
			...item,
			badges: [
				{ title: 'Problem', level: EnumLevel.WARN },
				{ title: 'VIP', level: EnumLevel.SUCCESS },
				{ title: 'NewWW', level: EnumLevel.INFO },
				{ title: 'Newbie' },
			],
		})) as unknown as ITableProps<IClient>['body'];
	}, [clients]);

	return (
		<Container>
			<ContainerHeader>
				<div className='bg-gray-100 dark:bg-gray-900 pt-2'>
					<Caption
						isScrolled={isScrolled}
						headline={t('page.clients.headline')}
						subheadline={t('page.clients.subheadline')}
						amount={0}
						add={{
							title: t('button.add'),
							onClick: () => {
								console.log('onAdd');
							},
						}}
						imprt={{
							title: t('button.import'),
							onClick: () => {
								console.log('onImport');
							},
						}}
					/>
					<div
						className={clsx(
							'mt-4 flex pb-8 gap-2 items-center justify-between justify-items-center transition-all duration-300 ease-linear',
							isScrolled && '!pb-0',
						)}
					>
						<Filter
							as='dropdown'
							className='flex shrink-0'
							icon={<HiOutlineFilter size={16} />}
							message={t('filter.of_state_', { state })}
							filters={states}
							onChange={onFilter}
							value={state}
						/>
						<Search
							onChange={onSearch}
							defaultValue={search || ''}
							placeholder={t('button.search')}
							wrapperClassName='flex items-center w-full max-w-[380px]'
						/>
						<Filter
							as='auto:md'
							className='flex shrink-0'
							icon={<HiOutlineViewGrid size={16} />}
							message={t('filter.of_represent_', { represent })}
							filters={represents}
							onChange={onView}
							value={represent}
						/>
					</div>
				</div>
				<ContainerScrollableHeader ref={refHeader} onScroll={onScroll}>
					{represent === EnumRepresent.TABLE && (
						<WideTableHead
							head={getHead}
							className={clsx(
								'bg-gray-50 dark:bg-gray-800',
								'border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md md:rounded-t-lg',
							)}
						/>
					)}
					{represent === EnumRepresent.LIST && (
						<ListTableHead
							head={getHead}
							className={clsx(
								'bg-gray-50 dark:bg-gray-800',
								'border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md md:rounded-t-lg',
							)}
						/>
					)}
				</ContainerScrollableHeader>
			</ContainerHeader>

			<ContainerBody ref={refBody} onScroll={onScroll}>
				{represent === EnumRepresent.TABLE && (
					<WideTableBody
						head={getHead}
						body={getBody}
						className={clsx(
							'bg-white dark:bg-gray-900',
							'border border-gray-200 dark:border-gray-700 border-b-0 rounded-b-md md:rounded-b-lg',
							'divide-y divide-gray-200 dark:divide-gray-700',
						)}
					/>
				)}
				{represent === EnumRepresent.LIST && (
					<ListTableBody
						head={getHead}
						body={getBody}
						className={clsx(
							'bg-white dark:bg-gray-900',
							'border border-gray-200 dark:border-gray-700 border-b-0 rounded-b-md md:rounded-b-lg',
							'divide-y divide-gray-200 dark:divide-gray-700',
						)}
					/>
				)}
			</ContainerBody>
			<Pagination maxPage={maxPage} page={page} onPage={onPage} />
		</Container>
	);
}

export default UsersView;
