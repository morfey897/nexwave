'use client';
import { HiCalendar } from 'react-icons/hi2';
import PageHeader from '@/views/Blocks/PageHeader';
import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations();
	return (
		<div className='flex flex-col items-center justify-between my-4 lg:my-8'>
			<section className='container mx-auto'>
				<PageHeader
					messages={{
						headline: t('timetable_page.headline'),
						subheadline: t('timetable_page.subheadline'),
						amount: 0,
						search: t('common.search'),
						add: t('common.add'),
						import: t('common.import'),
						export: t('common.export'),
					}}
					filters={[
						{ title: 'all', uid: 'all' },
						{ title: 'part', uid: 'part' },
					]}
				/>
			</section>
		</div>
	);
}
