'use client';
import { IHeadProps } from '@/types/table';
import { TUID } from '@/types/common';
import { hasType } from '@/utils/table';
import { SortIcon_S, SortIcon_N } from '../utils';
import { useSort } from '@/hooks/useSort';
import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

function Head<T extends TUID>({
	head,
	...props
}: {
	head: Array<IHeadProps<T>>;
} & React.HTMLAttributes<HTMLTableSectionElement>) {
	const t = useTranslations('common');

	const { onSort, s_asc, s_desc } = useSort();

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
											<button
												onClick={() => onSort(token)}
												className='flex items-center gap-x-2 hover:underline'
											>
												<span>{title}</span>
												<SortIcon_S uid={token} s_asc={s_asc} s_desc={s_desc} />
											</button>
										)}
										{hasType(type, 'sorted_n') && (
											<button
												onClick={() => onSort(token)}
												className='flex items-center gap-x-2 hover:underline'
											>
												<span>{title}</span>
												<SortIcon_N uid={token} s_asc={s_asc} s_desc={s_desc} />
											</button>
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
