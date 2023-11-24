'use client';
import { EnumSort, ITableHeadProps } from '@/types/table';
import { TUID } from '@/types/common';
import { hasType } from '@/utils/table';
import SortButton from '@/components/Button/SortButton';
import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

function Head<T extends TUID>({
	head,
	...props
}: ITableHeadProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	const t = useTranslations('common');

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
										!!type &&
										(hasType(type, EnumSort.NUMERIC) ||
											hasType(type, EnumSort.SYMBOLIC)),
								)
								.map(({ token, type, title, comparator, onSort }) => (
									<Fragment key={token}>
										{!!type && hasType(type, EnumSort.SYMBOLIC) && (
											<SortButton
												variant='text'
												comparator={comparator || 0}
												as='symbolic'
												onClick={() =>
													typeof onSort === 'function' && onSort(token)
												}
												message={title}
											/>
										)}
										{!!type && hasType(type, EnumSort.NUMERIC) && (
											<SortButton
												variant='text'
												comparator={comparator || 0}
												as='numeric'
												onClick={() =>
													typeof onSort === 'function' && onSort(token)
												}
												message={title}
											/>
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
