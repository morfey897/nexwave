'use client';
import { HiOutlineFilter } from 'react-icons/hi';
import Empty from '@/views/Blocks/Empty';
import Pagination from '@/views/Blocks/Pagination';
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

import { Button } from '@/components/Button';
import { EnumFilter } from '@/types/client';
import PageContainer from '@/views/Blocks/PageContainer';
import Headline from '@/views/Headline';
import { useFilter, useSearch } from '@/hooks/filter';
import { EnumSearchParams } from '@/types/filter';
import Search from '@/components/Controls/Search';
import Filter from '@/components/Controls/Filter';
import { useMemo } from 'react';
import { EnumLevel } from '@/types/common';
import { useDevice } from '@/hooks/device';

export default function Home() {
	const device = useDevice();
	const { onFilter, filter } = useFilter({ name: EnumSearchParams.FILTER });
	const { onSearch, search } = useSearch({ name: EnumSearchParams.SEARCH });

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
							type: 'sorted_s',
							Generator: AvatarGenerator,
						},
						{
							token: 'badges',
							title: 'Badges',
							type: 'none',
							Generator: withGenerator('badges', BadgesGenerator),
						},
						{
							token: 'lastVisit',
							title: 'LastVisit',
							type: 'sorted_n',
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
				<Pagination pages={1} />
			</section>
		</div>
	);
}
