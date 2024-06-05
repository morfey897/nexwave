'use client';
import { ITableProps } from '@/types/table';
import { TUID } from '@/types/common';
import { hasType } from '@/utils/table';
import { EnumSortBy } from '@/enums';

import SortButton from '@/components/Button/SortButton';
import clsx from 'clsx';

function Head<T extends TUID>({
	head,
	className,
}: {
	head: ITableProps<T>['head'];
} & React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<div className={clsx('flex w-fit min-w-full items-center', className)}>
			{head.map(({ token, type, title, comparator, onSort, flex }) => (
				<div
					key={token}
					className={clsx(
						'w-full py-3.5 px-4 text-xs lg:text-sm font-normal rtl:text-right text-gray-5 text-left text-ellipsis',
					)}
					style={{ flex: flex || 1 }}
				>
					{!!type && hasType(type, EnumSortBy.SYMBOLIC) && (
						<SortButton
							variant='text'
							comparator={comparator || 0}
							as='symbolic'
							onClick={() => typeof onSort === 'function' && onSort(token)}
							message={title}
							className='!p-0 text-xs lg:text-sm'
						/>
					)}
					{!!type && hasType(type, EnumSortBy.NUMERIC) && (
						<SortButton
							variant='text'
							comparator={comparator || 0}
							as='numeric'
							onClick={() => typeof onSort === 'function' && onSort(token)}
							message={title}
							className='!p-0 text-xs lg:text-sm'
						/>
					)}
					{!!type && hasType(type, EnumSortBy.SR_ONLY) && (
						<span className='sr-only'>{title}</span>
					)}
					{!type ||
						(hasType(type, EnumSortBy.NONE) && (
							<span className='cursor-default'>{title}</span>
						))}
				</div>
			))}
		</div>
		// <thead className={clsx(className)} {...props}>
		// 	<tr>
		// 		{head.map(({ token, type, title, comparator, onSort }) => (
		// 			<th
		// 				key={token}
		// 				scope='col'
		// 				className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
		// 			>
		//
		// 			</th>
		// 		))}
		// 	</tr>
		// </thead>
	);
}

export default Head;
