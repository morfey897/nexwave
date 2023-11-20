'use client';
import { IHeadProps } from '@/types/table';
import { TUID } from '@/types/common';
import { hasType } from '@/utils/table';

// import { SortButton } from '../SortButton';
// import { useSort } from '@/hooks/useSort';
import clsx from 'clsx';

function Head<T extends TUID>({
	head,
	className,
	...props
}: {
	head: Array<IHeadProps<T>>;
} & React.HTMLAttributes<HTMLTableSectionElement>) {
	// const { onSort, s_asc, s_desc } = useSort();

	return (
		<thead className={clsx(className)} {...props}>
			<tr>
				{head.map(({ token, type, title }) => (
					<th
						key={token}
						scope='col'
						className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
					>
						{/* {hasType(type, 'sorted_s') && (
							// <SortButton
							// 	_uid={token}
							// 	s_asc={s_asc}
							// 	s_desc={s_desc}
							// 	variant='symbolic'
							// 	onClick={() => onSort(token)}
							// >
							// 	{title}
							// </SortButton>
						)} */}
						{/* {hasType(type, 'sorted_n') && (
							<SortButton
								_uid={token}
								s_asc={s_asc}
								s_desc={s_desc}
								variant='numeric'
								onClick={() => onSort(token)}
							>
								{title}
							</SortButton>
						)} */}
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
