'use client';
import { HiOutlineFilter } from 'react-icons/hi';
import Empty from '@/views/Blocks/Empty';
import Pagination from '@/components/Controls/Pagination';
import Table from '@/views/Table';
import { useTranslations } from 'next-intl';
import { HiOutlinePlusCircle } from 'react-icons/hi';

import clients from '../../../../__mock__/clients.json';
import { IClient } from '@/types/client';
import { AvatarGenerator } from '@/components/Generators/client';
import withGenerator, {
	TimeGenerator,
	BadgesGenerator,
} from '@/components/Generators';

import { Button } from '@/components/Buttons';
import { EnumFilter } from '@/types/client';
import PageContainer from '@/views/Blocks/PageContainer';
import Headline from '@/views/Headline';
import { useFilter, useSearch, useSort, usePage } from '@/hooks/filter';
import { EnumSearchParams } from '@/types/filter';
import Search from '@/components/Controls/Search';
import Filter from '@/components/Controls/Filter';
import { useMemo } from 'react';
import { EnumLevel } from '@/types/common';
import { useDevice } from '@/hooks/device';
import { EnumSort } from '@/types/table';

export default function Home() {
	const device = useDevice();
	const { onFilter, filter } = useFilter({
		name: EnumSearchParams.FILTER,
		defaultValue: EnumFilter.ALL,
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

	const t = useTranslations();

	const filters = useMemo(() => {
		return Object.values(EnumFilter).map((uid) => ({
			uid: uid,
			title: t(`clients_page.filter_${uid}`),
		}));
	}, []);

	return (
		<div className='flex flex-col items-center justify-between my-4 lg:my-8'>
			<section className='container mx-auto'>
				<PageContainer>
					<Headline
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
					<div className='mt-4 flex gap-2 items-center justify-between justify-items-center'>
						<Filter
							as='auto:lg'
							className='flex shrink-0'
							icon={<HiOutlineFilter size={16} />}
							message={t('clients_page.filter', { filter: filter })}
							filters={filters}
							onChange={onFilter}
							value={filter}
						/>
						<Search
							onChange={onSearch}
							defaultValue={search || ''}
							placeholder={t('common.search')}
							wrapperClassName='flex items-center w-full max-w-[380px]'
							className='h-12'
						/>
					</div>
				</PageContainer>
				<Table<IClient>
					device={device}
					empty={
						<Empty
							messages={{
								headline: t('clients_page.headline_empty'),
								subheadline: t('clients_page.subheadline_empty'),
							}}
						>
							<Button message={t('common.clear')} />
							<Button
								variant='primary'
								icon={<HiOutlinePlusCircle size={20} />}
								message={t('common.add')}
							/>
						</Empty>
					}
					head={[
						{
							token: 'name',
							title: 'Name',
							type: EnumSort.SYMBOLIC,
							comparator:
								sort.asc === 'name' ? 1 : sort.desc === 'name' ? -1 : 0,
							onSort: onSort,
							Generator: AvatarGenerator,
						},
						{
							token: 'badges',
							title: 'Badges',
							type: EnumSort.NONE,
							Generator: withGenerator('badges', BadgesGenerator),
						},
						{
							token: 'lastVisit',
							title: 'LastVisit',
							type: EnumSort.NUMERIC,
							comparator:
								sort.asc === 'lastVisit'
									? 1
									: sort.desc === 'lastVisit'
									? -1
									: 0,
							onSort: onSort,
							Generator: withGenerator('last_visit_at', TimeGenerator),
						},
					]}
					body={
						clients.map((item) => ({
							...item,
							badges: [
								{ title: 'Problem', level: EnumLevel.WARN },
								{ title: 'VIP', level: EnumLevel.SUCCESS },
								{ title: 'NewWW', level: EnumLevel.INFO },
								{ title: 'Newbie' },
							],
						})) as unknown as Array<IClient>
					}
				/>
				<Pagination maxPage={maxPage} page={page} onPage={onPage} />
			</section>
		</div>
	);
}
