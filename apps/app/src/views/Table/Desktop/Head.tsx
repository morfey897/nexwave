'use client';
import { IHeadProps, ITableHeadProps } from '@/types/table';
import { TUID } from '@/types/common';
import { EnumSearchParams } from '@/types/filter';
import { hasType } from '@/utils/table';

import { SortButton } from '../SortButton';
import { useSort } from '@/hooks/filter';
import clsx from 'clsx';

function Head<T extends TUID>({
	head,
	className,
	...props
}: ITableHeadProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	const { onSort, sort } = useSort({
		name: EnumSearchParams.SORT,
	});

	return (
		<thead className={clsx(className)} {...props}>
			<tr>
				{head.map(({ token, type, title }) => (
					<th
						key={token}
						scope='col'
						className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
					>
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
						{hasType(type, 'none') && (
							<span className='cursor-default'>{title}</span>
						)}
						{hasType(type, 'sr-only') && (
							<span className='sr-only'>{title}</span>
						)}
					</th>
				))}
			</tr>
		</thead>
	);
}

export default Head;
