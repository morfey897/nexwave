'use client';
import { EnumSort, ITableHeadProps } from '@/types/table';
import { TUID } from '@/types/common';
import { hasType } from '@/utils/table';

import { SortButton } from '../SortButton';
import clsx from 'clsx';

function Head<T extends TUID>({
	head,
	className,
	...props
}: ITableHeadProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<thead className={clsx(className)} {...props}>
			<tr>
				{head.map(({ token, type, title, comparator, onSort }) => (
					<th
						key={token}
						scope='col'
						className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
					>
						{!!type && hasType(type, EnumSort.SYMBOLIC) && (
							<SortButton
								comparator={comparator || 0}
								variant='symbolic'
								onClick={() => typeof onSort === 'function' && onSort(token)}
							>
								{title}
							</SortButton>
						)}
						{!!type && hasType(type, EnumSort.NUMERIC) && (
							<SortButton
								comparator={comparator || 0}
								variant='numeric'
								onClick={() => typeof onSort === 'function' && onSort(token)}
							>
								{title}
							</SortButton>
						)}
						{!!type && hasType(type, EnumSort.SR_ONLY) && (
							<span className='sr-only'>{title}</span>
						)}
						{!type ||
							(hasType(type, EnumSort.NONE) && (
								<span className='cursor-default'>{title}</span>
							))}
					</th>
				))}
			</tr>
		</thead>
	);
}

export default Head;
