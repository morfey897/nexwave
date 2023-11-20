'use client';
import { ITableHeadProps } from '@/types/table';
import { TUID } from '@/types/common';
import { hasType } from '@/utils/table';
import { SortButton } from '../SortButton';
import { useSort } from '@/hooks/filter';
import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import { EnumSearchParams } from '@/types/filter';

function Head<T extends TUID>({
	head,
	...props
}: ITableHeadProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	const t = useTranslations('common');

	const { onSort, sort } = useSort({ name: EnumSearchParams.SORT });

	return (
		<thead {...props}>
			<tr>
				<th className='p-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<div className='space-y-1'>
						<p className=''>{t('sort_by')}</p>
						<div className='flex gap-x-2 flex-wrap'>
							{head
								.filter(
									({ type }) =>
										hasType(type, 'sorted_n') || hasType(type, 'sorted_s'),
								)
								.map(({ token, type, title }) => (
									<Fragment key={token}>
										{hasType(type, 'sorted_s') && (
											<SortButton
												_uid={token}
												s_asc={sort.asc}
												s_desc={sort.desc}
												variant='symbolic'
												onClick={() => onSort(token)}
											>
												{title}
											</SortButton>
										)}
										{hasType(type, 'sorted_n') && (
											<SortButton
												_uid={token}
												s_asc={sort.asc}
												s_desc={sort.desc}
												variant='numeric'
												onClick={() => onSort(token)}
											>
												{title}
											</SortButton>
										)}
									</Fragment>
								))}
						</div>
					</div>
				</th>
			</tr>
		</thead>
	);
}

export default Head;
