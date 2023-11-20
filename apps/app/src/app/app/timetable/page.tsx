'use client';
import PageContainer from '@/views/Blocks/PageContainer';
import { useFilter, useSearch } from '@/hooks/filter';
import { EnumSearchParams } from '@/types/filter';
import Search from '@/components/Controls/Search';
import Filter from '@/components/Controls/Filter';
import { useTranslations } from 'next-intl';
import Headline from '@/views/Headline';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { EnumView } from '@/types/calendar';
import { useMemo } from 'react';

export default function Home() {
	const { onFilter, filter } = useFilter({ name: EnumSearchParams.FILTER });
	const { onSearch, search } = useSearch({ name: EnumSearchParams.SEARCH });

	const t = useTranslations();

	const views = useMemo(() => {
		return Object.values(EnumView).map((uid) => ({
			uid: uid,
			title: t(`timetable_page.view_${uid}`),
		}));
	}, []);

	return (
		<div className='flex flex-col items-center justify-between my-4 lg:my-8'>
			<section className='container mx-auto'>
				<PageContainer>
					<Headline
						headline={t('timetable_page.headline')}
						subheadline={t('timetable_page.subheadline')}
						amount={0}
						add={{
							title: t('common.add'),
							onClick: () => {
								console.log('onAdd');
							},
						}}
					/>
					<div className='mt-4 flex gap-2 items-center justify-between justify-items-center'>
						<Filter
							className='flex shrink-0'
							icon={<HiOutlineViewGrid size={16} />}
							message={t('timetable_page.view', { filter: filter })}
							filters={views}
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
			</section>
		</div>
	);
}
