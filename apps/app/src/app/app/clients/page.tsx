'use client';
import Empty from '@/views/Blocks/Empty';
import PageHeader from '@/views/Blocks/PageHeader';
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

import { Button } from '@/components/Buttons';
import { EnumLevel } from '@/types/common';

export default function Home() {
	const t = useTranslations();

	return (
		//  ml-0 lg:ml-64
		<div className='flex flex-col items-center justify-between my-4 lg:my-8'>
			<section className='container mx-auto'>
				<PageHeader
					messages={{
						headline: t('clients_page.headline'),
						subheadline: t('clients_page.subheadline'),
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
				<Table<IClient>
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
