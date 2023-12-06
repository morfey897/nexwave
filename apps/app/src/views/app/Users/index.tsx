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

import { EnumFilter } from '@/types/client';
import Caption from '@/components/Caption';
import { useFilter, useSearch, useSort, usePage } from '@/hooks/filter';
import { EnumSearchParams } from '@/types/search';
import Search from '@/components/Controls/Search';
import Filter from '@/components/Controls/Filter';
import { useMemo } from 'react';
import { EnumLevel } from '@/types/common';
import { EnumSort, ITableProps } from '@/types/table';
import { useScrollDetect } from '@/hooks/scrollDetect';
import Container, {
	ContainerBody,
	ContainerHeader,
	ContainerScrollableHeader,
	useSyncScroll,
} from '@/components/Containers';
import clsx from 'clsx';
import { useView } from '@/hooks/filter';
import { EnumView } from '@/types/table';

function UsersView({ clients }: { clients: IClient[] }) {
	const t = useTranslations();

	const isScrolled = useScrollDetect(0.07);
	const { refHeader, refBody, onScroll } = useSyncScroll();
	const { onFilter, filter } = useFilter({
		name: EnumSearchParams.FILTER,
		defaultValue: EnumFilter.ALL,
	});
	const { onView, view } = useView({
		name: EnumSearchParams.VIEW,
		defaultValue: EnumView.TABLE,
	});
	const { onSearch, search } = useSearch({
		name: EnumSearchParams.SEARCH,
	});
	const { onSort, sort } = useSort({
		name: EnumSearchParams.SORT,
		defaultValue: 'name',
	});
	const { onPage, page, maxPage } = usePage({
		pages: 1,
		name: EnumSearchParams.PAGE,
	});

	const filters = useMemo(() => {
		return Object.values(EnumFilter).map((uid) => ({
			uid: uid,
			title: t(`clients_page.filter.${uid}`),
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const views = useMemo(() => {
		return Object.values(EnumView).map((uid) => ({
			uid: uid,
			title: t(`table_views.${uid}`),
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getHead = useMemo(() => {
		return [
			{
				flex: 2,
				token: 'name',
				title: 'Name',
				type: EnumSort.SYMBOLIC,
				comparator: sort.asc === 'name' ? 1 : sort.desc === 'name' ? -1 : 0,
				onSort: onSort,
				Generator: AvatarGenerator,
			},
			{
				flex: 2,
				token: 'badges',
				title: 'Badges',
				type: EnumSort.NONE,
				Generator: withGenerator('badges', BadgesGenerator),
			},
			{
				flex: 1,
				token: 'lastVisit',
				title: 'LastVisit',
				type: EnumSort.NUMERIC,
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
						headline={t('clients_page.headline')}
						subheadline={t('clients_page.subheadline')}
						amount={0}
						add={{
							title: t('common.add'),
							onClick: () => {
								console.log('onAdd');
							},
						}}
						imprt={{
							title: t('common.import'),
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
							message={t('clients_page.filter._', { filter: filter })}
							filters={filters}
							onChange={onFilter}
							value={filter}
						/>
						<Search
							onChange={onSearch}
							defaultValue={search || ''}
							placeholder={t('common.search')}
							wrapperClassName='flex items-center w-full max-w-[380px]'
						/>
						<Filter
							as='auto:md'
							className='flex shrink-0'
							icon={<HiOutlineViewGrid size={16} />}
							message={t('calendar_views._', { view })}
							filters={views}
							onChange={onView}
							value={view}
						/>
					</div>
				</div>
				<ContainerScrollableHeader ref={refHeader} onScroll={onScroll}>
					{view === EnumView.TABLE && (
						<WideTableHead
							head={getHead}
							className={clsx(
								'bg-gray-50 dark:bg-gray-800',
								'border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md md:rounded-t-lg',
							)}
						/>
					)}
					{view === EnumView.LIST && (
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
				{view === EnumView.TABLE && (
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
				{view === EnumView.LIST && (
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
