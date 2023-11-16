'use client';
import { IHeadProps } from '@/types/table';
import { TUID } from '@/types/common';
import { hasType } from '@/utils/table';

import { SortIcon_S, SortIcon_N } from '../utils';
import { useSort } from '@/hooks/useSort';

function Head<T extends TUID>({
	head,
	...props
}: {
	head: Array<IHeadProps<T>>;
} & React.HTMLAttributes<HTMLTableSectionElement>) {
	const { onSort, s_asc, s_desc } = useSort();

	return (
		<thead {...props}>
			<tr>
				{head.map(({ token, type, title }) => (
					<th
						key={token}
						scope='col'
						className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
					>
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
						{hasType(type, 'none') && <span>{title}</span>}
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
