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
import { S_PARAMS } from '@nw/config';

function ClintsView({ clients }: { clients: IClient[] }) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const t = (a: string, ...props: unknown[]) => a + JSON.stringify(props);
	// useTranslations();

	const isScrolled = useScrollDetect(0.07);
	const { refHeader, refBody, onScroll } = useSyncScroll();
	const { onChange: onFilter, value: state } = useFilter({
		name: S_PARAMS.FILTER,
		defaultValue: 'all',
	});
	const { onChange: onView, value: view } = useFilter({
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
				message: t(`filter.all`),
			},
			{
				uid: EnumState.ACTIVE,
				message: t(`filter.active`),
			},
			{
				uid: EnumState.INACTIVE,
				message: t(`filter.inactive`),
			},
		];
	}, [t]);

	const represents = useMemo(() => {
		return [
			{
				uid: EnumRepresent.TABLE,
				message: t(`filter.table`),
			},
			{
				uid: EnumRepresent.LIST,
				message: t(`filter.list`),
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
				<div className='bg-gray-100 pt-2 dark:bg-gray-900'>
					<Caption
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
							'mt-4 flex items-center justify-between justify-items-center gap-2 pb-8 transition-all duration-300 ease-linear',
							isScrolled && '!pb-0'
						)}
					>
						<Filter
							as='dropdown'
							className='flex shrink-0'
							icon={<HiOutlineFilter size={16} />}
							message={t('filter.of_state_', { state: state })}
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
							message={t('filter.of_represent_', { represent: view })}
							filters={represents}
							onChange={onView}
							value={view}
						/>
					</div>
				</div>
				<ContainerScrollableHeader ref={refHeader} onScroll={onScroll}>
					{view === EnumRepresent.TABLE && (
						<WideTableHead
							head={getHead}
							className={clsx(
								'bg-gray-50 dark:bg-gray-800',
								'rounded-t-md border border-b-0 border-gray-200 md:rounded-t-lg dark:border-gray-700'
							)}
						/>
					)}
					{view === EnumRepresent.LIST && (
						<ListTableHead
							head={getHead}
							className={clsx(
								'bg-gray-50 dark:bg-gray-800',
								'rounded-t-md border border-b-0 border-gray-200 md:rounded-t-lg dark:border-gray-700'
							)}
						/>
					)}
				</ContainerScrollableHeader>
			</ContainerHeader>

			<ContainerBody ref={refBody} onScroll={onScroll}>
				{view === EnumRepresent.TABLE && (
					<WideTableBody
						head={getHead}
						body={getBody}
						className={clsx(
							'bg-white dark:bg-gray-900',
							'rounded-b-md border border-b-0 border-gray-200 md:rounded-b-lg dark:border-gray-700',
							'divide-y divide-gray-200 dark:divide-gray-700'
						)}
					/>
				)}
				{view === EnumRepresent.LIST && (
					<ListTableBody
						head={getHead}
						body={getBody}
						className={clsx(
							'bg-white dark:bg-gray-900',
							'rounded-b-md border border-b-0 border-gray-200 md:rounded-b-lg dark:border-gray-700',
							'divide-y divide-gray-200 dark:divide-gray-700'
						)}
					/>
				)}
			</ContainerBody>
			<Pagination maxPage={maxPage} page={page} onPage={onPage} />
		</Container>
	);
}

export default ClintsView;
